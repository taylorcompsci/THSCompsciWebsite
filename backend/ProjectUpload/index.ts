import { ConditionalCheckFailedException, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import {z as zod} from "zod";
//CORS_HHEADERS
const CORS_HEADERS = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
}

const insertSchema = zod.object({
    // "action" : zod.literal(["add", "access"]),
    "Name" : zod.string("Not a valid project name!"),
    "projectLink": zod.url("Not a valid project link!"),
    "imageLink": zod.string("Not a valid image path!"),
    "author": zod.string("Not a valid author(s) name(s)!"),
    "description": zod.string("Not a valid description!")
})

const actionSchema = zod.object({
    "action": zod.literal(["add", "access"], "Invalid payload action.")
});

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({region: process.env.AWS_REGION ?? "us-east-2"}));
const dynamoDbTable = process.env.DYNAMO_DB_TABLE ?? "thsprojects";

function response(statusCode: number, body: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

async function accessAll()
{
    const { Items } = await dynamoDbClient.send(
        new ScanCommand({ TableName: dynamoDbTable})
    );
    const unfilteredItems = Items?.map(item=>insertSchema.safeParse(item)) ?? [];


    return response(200, unfilteredItems.filter(item=> item.success).map(item => item.data));
}

async function addToDatabase(event: unknown)
{
    const databasePayload = insertSchema.safeParse(event);

    if(!databasePayload.success)
        return response(400,databasePayload.error.flatten().fieldErrors);

    try
    {
        const _ = await dynamoDbClient.send(
            new PutCommand({
                TableName: dynamoDbTable,
                Item: { ...databasePayload.data},
                ConditionExpression: "attribute_not_exists(#name)",
                ExpressionAttributeNames: { "#name" : "name"}
            })
        );

        return response(200, "Overall project successfully created!");
    }
    catch(err)
    {
        if(err instanceof ConditionalCheckFailedException)
            return response(400, "Project name already exists!");
        else
        {
            console.log(`[ERROR] - ${err}`);
            return response(500, "Something unexpected happened while handling insertion into database! Please contact the server admin.")
        }
    }
}

export const lambda_function: APIGatewayProxyHandler = async (event) => 
{
    try
    {   
        console.log(`Request:${JSON.stringify(event)}`);
        
        const jsonEvent = typeof event.body === "string" ? validate_json(event.body ?? "{}") : {res: event.body, success: true};

        if(!jsonEvent.success)
            return response(400, { message: "Invalid JSON"});

        const body = jsonEvent.res ?? {};

        const payload = actionSchema.safeParse(body);

        if(!payload.success)
            return response(400, payload.error.flatten().fieldErrors)

        if(payload.data.action === "access")
            return await accessAll();
        else if(payload.data.action === "add")
            return await addToDatabase(body);

    }
    catch (err)
    {
        return response(500, "Something unexpected happened while handling payload! Please contact the server admin.")
    }

    return response(500, "Oops. Something broke.");
}

function validate_json(s: string): { res: unknown, success: boolean}
{
    try
    {
        const body = JSON.parse(s);

        return { res: body, success: true};
    }
    catch(_err)
    {
        return { res: {}, success: false}
    }
}
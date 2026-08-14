import { ConditionalCheckFailedException, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import {success, z} from "zod";

const BlogPostSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    bucket_url: z.url(),
    created_at: z.coerce.date(),
    thumbnail_url: z.string()
});

const requestSchema = z.object({
    action: z.enum(["list", "access"], { message: "Make sure you include an action: list or access."}),
    id: z.string().optional()
});

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
};

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({region: process.env.AWS_REGION ?? "us-east-2"}));
const dbTable = process.env.DYNAMO_DB_TABLE ?? "blog";

const s3Client = new S3Client({ region: process.env.AWS_REGION!});

function response(statusCode: number, body: unknown): APIGatewayProxyResult{
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

async function listBlogPosts()
{
    const { Items } = await dynamoDbClient.send(
        new ScanCommand({TableName: dbTable})
    );

    const items = Items?.
    map(item => BlogPostSchema.safeParse(item))
    .filter(data => data.success)
    .map(item => item.data);

    return response(200, items);
}

async function getBlogPost(blogPostID: string)
{
    if(blogPostID === "-1")
        return response(400, { message: "Invalid blog post ID."});


    const { Item } = await dynamoDbClient.send(
        new GetCommand({
            Key: {
                id: blogPostID
            },

            TableName: dbTable
        })
    )

    if(!Item)
    {
        return response(404, { message: "Resource not found! If you believe this is a mistake, please contact the server admin."})
    }

    const schemaParse = BlogPostSchema.parse(Item);

    return response(200, schemaParse);
}



export const lambda_function: APIGatewayProxyHandler = async (event) => {
    try
    {
        console.log(`Request:${JSON.stringify(event)}`);
        
        const jsonEvent: any = typeof event.body == "string" ? validate_json(event.body ?? "{}") : {res: event.body, success: true};

        if(!jsonEvent.success)
            return response(400, { message: "Invalid JSON"});

        const parsedJsonEvent = jsonEvent.res ?? {};

        const schemaValidate = requestSchema.safeParse(parsedJsonEvent);

        if(!schemaValidate.success)
            return response(400, { message: schemaValidate.error.flatten().fieldErrors});

        const parsedEvent = schemaValidate.data;

        if (parsedEvent.action === "list")
            return await listBlogPosts();
        else
        {
            const id = parsedEvent.id ?? "-1";

            return await getBlogPost(id);
        }
    
    }
    catch(err)
    {
        console.log(`[ERROR] - ${err}`);

        return response(500, { message: "Internal Server Error. Please contact server admin!"});
    }
}

function validate_json(s: string): { res: any, success: boolean}
{
    try
    {
        const body = JSON.parse(s);

        return { res: body, success: true};
    }
    catch(err)
    {
        return { res: {}, success: false}
    }
}
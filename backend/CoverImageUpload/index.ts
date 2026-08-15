import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

const URL_EXPIRATION_SECONDS = 300;

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
};

const TYPE_MAP: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/jpg": ".jpg",
};

const typeSchema = z.object({
    type: z.literal(Object.keys(TYPE_MAP), "Unsupported file type for cover!")
});

const s3Client = new S3Client({ region: process.env.AWS_REGION ?? "us-east-2"});

function response(statusCode: number, body: unknown): APIGatewayProxyResult{
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

async function getUploadUrl(event: unknown)
{
    const parsedEvent = typeSchema.safeParse(event);

    if(!parsedEvent.success)
         return {status: 400, errors: parsedEvent.error.flatten().fieldErrors};

    const fileType  = TYPE_MAP[parsedEvent.data.type]; 

    const randomID = crypto.randomUUID();
    const key = `${randomID}${fileType}`;

    const s3Params = {
        Bucket: process.env.UPLOAD_BUCKET ?? "UNKNOWN UPLOAD_BUCKET",
        Key: key,
        ContentType: parsedEvent.data.type
    };

    console.log(`S3 Params for uploading cover: ${JSON.stringify(s3Params)}`);

    const putCommand = new PutObjectCommand(s3Params);

    const uploadURL = await getSignedUrl(s3Client, putCommand, {expiresIn: URL_EXPIRATION_SECONDS});
    // const URL = uploadURL.

    return { status: 200, uploadURL, Key: key};
}

export const lambda_function: APIGatewayProxyHandler = async (event) => {
    try
    {
        console.log(`Request:${JSON.stringify(event)}`);
        
        const jsonEvent = typeof event.body === "string" ? validate_json(event.body ?? "{}") : {res: event.body, success: true};

        if(!jsonEvent.success)
            return response(400, { message: "Invalid JSON"});

        const parsedEvent = jsonEvent.res ?? {};

        const { status, ...body} = await getUploadUrl(parsedEvent);
        return response(status, body);
    
    }
    catch(err)
    {
        console.log(`[ERROR] - ${err}`);

        return response(500, { message: "Internal Server Error. Please contact server admin!"});
    }
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
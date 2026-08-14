"use server"

import { ProjectProps } from "@/util/Project";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";



export async function getProjects(): Promise<ProjectProps[]>
{
    return fetch(process.env.DYNAMO_DB_URL!, {
        method: "POST",
        body: JSON.stringify({ action: "access" })
    })
    .then(
        response=>{
            console.log(response);
            if(response.ok)
                return response.json()
        }
    )
    .then(
        json => {
            
            // console.log(json);
            console.log(json.body);
            const projects = json as ProjectProps[];
            // return "D:"

            return projects.map(project=> {
                return {
                    ...project,
                    "imageLink": `${process.env.PROJECT_S3_BUCKET_URL!}${project.imageLink}`
                }
            });

            // return [];
        }
    )
    .catch(
        err=>err
    );
}

type BaseProject = Omit<ProjectProps, "imageLink">;

export async function uploadProject(project: BaseProject, imageFile: File): Promise<string>
{

    const imageLink = await uploadImage(imageFile);

    // return `Image Link: ${imageLink}`

    return fetch(process.env.DYNAMO_DB_URL!, {
        method: "POST",
        body: JSON.stringify({
            "action": "add",
            "Name": project.Name,
            "author": project.author,
            "description": project.description,
            "imageLink": imageLink,
            "projectLink": project.projectLink
        })

    }).then(res=>{
        console.log(res);
        if(!res.ok)
        {
            return { message : "An error occurred!" };
        }

        return res.json();
    }).then(data=>data.body)
    .catch((e)=>`An error occured! ${e}`);
}

interface RequestUrl {
    uploadURL: string,
    Key: string
}

export async function uploadImage(file: File)
{
    return fetch(process.env.REQUEST_URL!, {
        method: "POST",
        body: JSON.stringify({
            "type": file.type
        })
    }).then(res=>res.json())
    .then(async (data: RequestUrl) => {

        const headers = new Headers();
        headers.append("Content-Type", file.type);

        const photo = await fetch(data.uploadURL, {
            method: "PUT",
            headers: headers,
            body: file
        })
        .then(()=>process.env.S3_BUCKET_URL+data.Key)
        .catch(()=>null);

        return photo;
    })
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: 
    {
        accessKeyId: process.env.GALLERY_ACCESS_KEY_ID!,
        secretAccessKey: process.env.GALLERY_ACCESS_KEY!
    }
});

export async function fetchGalleryImages()
{
    const listCommand = new ListObjectsCommand({
        Bucket: process.env.GALLERY_BUCKET,
    })

    try{

        const output = (await s3.send(listCommand))
        .Contents?.map(
            content=>`https://${process.env.GALLERY_BUCKET}.s3.us-east-2.amazonaws.com/${content.Key}`
        );
    
        return output;
    }
    catch
    {
        throw new Error("Couldn't fetch Gallery images! Please try again later.");
    }
    
}
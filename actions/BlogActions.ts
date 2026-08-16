"use server"

import { z } from "zod";

const BLOG_API_URL: string = process.env.BLOG_API_GATEWAY ?? "UNKNOWN_BLOG_API_URL";

const BlogPostSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    bucket_url: z.string(),
    created_at: z.coerce.date(),
    thumbnail_url: z.string()
});

export type Message =  { message: string, status: number };

const BlogPostsScehma = z.array(BlogPostSchema);

export type BlogPost = z.infer<typeof BlogPostSchema>

export async function fetchBlogPosts(): Promise<z.infer<typeof BlogPostsScehma>>
{
    // const response = await fetch(BLOG_API_URL, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         action : "list"
    //     })
    // });

    // if(!response.ok)
    // {
    //     throw Error(`[BLOG FETCH ERROR] ${await response.text()}`);
    // }
    
    // const unparsedJSON = JSON.parse(await response.text());
    
    // const safeParse = BlogPostsScehma.safeParse(unparsedJSON);
    
    // if(!safeParse.success)
    // {
    //     throw Error(`[BLOG PARSE ERROR] ${JSON.stringify(safeParse.error.flatten().fieldErrors)}`);
    // }
    
    // return safeParse.data;
    
    return [{
        id: "test_blog",
        authors: [ "Jaiden Khosla", "David Liu"],
        bucket_url: "https://ths-blogposts.s3.us-east-2.amazonaws.com/test-post",
        created_at: new Date("2026-08-06T15:39:02.123456+00:00"),
        description: "This is a test post",
        title: "Test Post",
        thumbnail_url: "https://ths-blogposts.s3.us-east-2.amazonaws.com/test-post/images/YEET.jpg"
    },
    {
        id: "test_blog_2",
        authors: [ "Jaiden Khosla"],
        bucket_url: "https://ths-blogposts.s3.us-east-2.amazonaws.com/test-post",
        created_at: new Date("2026-08-06T15:39:02.123456+00:00"),
        description: "This is a test post",
        title: "Test Post",
        thumbnail_url: "https://ths-blogposts.s3.us-east-2.amazonaws.com/test-post/images/YEET.jpg"
    }
]

}

export async function getPost(id: string): Promise<BlogPost | Message>
{
    // const response = await fetch(BLOG_API_URL, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         action: "access",
    //         id: id
    //     })
    // })
    
    // if(response.status === 404)
    // {
    //     return { message: "Resource not found!", status: 404};
    // }
    // else if(!response.ok)
    //     throw Error(`[BLOG FETCH ERROR] ${await response.text()}`);
    

    // const unparsedJSON = JSON.parse(await response.text());


    // const safeParse = BlogPostSchema.safeParse(unparsedJSON);

    // if(!safeParse.success)
    //     throw Error(`[BLOG POST PARSE ERROR] ${JSON.stringify(safeParse.error.flatten().fieldErrors)}`);

    // return safeParse.data;

    return (await fetchBlogPosts()).filter(e=>e.id===id)[0];
}
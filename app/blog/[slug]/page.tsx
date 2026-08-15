import { notFound, redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { type BlogPost, getPost } from "@/actions/BlogActions";
import BlogPostContent from "@/util/Blog/BlogPostContent";
import { Profile } from "@/util/Blog/BlogPostOverview";


interface generateMetadataProps
{
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params, searchParams }: generateMetadataProps, parent: ResolvingMetadata): Promise<Metadata>
{
    const { slug } = await params;

    const post = await getPost(slug);

    if(post === undefined || ("status" in post && post.status === 404))
        notFound();
    else if(!isBlogPost(post))
        redirect("/blog");



    return ({
        title: post.title,
        description: post.description,
        keywords: ["THS COMPSCI", "ths", "James E. Taylor Highschool", "JET", "compsci", "computer science", post.title],
        authors: post.authors.map((a)=> ({ name: a})), 
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://www.thscompsci.com/blog/${slug}`,
            siteName: "thscompsci",
            locale: "en_US",
            type: "article",
            images: [post.thumbnail_url]
        }
    });
}

function isBlogPost(post: unknown): post is BlogPost
{
    return post !== undefined && post !== null && typeof post === "object" && "id" in post;
}

export default async function Page({ params }: { params: Promise<{slug: string}>})
{
    const {slug} = await params;

    const blogPost = await getPost(slug);

    
    if(blogPost === undefined || ("status" in blogPost && blogPost.status === 404))
         notFound();
    else if(!isBlogPost(blogPost))
        redirect("/blog");
        
    
    return (
    
    <div className="flex flex-col items-start">
        <h1 className="text-6xl mt-8">{blogPost.title.toLowerCase()}</h1>
        <div className="pt-4 pb-8 border-gray-500 border-b w-full flex justify-between has-[.PROFILE:hover]:pb-12 items-start transition-all">
            <div className="flex gap-2">{blogPost.authors.map((author)=><Profile key={`author-${author}`} name={author}/>)}</div>
            <p className="text-gray-500 text-2xl pr-3">{blogPost.created_at.toDateString()}</p>
        </div>
        <BlogPostContent url={blogPost.bucket_url}/>
    </div>
    
);
}
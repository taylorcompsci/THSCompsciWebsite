import notFound from "@/app/not-found";
import { redirect } from "next/navigation";
import { Streamdown } from "streamdown";

import { BlogPost, getPost, type Message } from "@/actions/BlogActions";
import BlogPostContent from "@/util/Blog/BlogPostContent";
import { Profile } from "@/util/Blog/BlogPostOverview";



function isBlogPost(post: any): post is BlogPost
{
    return "id" in post;
}

export default async function Page({ params }: { params: Promise<{slug: string}>})
{
    const {slug} = await params;

    const blogPost = await getPost(slug);

    
    if(blogPost === undefined || ("status" in blogPost && blogPost.status === 404))
         redirect("/not-found")
    else if(!isBlogPost(blogPost))
        redirect("/blog");
        
    
    return (
    
    <div className="flex flex-col items-start">
        <h1 className="text-6xl my-8">{blogPost.title.toLowerCase()}</h1>
        <div className="border-gray-500 border-y w-full flex justify-between h-25 items-start pt-3">
            <div className="flex gap-2">{blogPost.authors.map(author=><Profile name={author}/>)}</div>
            <p className="text-gray-500 text-3xl">{blogPost.created_at.toDateString()}</p>
        </div>
        <BlogPostContent url={blogPost.bucket_url}/>
    </div>
    
);
}
"use client"

import { useEffect, useState } from "react"
import { fetchBlogPosts, type BlogPost } from "@/actions/BlogActions"
import BlogPostOverview from "@/util/Blog/BlogPostOverview";

export default function Blog()
{

    const [ useBlogPosts, setBlogPosts ] = useState<BlogPost[] | undefined>();
    
    useEffect(()=>{
        if(!useBlogPosts)
            fetchBlogPosts()
            .then(e=>setBlogPosts(e))
    }, [])

    return (
        <div className="flex flex-col gap-5 mt-5">
            { useBlogPosts?.map(post => <BlogPostOverview key={post.id} {...post}/>)}
        </div>
    )
}
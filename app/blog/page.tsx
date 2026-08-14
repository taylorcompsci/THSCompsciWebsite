"use client"

import { useEffect, useState } from "react"
import { fetchBlogPosts, type BlogPost } from "@/actions/BlogActions"
import BlogPostOverview from "@/util/Blog/BlogPostOverview";

export default function Blog()
{

    const [ useBlogPosts, setBlogPosts ] = useState<BlogPost[] | undefined>();
    
    useEffect(()=>{
        fetchBlogPosts()
        .then(e=>setBlogPosts(e))
    }, [])

    return (
        <div className="flex flex-col gap-15">
            { useBlogPosts?.map(post => <BlogPostOverview key={post.id} {...post}/>)}
        </div>
    )
}
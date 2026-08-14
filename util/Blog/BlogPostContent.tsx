"use client"

import { useState, useEffect } from "react"
import MarkdownRenderer from "@/util/Blog/MarkdownRenderer";

export default function BlogPost({ url }: {url: string})
{
    const [ useContent, setContent ] = useState<string | undefined>();

    useEffect(()=>{

        const markdownFileURL = `${url}/post.md`;

        fetch(markdownFileURL)
        .then(e=>e.text())
        .then(text=>setContent(text))
        .catch(err => console.error(`[ERROR] ${err}`));

    }, [url]);

    return (
        <article className="mt-5 w-[60%]">
            {/* <textarea className="border border-white w-full h-32" onChange={(e)=>setContent(e.target.value)}></textarea> */}
            <MarkdownRenderer className="flex flex-col" imageURL={url}>
                { useContent }
            </MarkdownRenderer>
        </article>
    )
}
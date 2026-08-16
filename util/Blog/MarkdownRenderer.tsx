import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "@/app/styles/rendererStyle.css";
import 'katex/dist/katex.min.css'
import CodeBlock from "@/util/Blog/CodeBlock";
interface MarkdownRendererProps
{
    children?: string;
    imageURL: string
}

export default function MarkdownRenderer({ children, imageURL, ...props }: MarkdownRendererProps)
{

    const normalizeAssetUrl = (url: string | undefined) => {
        if(url)
        {
            if(isValidURL(url)) return url;
            return imageURL?.endsWith("/") ? `${imageURL}images/${url}` : `${imageURL}/images/${url}`;
        }
        else
            return "/assets/placeholder.webp";
    }   

    return (
        <article className="language-math">
            <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                img: ({ src, alt, width, height}) => <Image placeholder="blur" blurDataURL="/assets/placeholder.webp" width={Number.parseInt((width?? 1200).toString(), 10)} height={Number.parseInt((height ?? 630).toString(), 10)} unoptimized src={normalizeAssetUrl(src?.toString())} alt={alt ?? "Unknown"} className="object-cover border-white"/>,
                code: CodeBlock
            }} 
            >
                {children}
            </ReactMarkdown>
        </article>
    )
}

export function isValidURL(url: string)
{
    try {
        new URL(url);
        return true;
    }
    catch{
        return false;
    }
}
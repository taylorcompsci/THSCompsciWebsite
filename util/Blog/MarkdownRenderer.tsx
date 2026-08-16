import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";

import "@/app/styles/rendererStyle.css";
import 'katex/dist/katex.min.css'
import CodeBlock from "@/util/Blog/CodeBlock";
interface MarkdownRendererProps
{
    children?: string;
    imageURL: string
}

export default function MarkdownRenderer({ children, imageURL }: MarkdownRendererProps)
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
        <div className="language-math prose dark:prose-invert">
            <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
                p({ node, children, ...props}) {
                    const hasCode = node?.children.some((child) => (child.type === "element" && "tagName" in child && (child.tagName === "pre" || child.tagName === "code" )));

                    if(hasCode)
                        return <div {...props}>{children}</div>

                    return <p {...props}>{children}</p>
;                },
                img: ({ src, alt, width, height}) => <Image placeholder="blur" blurDataURL="/assets/placeholder.webp" width={Number.parseInt((width?? 1200).toString(), 10)} height={Number.parseInt((height ?? 630).toString(), 10)} unoptimized src={normalizeAssetUrl(src?.toString())} alt={alt ?? "Unknown"} className="object-cover border-white"/>,
                code: CodeBlock,
                pre({ children }) {
                    return <pre className="not-prose bg-[#282C34]">{children}</pre>
                }
            }} 
            >
                {children}
            </ReactMarkdown>
        </div>
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
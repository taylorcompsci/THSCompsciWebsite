import React from "react";
import Image from "next/image";

import { Streamdown, defaultRehypePlugins } from "streamdown";
import { harden } from "rehype-harden";

import { code } from "@streamdown/code";
import { math } from "@streamdown/math";

interface MarkdownRendererProps
{
    children?: string;
    className?: string;
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
        <Streamdown {...props} 
        shikiTheme={["github-dark", "github-dark"]}
          rehypePlugins={[
            defaultRehypePlugins.raw,
            defaultRehypePlugins.sanitize,
            [
            harden,
            {
                allowedImagePrefixes: [imageURL],
                allowDataImages: true,
            },
            ],
        ]}
        components={{
            img: ({ src, alt, width, height}) => <Image placeholder="blur" blurDataURL="/assets/placeholder.webp" width={Number.parseInt((width?? 1200).toString())} height={Number.parseInt((height ?? 630).toString())} unoptimized src={normalizeAssetUrl(src?.toString())} alt={alt ?? "Unknown"} className="object-cover border-white"/>,
        }} 
        plugins={{ code: code, math: math}}
        >
            {children}
        </Streamdown>
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
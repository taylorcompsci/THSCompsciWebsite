"use client"

import { useEffect, useState } from "react";
import type {  HTMLAttributes } from "react"
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { PrismLight } from "react-syntax-highlighter";

export default function CodeBlock({ children, className, ...props}: HTMLAttributes<HTMLDivElement>)
{   

    const [ isReady, setIsReady ] = useState<boolean>(false);

    const match = /language-(\w+)/.exec(className || "");

    useEffect(()=>{
        if(match?.[1])
        {
            import(`react-syntax-highlighter/dist/esm/languages/prism/${match[1]}`)
            .then((mod)=>{
                PrismLight.registerLanguage(match[1], mod.default);
                setIsReady(true);
            });
            
        }


    }, [match?.[1]])

    return (
    <div className="not-prose flex flex-col font-[scientifica] mt-3" {...props}>
        <div className="pl-3 bg-gray-700">
            {match?.[1] ?? "Unknown"}
        </div>
        {match && isReady ? (
            <PrismLight style={oneDark} language={match[1]}  codeTagProps={{ style: { fontFamily: "'scientifica', 'monospace'"}}}>
                {String(children)}
            </PrismLight>) : 
            (
            <code style={{ fontFamily: "'scientifica', 'monospace'", backgroundColor: "rgb(40, 44, 52)"}} className="pl-3" >
                {children}
            </code>
            )}
    </div>
    )
}
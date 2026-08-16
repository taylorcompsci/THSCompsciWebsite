"use client"

import type { ClassAttributes, HTMLAttributes, JSX, ComponentType } from "react"
import type { ExtraProps } from "react-markdown"

export default function CodeBlock({ children, className, ...props}: HTMLAttributes<HTMLDivElement>)
{   
    return (
        <code>
            {children?.toString()}
        </code>
    )
}
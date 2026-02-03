"use client"

import { usePathname } from "next/navigation"

export default function Command({ text, callback }: { text: string , callback?: ()=>void})
{

    const path = usePathname().toUpperCase();

    return (
        <div className="flex gap-x-1.5 h-8 max-md:pl-3">
            <p className="text-2xl">{`PS C://THS_WEBSITE/${path.substring(1)||"HOME"} > `}</p>
            <p className="text-2xl typewriter" onAnimationEnd={callback}>{text}</p>
        </div>
    )
}
"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"
import Scroll from "@/util/Scroll";


interface CommandProps extends React.HTMLAttributes<HTMLDivElement>
{
    text: string,
    callback?: () => void,
    children?: React.ReactNode
}

export default function Command({ text, callback }: { text: string , callback?: ()=>void})
{

    const path = usePathname().toUpperCase();

    return (
        <>
            <div className="flex gap-x-1.5 h-8 max-md:pl-3">
                <p className="text-2xl max-md:text-lg">{`PS C://THS_WEBSITE/${path.substring(1)||"HOME"} > `}</p>
                <p className="text-2xl max-md:text-lg typewriter" onAnimationEnd={()=>{
                    callback?.();
                }}>{text}</p>
            </div>
        </>
    )
}

export function RootCommand({ callback }: { callback?: ()=>void})
{

    const pathname = usePathname().replace(/(^\/)|(\/$)/, "") || "home";

    return (
        <>
         <div className="text-2xl max-md:pl-3 max-md:text-lg">
            <p>THS CMD</p>
            <p>Copyright THS Club. All rights reserved</p>
        </div>
        <br/>
        <Command text={`cat ${pathname.toLowerCase()}.txt`} callback={callback}/>
        
        </>
    )
}

export function CommandWrapper({ children }: { children: React.ReactNode})
{
    const [useCommandFinished, setCommamdFinished] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(()=>{
        setCommamdFinished(false);
    }, [pathname])

    return (
        <section key={pathname}>
            <RootCommand callback={()=>{setCommamdFinished(true)}}/>
            
            {useCommandFinished && (
                <Scroll>
                    {children}
                </Scroll>
            )}

        </section>
    )
}
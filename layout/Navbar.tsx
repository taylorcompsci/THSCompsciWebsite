"use client"

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

import { useEffect, useState } from "react"

import { Menu, X } from "@boxicons/react"

export default function Navbar()
{
    const [ useMenu, setMenu ] = useState<boolean>(false);

    useEffect(()=>{
        const html = document.querySelector("html");
        if(html)
        {
            if(useMenu) scrollTo(0,0);
            html.style.overflow = useMenu ? "hidden" : "auto";

        }

    }, [useMenu])

    return (
        <nav className="bg-header flex items-center justify-between md:pl-3 h-12 max-md:h-18 max-md:justify-center max-md:flex-col-reverse max-md:items-end overflow-y-visibleI">
            <h1 className="text-white text-2xl max-md:hidden">THS COMPSCI</h1>
            
            <div className={clsx("h-full flex items-end max-md:flex-col max-md:items-start max-md:z-100 transition-all", useMenu || "max-md:opacity-0 max-md:pointer-events-none",
                "max-md:w-full max-md:h-screen max-md:fixed max-md:top-18 max-md:bg-background", !useMenu || "max-md:opacity-76" 
            )}>
                <NavBTN text="Home" route="" unset={()=>setMenu(false)}/>
                {/* <NavBTN text="CSHS" route="cshs" unset={()=>setMenu(false)}/> */}
                <NavBTN text="Gallery" route="gallery" unset={()=>setMenu(false)}/>
                <NavBTN text="Officers" route="officers" unset={()=>setMenu(false)}/>
                <NavBTN text="Resources" route="competitions" unset={()=>setMenu(false)}/>
                <NavBTN text="Projects" route="projects" unset={()=>setMenu(false)}/>
            </div>
            
            <div className="hidden max-md:flex justify-end" onClick={()=>setMenu(prev=>!prev)}>
                {
                    !useMenu && <Menu size="xl"/> || <X size="xl"/>
                }
            </div>
            

        </nav>
    )
}

function NavBTN({ text, route, unset } : {text: string, route: string, unset?: ()=>void})
{

    const path = usePathname().toLowerCase().split("/");

    return (
        <Link className={clsx("text-white text-2xl pl-4 pr-8 pt-1 rounded-tl-xl h-[75%] hover:bg-hover transition-colors max-md:w-full max-md:p-0 max-md:h-25 max-md:flex max-md:justify-center max-md:items-center max-md:rounded-none", path[1] === (route.toLowerCase()) && "bg-background")}
            onClick={unset}
            href={`/${(route)}`}
        >
            <p>{text}</p>
        </Link>
    )
}
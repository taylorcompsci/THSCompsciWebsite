"use client"

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function Navbar()
{
    return (
        <nav className="bg-header flex items-center justify-between pl-3 h-12">
            <h1 className="text-white text-2xl">THS COMPSCI</h1>
            
            <div className="h-full flex items-end">
                <NavBTN text="Home" route=""/>
                <NavBTN text="CSHS" route="cshs"/>
                <NavBTN text="Gallery" route="gallery"/>
                <NavBTN text="Officers" route="officers"/>
                <NavBTN text="Resources" route="resources"/>
                <NavBTN text="Projects" route="projects"/>
            </div>
        </nav>
    )
}

function NavBTN({ text, route } : {text: string, route: string})
{

    const path = usePathname().toLowerCase().split("/");

    return (
        <Link className={clsx("text-white text-2xl pl-4 pr-8 pt-1 rounded-tl-xl h-[75%] hover:bg-hover transition-colors", path[1] === (route.toLowerCase()) && "bg-background")}
            href={`/${(route)}`}
        >
            <p>{text}</p>
        </Link>
    )
}
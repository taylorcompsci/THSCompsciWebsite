"use client"

import ShadeButton from "@/util/ShadeButton";
import { redirect } from "next/navigation";
// import Model from "@/util/Home/Model";
import { usePathname } from "next/navigation";

export default function NotFound()
{
    const pathname = usePathname();

    return (
        <div className="flex flex-col items-center gap-4 justify-center h-full mt-20">
            {/* <Model className="size-30"/> */}
            <h1 className="text-7xl">404 Not Found</h1>
            <p className="text-3xl">We don't know what {pathname} is...</p>
            <ShadeButton changeShadeOnHover onClick={()=> redirect("/")} center>Take me back!</ShadeButton>
        </div>
    )

}
"use client"

import getChildren from "@/util/Gallery/List";
import { useEffect, useState } from "react";

import Image from "next/image";

import clsx from "clsx";

import Scroll from "@/util/Scroll";

export default function Gallery()
{

    const files = ["galleryImages"];

    const [ useFiles, setFiles ] = useState<string[]>([]);

    useEffect(()=>{
        getChildren("assets/galleryImages").then(arr=>setFiles(arr));
    }, [])

    const [ useFileName, setFileName ] = useState<string>("");
//http://localhost:3000/assets/cat.jpg
http://localhost:3000/assets/cat.jpg
    return (
        <Scroll className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-6xl shadow_class mb-10">Gallery</h1>
            <div className="flex-wrap flex justify-center gap-3">
                {useFiles.map((val, idx)=> <Image className="w-100 h-70" src={val} alt={`Picture from ${val}`} key={`Image-${idx}`} width={300} height={400} />)}
            </div>
        </Scroll>
    )
}
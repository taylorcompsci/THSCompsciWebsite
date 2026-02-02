"use client"

import getChildren from "@/util/Gallery/List";
import { useState } from "react";

import Image from "next/image";

import clsx from "clsx";

import Scroll from "@/util/Scroll";

export default function Gallery()
{

    const files = ["test1", "test2"];

    const [ useFiles, setFiles ] = useState<string[]>([]);
    const [ useFileName, setFileName ] = useState<string>("");

    return (
        <Scroll className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-6xl shadow_class mb-10">Gallery</h1>
            <div className="border border-white flex justify-between h-100 w-200">
                <div className="size-full border-r">
                    <div className="border-b p-3"/>
                    {
                        files.map((file, idx) => {
                            return (
                                <div key={idx} className={clsx("transition-all hover:pl-3 hover:bg-hover active:brightness-200",
                                    file === useFileName && "pl-3 bg-hover brightness-150" 
                                )} onClick={
                                    ()=>{
                                        getChildren("assets").then(arr=>{
                                            setFiles(arr);
                                        });

                                        setFileName(file);
                                    }
                                }>
                                    {file}
                                </div>
                            )
                        })
                    }

                    {
                    }
                </div>
                    <div className="flex flex-col gap-5 w-200 h-full overflow-y-scroll">
                        {useFiles.map((val, idx)=> <Image className="w-full" src={val} alt={`Picture from ${val}`} key={`Image-${idx}`} width={300} height={400} />)}
                    </div>
            </div>
        </Scroll>
    )
}
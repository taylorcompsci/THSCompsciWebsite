"use client"

import { RefObject, useEffect, useRef, useState } from "react";

import Image from "next/image";

import Scroll from "@/util/Scroll";
import { fetchGalleryImages } from "@/actions/Actions";


export default function Gallery()
{

    // const files = ["galleryImages"];

    const [ useFiles, setFiles ] = useState<string[]>([]);
    const [ useErrorMessage, setErrorMessage] = useState<string|undefined>();
    
    
    const triggerRef: RefObject<HTMLDivElement | null> = useRef(null);
    
    useEffect(()=>{
        
        
        if(triggerRef.current)
        {
            let prevToken: string | undefined = undefined;
            
            const observer = new IntersectionObserver(async ()=>{
                
                if(prevToken == "-1")
                    return;
                
                const result = (await fetchGalleryImages(prevToken).catch((e)=> setErrorMessage(e)))!;

                if(result.contents)
                    setFiles(e => [...e, ...result.contents!]);


                if(!result.isDone)
                    prevToken = result.nextToken!;
                else
                    prevToken = "-1";

            }, { threshold: 0.001 });

            observer.observe(triggerRef.current)
        }
    }, [])

    return (
        <Scroll className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-6xl shadow_class mb-10">Gallery</h1>
            <div className="flex-wrap flex justify-center gap-3">
                {useFiles && useFiles.map((val, idx)=> <Image className="w-100 h-70" src={val} alt={`Picture from ${val}`} key={`Image-${idx}`} width={300} height={400} placeholder="blur" blurDataURL="/assets/placeholder.webp"/>)}
                {useFiles.length < 1 && !useErrorMessage && <div className="size-15 border-10 border-white border-t-blue-400 rounded-full animate-spin"/>}
                <p className="text-red-300 underline text-lg">{useErrorMessage?.toString()}</p>
            </div>
            
            <div ref={triggerRef}/>

        </Scroll>
    )
}
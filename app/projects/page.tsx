"use client"

import Project from "@/util/Project";
import Scroll from "@/util/Scroll";
import { useEffect, useState } from "react";
import type { ProjectProps } from "@/util/Project";
import { getProjects } from "@/actions/Actions";
import Link from "next/link";

export default function Projects()
{

    const [ useProjects, setProjects ] = useState<ProjectProps[]>([]);

    useEffect(()=>
    {
        getProjects().then(
            data=>{
                // console.log(data);
                setProjects(data)
            }
        ).catch(err=>console.log(err));
    },[])


    return (
        <Scroll className="flex flex-col items-center">
            <h1 className="shadow_class text-8xl mt-10">Projects</h1>
            <div className="flex gap-x-1 text-2xl">
                <p>Want to show off your own project?</p><Link className="underline transition-all hover:text-shdn" href="/create_project">Click here</Link>
            </div>

            <section className="grid grid-cols-3 max-md:grid-cols-1 items-stretch gap-5 flex-wrap mt-10">
                {(Array.isArray(useProjects) ? useProjects : []).map((project) => project.hide || <Project key={`${project.Name}-${project.author}`} project={project}/>)}
            </section>
        </Scroll>
    )
}

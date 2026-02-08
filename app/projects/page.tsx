"use client"

import Project from "@/util/Project";
import Scroll from "@/util/Scroll";
import { useEffect, useState } from "react";
import { ProjectProps } from "@/util/Project";
import { getProjects } from "@/actions/Actions";
import Link from "next/link";

export default function Projects()
{

    const [ useProjects, setProjects ] = useState<ProjectProps[]>([]);

    useEffect(()=>
    {
        getProjects().then(
            data=>{
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

            <section className="flex gap-5 flex-wrap justify-center mt-10">
                {useProjects && (useProjects!).map((project, idx) => project.hide || <Project key={`${project.Name}-${idx}`} project={project}/>)}
            </section>
        </Scroll>
    )
}
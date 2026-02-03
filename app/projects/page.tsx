"use client"

import Project from "@/util/Project";
import Scroll from "@/util/Scroll";
import { useEffect, useState } from "react";
import { ProjectProps } from "@/util/Project";

export default function Projects()
{

    const [ useProjects, setProjects ] = useState<ProjectProps[]>([]);

    useEffect(()=>
    {
        fetch("https://5xu2xfigc4.execute-api.us-east-1.amazonaws.com/deployment", {
            method: "POST",
            body: JSON.stringify({"Action" : "Access"})
        })
        .then(
            response=>{
                if(response.ok)
                    return response.json()
            }
        )
        .then(
            json => {
                const projects = JSON.parse(json).body;
                setProjects(projects)
            }
        )
        .catch(
            err=>console.log(err)
        )
    })


    return (
        <Scroll className="flex flex-col items-center">
            <h1 className="shadow_class text-6xl my-10">Projects</h1>

            <section className="flex gap-5 flex-wrap justify-center">
                {useProjects && useProjects.map((project, idx) => project.hide || <Project key={`${project.name}-${idx}`} project={project}/>)}
            </section>
        </Scroll>
    )
}
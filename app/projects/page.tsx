"use client"

import Project from "@/util/Project";
import Scroll from "@/util/Scroll";
import { useEffect, useState } from "react";

interface Project 
{
    projectLink: string,
    imageLink: string,
    Name: string
}

export default function Projects()
{

    const [ useProjects, setProjects ] = useState<Project[]>([]);

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
                {useProjects && useProjects.map((project, idx) => <Project key={`${project.Name}-${idx}`} title={project.Name} author={project.Name} description={""} link={project.projectLink} image_path={project.imageLink}/>)}
            </section>
        </Scroll>
    )
}
import Image from "next/image"
import Link from "next/link"

export interface ProjectProps
{
    Name: string,
    author: string,
    description: string,
    projectLink: string,
    hide?: boolean
    imageLink: string
}

export default function Project({ project } : { project: ProjectProps })
{


    return (
        <Link href={project.projectLink} replace={false} target="_blank" rel="noopener noreferrer" className="w-100">
            <div className="group border border-white w-100 h-110 overflow-hidden">
                <div className="overflow-hidden w-100 h-50">
                    <Image unoptimized src={project.imageLink} alt={`Picture of ${project.author}'s project: ${project.Name}`} width={400} height={300} className="w-full object-top object-cover transition-all group-hover:grayscale group-hover:scale-125 size-full"/>
                </div>
                <div className="flex flex-col items-start p-4">
                    <h3 className="text-3xl">{project.Name}</h3>
                    <p className="text-xl text-gray-500">@{project.author?.replaceAll(" ","_").toLowerCase()}</p>
                    <p className="text-[80%] text-wrap text-left">{project.description}</p>
                </div>
            </div>
        </Link>
    )
}
import Image from "next/image"
import Link from "next/link";

import { BsInstagram, BsDiscord, BsGithub } from "react-icons/bs";
import { IconType } from "react-icons";

interface OfficerProps
{
    image: string,
    name: string,
    role: string,
    description: string,
    
    instagram? : string,
    github?: string
    discord?: string,

    playing?: string
}

export default function Officer(props : OfficerProps)
{
    return (
        <div className="w-90 border border-white">
            <div className="w-full border-b h-15 bg-red-400"/>
            <Image src={props.image} alt={`Picture of ${props.name}`} width={300} height={300} className="object-cover rounded-full size-25 border-2 ml-3 border-white relative bottom-10"/>
            <div className="p-3 pt-0 mt-[-45]">
                <h2 className="font-bold text-3xl">{props.name}</h2>
                <p className="text-xl mt-[-10] italic">{props.role}</p>
                
                <div className="flex py-2 gap-3 text-md">
                    {
                        props.instagram && <Social icon={BsInstagram} link={props.instagram}/>
                    }
                    {
                        props.github && <Social icon={BsGithub} link={props.github}/>
                    }
                    {
                        props.discord && <Social icon={BsDiscord} link={props.discord}/>
                    }
                </div>

                <p className="text-md">{props.description}</p>
            </div>
        </div>
    )
}

function Social({ link, icon: Icon}: { link : string, icon: IconType})
{ 
    return (
        <Link href={link} replace={false} target="_blank" rel="noopener noreferrer" className="size-6 flex items-center justify-center border rounded-full transition-transform hover:-translate-y-0.5 ">
            <Icon className="w-full h-full"/>
        </Link>
    )
}
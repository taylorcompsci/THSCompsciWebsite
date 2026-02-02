import Image from "next/image"
import Link from "next/link"

interface ProjectProps
{
    title: string,
    author: string,
    description: string,
    link: string,
    image_path: string
}

export default function Project({ title, author, description, link, image_path} : ProjectProps)
{
    return (
        <Link href={link} replace={false} target="_blank" rel="noopener noreferrer">
            <div className="group border border-white w-100 h-110 overflow-hidden">
                <div className="overflow-hidden w-100 h-50">
                    <Image unoptimized src={image_path} alt={`Picture of ${author}'s project: ${title}`} width={400} height={300} className="w-full object-cover transition-all group-hover:grayscale group-hover:scale-125 size-full"/>
                </div>
                <div className="flex flex-col items-start p-4">
                    <h3 className="text-3xl">{title}</h3>
                    <p className="text-xl text-gray-500">@{author}</p>
                    <p className="text-[90%] text-wrap text-left">{description}</p>
                </div>
            </div>
        </Link>
    )
}
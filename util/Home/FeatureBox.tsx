import Image from "next/image";
import Link from "next/link";


interface FeatureBoxProps
{
    title: string,
    description: string,
    image_path: string
}

export default function FeatureBox({ title, description, image_path}: FeatureBoxProps)
{
    return (
        <Link href={`/${description}`}>
        
            <div className="group border border-white flex flex-col items-start max-md:items-center max-md:text-center max-md:justify-center p-3 size-75 max-md:size-90 text-left">
                
                <div className="border border-white size-25 max-md:size-40">
                    e
                </div>
                <h3 className="font-bold text-4xl max-md:text-5xl">{title}</h3>
                <p className="text-wrap max-md:text-lg">{description}</p>

                <p className="group-hover:underline text-green-500 text-2xl hover:underline transition-all">{"Learn More ->"}</p>
            </div>
        
        </Link>
    )
}
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
        <div className="border border-white flex flex-col items-start p-3 w-100 text-left">
            
            <h3 className="font-bold text-4xl">{title}</h3>
            <p className="text-wrap">{description}</p>

            <Link href={`/${description}`} className="text-green-500 text-2xl hover:underline transition-all">{"Learn More ->"}</Link>
        </div>
    )
}
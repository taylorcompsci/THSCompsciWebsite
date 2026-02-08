import { ForwardRefExoticComponent, RefAttributes } from "react";
import { BoxIconProps } from "@boxicons/react";
import Link from "next/link";

type IconType = ForwardRefExoticComponent<BoxIconProps & RefAttributes<SVGSVGElement>>;
interface FeatureBoxProps
{
    title: string,
    description: string,
    icon: IconType,
    route?: string
}

export default function FeatureBox({ title, route, description, icon: Icon}: FeatureBoxProps)
{
    return (
        <Link href={route || `/${title.toLowerCase()}`}>
        
            <div className="group border border-white flex flex-col items-start max-md:items-center max-md:text-center max-md:justify-center p-3 h-full w-75 max-md:w-90 text-left">
                
                <div className="border border-white size-25 max-md:size-40 flex items-center justify-center">
                    <Icon size="3xl" pack="filled"/>
                </div>
                <h3 className="font-bold text-4xl max-md:text-5xl">{title}</h3>
                <p className="text-wrap max-md:text-lg">{description}</p>

                <p className="group-hover:underline text-green-500 text-2xl hover:underline transition-all">{"Learn More ->"}</p>
            </div>
        
        </Link>
    )
}
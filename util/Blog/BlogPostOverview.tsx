import { type BlogPost } from "@/actions/BlogActions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function BlogPostOverview(props: BlogPost)
{
    return (
        <div className="pl-6 w-[70%] md:w-[50%] cursor-pointe transition-all hover:ml-3 cursor-pointer group" onClick={()=>redirect(`/blog/${props.id}`)}>
            <p className="text-gray-500 text-xl transition-colors group-hover:text-white">{`D://posts/${props.title.replaceAll(/\s/g, "-").toLowerCase()}.md`}</p>
            <div className="py-3 flex gap-6 border-b border-gray-500 transition-colors group-hover:border-white">
                <Image src={`${props.thumbnail_url}`} 
                    unoptimized alt={props.description} 
                    width={150} height={150} placeholder="blur" 
                    blurDataURL="/assets/placeholder.webp"
                    className="border border-gray-500 transition-colors group-hover:border-white size-20"
                />
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl shadow_class">{props.title.toLowerCase()}</h2>
                    <p className="text-gray-500 text-lg transition-colors group-hover:text-white">{props.description}</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <div className="flex gap-3 has-[.PROFILE:hover]:pb-10 transition-all">
                    {props.authors.map(author=><Profile name={author} key={author}/>)}
                </div>
                <p className="text-lg text-gray-500 transition-colors group-hover:text-white">{`${props.created_at.getUTCFullYear()}-${(props.created_at.getUTCMonth()+1).toString().padStart(2,"0")}-${props.created_at.getUTCDate().toString().padStart(2, "0")}`}</p>
            </div>
        </div>
    )
}

export function Profile({ name }: {name : string})
{
    return (
        <div 
            className="border border-gray-500 
            size-8 PROFILE
            items-center justify-center 
            flex rounded-full transition-all 
            group-hover:border-white group/profile relative hover:mr-32"
        >
            <p className="text-md transition-all">{name.split(/\s/g).map(e=>e.charAt(0).toUpperCase())}</p>
           <NameTooltip author={name}/>
        </div>
    )
}

function NameTooltip({ author }: { author : string})
{
    return (
        <div className="left-8 top-10 min-w-30 absolute transition-all opacity-0 border border-gray-500 p-2 
                        rounded-sm group-hover/profile:opacity-100 
                        group-hover/profile:top-3 group-hover/profile:left-10 pointer-events-none">
            <p className="text-green-400 text-sm">{"$ whoami"}</p>
            <p className="text-sm">{author}</p>
        </div>
    );
}



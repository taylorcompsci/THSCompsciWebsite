"use client"

import { useState, HTMLProps } from "react"
import type { ProjectProps } from "@/util/Project";

import { uploadProject } from "@/actions/Actions";
import ShadeButton from "@/util/ShadeButton";
import { isValidURL } from "@/actions/ClientActions";
import Image from "next/image";
import Scroll from "@/util/Scroll";

type Project = Omit<ProjectProps, "imageLink">;

const initialState: Project = {
    Name: "", author: "", description: "", projectLink: ""
};

export default function CreateProject()
{
    const [ useForm, setForm ] = useState<Project>(initialState);

    const [ useFile, setFile] = useState<File|null>();

    const [ useDb, setDb ] = useState<boolean>(false);

    const [ useRes, setRes] = useState<string>("");

    return (
        <Scroll>

            <form className="flex flex-col gap-3 p-3 w-150">
                <StyledInput id="title" value={useForm?.Name} onChange={(event)=>setForm({...useForm, Name: (event.target as HTMLInputElement).value })}/>
                <StyledInput id="author" value={useForm?.author} onChange={(event)=>setForm({...useForm, author: (event.target as HTMLInputElement).value})}/>
                <StyledInput id="description" value={useForm?.description} onChange={(event)=>setForm({...useForm, description: (event.target as HTMLInputElement).value})}/>
                <StyledInput id="project Link" value={useForm?.projectLink} onChange={(event)=>setForm({...useForm, projectLink: (event.target as HTMLInputElement).value})}/>

                {useFile && <Image alt={useForm.Name} src={URL.createObjectURL(useFile)} width={400} height={300}/>}
                <StyledInput id="Image" type="file" onChange={e=>setFile((e.target as HTMLInputElement).files?.item(0))}/>

                <ShadeButton disabled={true} shade={true} changeShadeOnHover onClick={(e)=>{
                    (async () => {

                        e.preventDefault();

                        if(useDb || !(useForm.author&&useForm.Name&&useForm.description&&useForm.projectLink&&useFile)) return;
                        
                        if(!isValidURL(useForm.projectLink)) {
                            setRes("Invalid project url!"); 
                            return;
                        }

                        setDb(true);

                        const res = await uploadProject(useForm, useFile!);

                        setRes(res);

                        setForm(initialState);
                        setFile(null);

                        setDb(false);
                    })();
                    
                }}>Submit</ShadeButton>
                {useRes && <p className="text-2xl text-red-400 italic">{useRes}</p>}
            </form>

        </Scroll>
    )

}

function StyledInput({ ...props}: HTMLProps<HTMLInputElement>)
{
    return(
        <div className="flex flex-col">
            <label htmlFor={props.id} className="font-bold underline text-3xl">{`${props.id?.substring(0,1).toUpperCase()}${props.id?.substring(1)}`}</label>
            <input required {...props} className="pl-1 border border-white w-80"/>
        </div>
    ) 
}
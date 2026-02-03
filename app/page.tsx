"use client"

import Image from "next/image";
import Command from "@/util/Home/Command";
import Scroll from "@/util/Scroll";
import FeatureBox from "@/util/Home/FeatureBox";

import { useState } from "react";
import ShadeButton from "@/util/ShadeButton";
import Project from "@/util/Project";
import Question from "@/util/Home/Question";
import Model from "@/util/Home/Model";
import { redirect } from "next/navigation";

import clsx from "clsx";

export default function Home() {

  const [ commandFinished, setCommandFinished ] = useState<{ [key: string]: boolean}>({});
  const [ useShade, setShade ] = useState<boolean>(false);

  return (
    <main className={clsx("ml-5 max-md:ml-0 mt-5",
      !commandFinished["start"] && "h-[500vh]"

    )}>
      <div className="text-2xl max-md:pl-3">
        <p>THS CMD</p>
        <p>Copyright THS Club. All rights reserved</p>
      </div>
      <br/>
      <Command text="cat home.txt" callback={()=>{ 
        setCommandFinished({
          ...commandFinished,
          "start": true
        })
      }}/>

     {commandFinished["start"] && 
     <Scroll className="flex max-md:flex-col-reverse items-center justify-between -mt-5">
        <div className="w-[50%] max-md:w-[80vw] max-md:flex max-md:flex-col max-md:items-center">
          <h1 className="text-6xl max-md:text-center shadow_class">Creating the next generations of coders!</h1> 
          <p className="ml-3 max-md:text-center text-2xl mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor</p>
          <div className="flex gap-5 mt-10 max-md:justify-center max-md:pb-20" onMouseLeave={()=>setShade(false)}>
            <ShadeButton shade={!useShade} onMouseEnter={()=>setShade(true)} onClick={()=> redirect("/cshs")}>CSHS</ShadeButton>
            <ShadeButton shade={useShade} onMouseEnter={()=>setShade(false)} onClick={()=> redirect("/gallery")}>Gallery</ShadeButton>
          </div>
        </div>
        <Model/>
      </Scroll>}

      {commandFinished["start"] && (
        <div className="">
          <Command text="cat pleasejoin.txt" callback={()=>{
            setCommandFinished({
              ...commandFinished,
              "pleasejoin": true
            })
          }}/>
          {
            commandFinished["pleasejoin"] && (
              <Scroll>
                <div className="text-center flex flex-col items-center mt-10 gap-3">
                    <h2 className="shadow_class text-white text-8xl">You Belong Here</h2>
                    <p className="text-3xl w-[45%] max-md:w-full">THS Computer Science Club is devoted to furthering students' interest and skill in CS beyond typical school curriculum</p>

                    <div className="flex gap-x-10 mt-10 flex-wrap max-md:flex-col gap-y-5">
                      <FeatureBox title="Competitions" description="There's no complication in the words that you say in the day. What am I saying blah blah blah." image_path="dkfajsdf;lsk"/>
                      <FeatureBox title="Competitions" description="There's no complication in the words that you say in the day. What am I saying blah blah blah." image_path="dkfajsdf;lsk"/>
                      <FeatureBox title="Competitions" description="There's no complication in the words that you say in the day. What am I saying blah blah blah." image_path="dkfajsdf;lsk"/>
                    </div>
                </div>  
              </Scroll>
          )
        }

        </div>
      )}

      {commandFinished["pleasejoin"] && 
      (
        <div className="mt-30">
          <Command text="cat project_highlight.txt" callback={()=>{
            setCommandFinished({
              ...commandFinished,
              "project_highlight": true
            })
          }}/>

          {
            commandFinished["project_highlight"] && (
              <Scroll className="flex text-center flex-col items-center mt-15">
                <h2 className="shadow_class text-white text-6xl">Highlighted Projects</h2>
                <div className="flex gap-5 flex-wrap justify-center mt-10">
                  <Project project={{name:"Project_One", author:"Jaiden_Khosla", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/", projectLink: "https://cnn.com", imageLink:"/assets/Cat.JPG"}}/>
                  <Project project={{name:"Project_One", author:"Jaiden_Khosla", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/", projectLink: "https://cnn.com", imageLink:"/assets/Cat.JPG"}}/>
                  <Project project={{name:"Project_One", author:"Jaiden_Khosla", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/", projectLink: "https://cnn.com", imageLink:"/assets/Cat.JPG"}}/>
                  <Project project={{name:"Project_One", author:"Jaiden_Khosla", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/", projectLink: "https://cnn.com", imageLink:"/assets/Cat.JPG"}}/>
                </div>
              </Scroll>
            )
          }
        </div>
      )
      }

      {
        commandFinished["project_highlight"] && (
          <div className="my-15">
            <Command text="cat faq.txt" callback={()=>{
              setCommandFinished({
                ...commandFinished,
                "faq": true
              })
            }}/>
            
            {
              commandFinished["faq"] && (
                <Scroll className="flex flex-wrap gap-x-5 gap-y-5 pt-5 w-[70%] max-md:w-full max-md:flex-col max-md:items-center">
                  <Question question="Are there fees for the Computer Science Club?" answer="No :3"/>
                  <Question question="Are there fees for the Computer Science Club?" answer="No :3"/>
                  <Question question="Are there fees for the Computer Science Club?" answer="No :3"/>
                  <Question question="Are there fees for the Computer Science Club?" answer="No :3"/>
                </Scroll>
              )
            }

          </div>
        )
      }
    </main>
  )
}

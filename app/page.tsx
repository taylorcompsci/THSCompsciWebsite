"use client"

import Image from "next/image";
import Command from "@/app/util/Command";
import Scroll from "@/app/util/Scroll";
import FeatureBox from "@/app/util/FeatureBox";

import { useState } from "react";
import ShadeButton from "@/app/util/ShadeButton";
import Project from "@/app/util/Project";
import Question from "@/app/util/Question";
import Model from "@/app/util/Model";
import { redirect } from "next/navigation";

import clsx from "clsx";

export default function Home() {

  const [ commandFinished, setCommandFinished ] = useState<{ [key: string]: boolean}>({});
  const [ useShade, setShade ] = useState<boolean>(false);

  return (
    <main className={clsx("ml-5 mt-5",
      !commandFinished["start"] && "h-screen"

    )}>
      <div className="text-2xl">
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
     <Scroll className="flex items-start">
        <div className="w-[60%]">
          <h1 className="mt-15 text-6xl shadow_class">Creating the next generations of coders!</h1> 
          <p className="ml-3 text-2xl mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor</p>
          <div className="flex gap-5 mt-10" onMouseLeave={()=>setShade(false)}>
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
                    <p className="text-3xl w-[45%]">THS Computer Science Club is devoted to furthering students' interest and skill in CS beyond typical school curriculum</p>

                    <div className="flex gap-x-10 mt-10">
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
                  <Project title="Project_One" author="Jaiden_Khosla" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/" link="https://cnn.com" image_path="/assets/Cat.JPG"/>
                  <Project title="Project_One" author="Jaiden_Khosla" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/" link="https://cnn.com" image_path="/assets/Cat.JPG"/>
                  <Project title="Project_One" author="Jaiden_Khosla" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/" link="https://cnn.com" image_path="/assets/Cat.JPG"/>
                  <Project title="Project_One" author="Jaiden_Khosla" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i/" link="https://cnn.com" image_path="/assets/Cat.JPG"/>
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
                <Scroll className="flex flex-wrap gap-x-5 gap-y-5 pt-5 w-[70%]">
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

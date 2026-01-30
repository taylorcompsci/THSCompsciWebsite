"use client"

import Image from "next/image";
import Command from "@/app/util/Command";
import Scroll from "@/app/util/Scroll";
import FeatureBox from "@/app/util/FeatureBox";

import { useState } from "react";
import ShadeButton from "@/app/util/ShadeButton";

export default function Home() {

  const [ commandFinished, setCommandFinished ] = useState<{ [key: string]: boolean}>({});
  const [ useShade, setShade ] = useState<boolean>(false);

  return (
    <div className="ml-5 mt-5">
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
     <Scroll className="w-[50%]">
        <h1 className="mt-15 text-6xl shadow_class">Creating the next generations of coders!</h1> 
        <p className="ml-3 text-2xl mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor</p>
        <div className="flex gap-5 mt-10" onMouseLeave={()=>setShade(false)}>
          <ShadeButton shade={!useShade} onMouseEnter={()=>setShade(true)}>CSHS</ShadeButton>
          <ShadeButton shade={useShade} onMouseEnter={()=>setShade(false)}>Gallery</ShadeButton>
        </div>
      </Scroll>}

      {commandFinished["start"] && (
        <div className="mt-40">
          <Command text="cat pleasejoin.txt" callback={()=>{
            setCommandFinished({
              ...commandFinished,
              "pleasejoin": true
            })
          }}/>
          {
            commandFinished["pleasejoin"] && (
              <div className="text-center flex flex-col items-center mt-10 gap-3">
                  <h2 className="shadow_class text-white text-8xl">You Belong Here</h2>
                  <p className="text-3xl w-[45%]">THS Computer Science Club is devoted to furthering students' interest and skill in CS beyond typical school curriculum</p>

                  <div>
                    <FeatureBox title="Competitions" description="Lorem fajskdlfjal;sjfasjf;ad fja;sdfj asfja jd fjklsjdfl;kajsld;fjlk;sfdj;ladjf;lkajd;fklaj" image_path="dkfajsdf;lsk"/>
                  </div>
              </div>  
          )
          }

        </div>
      )}
    </div>
  )
}

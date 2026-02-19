"use client"

import Command from "@/util/Home/Command";
import FeatureBox from "@/util/Home/FeatureBox";
import Scroll from "@/util/Scroll";

import { Discord, Joystick, Medal } from "@boxicons/react";

import Model from "@/util/Home/Model";
import Question from "@/util/Home/Question";
import Project, { ProjectProps } from "@/util/Project";
import ShadeButton from "@/util/ShadeButton";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import clsx from "clsx";

import { getProjects } from "@/actions/Actions";

const FEATURED_PROJECTS: string[] = ["Chess", "Gordle", "Plinko: Win at Life"];

export default function Home() {

  const [ commandFinished, setCommandFinished ] = useState<{ [key: string]: boolean}>({});
  const [ useShade, setShade ] = useState<boolean>(false);
  const [ useProjects, setProjects ] = useState<ProjectProps[]>();

  useEffect(()=>{
    getProjects().then(arr=>arr && setProjects(arr.filter(proj=>proj && FEATURED_PROJECTS.includes(proj.Name))));
  }, [])

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
          <h1 className="text-6xl max-md:text-center shadow_class">Creating the next generation of coders!</h1> 
          <p className="ml-3 max-md:text-center text-2xl mt-5">{"We're the James E. Taylor Computer Science Club. Our goal is to provide a place for students to learn, discuss, teach, and apply computer science skills through competitions, projects, workshops, and more!"}</p>
          <div className="flex gap-5 mt-10 max-md:justify-center max-md:pb-20" onMouseLeave={()=>setShade(false)}>
            <ShadeButton shade={!useShade} onMouseEnter={()=>setShade(true)} onClick={()=> redirect("/projects")}>Projects</ShadeButton>
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
                    <h2 className="shadow_class text-white text-7xl">You Belong Here</h2>
                    <p className="text-3xl w-[45%] max-md:w-full">{"THS Computer Science Club is devoted to furthering students' interest and skill in CS beyond typical school curriculum"}</p>

                    <div className="flex gap-x-10 mt-10 flex-wrap max-md:flex-col gap-y-5">
                      <FeatureBox title="Competitions" description={"Competitions are a great way to build upon your problem solving skills! Contests are also a decent way to apply the things you've learned in CSA and CS3."} icon={Medal}/>
                      <FeatureBox title="Active Discord Server" description="We have a Discord server consisting of 100+ members! On there, you can ask questions about CS, show off your projects, and socialize with a great group of people. We also host game nights on there every once a while." route="https://discord.com/invite/GMQvwGryHg" icon={Discord}/>
                      <FeatureBox title="Projects" description="We encourage people to start building their own projects, mainly through our gamejams! Go check out our projects page to see all the things our members have built!" icon={Joystick}/>
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
                    {useProjects && useProjects.map((e, idx)=><Project key={idx} project={e}/>)}
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
                  <Question question="Are there fees for the Computer Science Club?" answer="Our club will always be free!"/>
                  <Question question="How much computer science do I need to know to join?" answer="You can join the club even if you don't any programming! However, to attend competitions and actively participate in our projects/activities, we recommend you take CSA (or learn the basics of the Java Programming Language)."/>
                  <Question question="When are the meetings?" answer="We generally meet at the beginning of every month (always on a Wednesday) in Mr. Beck's room (room #1940). To stay notified, please either follow our Instagram or join our Remind/Discord."/>
                  <Question question="I would like to show off some of my projects! Where can I do that?" answer="We showcase all of our member projects on our project page! On the page, there will be a link where you can submit your projects."/>
                </Scroll>
              )
            }

          </div>
        )
      }
    </main>
  )
}

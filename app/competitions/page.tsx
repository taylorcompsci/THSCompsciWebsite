import Project from "@/util/Project";
import Scroll from "@/util/Scroll";
import Image from "next/image";

export default function Competitions()
{
    return (
        <div className="mt-10 ml-3">
            <Scroll className="flex flex-col text-center items-center max-md:flex-col-reverse">
                <div className="flex flex-col items-center">
                    <h1 className="shadow_class text-6xl">Competitions</h1>
                    <p className="w-180 max-md:w-100 text-lg">Competitions test your problem solving skills and algorithmic thinking! Competitive Programming is a great way to gain valueable experience for CS.</p>
                </div>

                <div className="text-center flex flex-col items-center">
                    <Image src="/assets/competitionResources/codewarsImage.png" className="w-100 mt-10" alt="CAT D:" width={300} height={400}/>
                    <p className="text-lg italic text-shdn">Us at HPE CodeWars :D</p>
                </div>
            </Scroll>
            <div className="mt-10">
                <h1 className="text-6xl shadow_class text-center underline">General Structure</h1>

                <Scroll className="mt-10 flex items-start justify-between max-md:flex-col-reverse max-md:items-center">
                    <div className="w-[50%] max-md:w-full">
                        <h1 className="text-5xl shadow_class">Programming Portion</h1>
                        <div className="flex flex-col text-xl">
                            <p className="font-bold underline">The general structure of a programming contest is the following:</p>
                            <ul className="list-disc ml-5">
                                <li>15-20 Programming problems to solve in 2-3 hours. Problems cover fundamentals, datastructures, algorithms, and overall problem solving.</li>
                                <li>{"You will be in teams of up to 3. At least one of your team members must have a device capable of writing and running code. One device per team. Online editors don't count as you won't have an internet connection during the contest period."}</li>
                                <li>You must have a programming language installed on your machine. Every competition supports Java 8 and up. C++ and Python are supported at a majority of contests. When we send signups, you will be notified on which languages are supported.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-100 mr-25 max-md:mr-0">
                        <Image src="/assets/competitionResources/StackingXorkins.png" width={700} height={800} alt="Xorkins Problem" className="w-full"/>
                        <p className="w-100 italic text-shdn">Stacking Xorkins, an extremely difficult problem from the 2025 THS Halloween Competition.</p>
                    </div>
                </Scroll>

                <section className="mt-10 flex items-start justify-between max-md:flex-col-reverse max-md:items-center">
                    <div className="w-[50%] max-md:w-full">
                        <h1 className="text-5xl shadow_class">Written Portion</h1>
                        <div className="flex flex-col text-xl ml-5">
                            <p>{`Nearly every competition we attend (exceptions being HPE CodeWars, CodeQuest, etc) has a written portion. The written portion is a 40 question test consisting mostly of multiple-choice-questions. 
                            Each question is worth 6 points. You don't lose points when leaving an answer blank. However, getting a question wrong subtracts 6 points from your score. You have an hour to complete 40ish problems.`}</p>
                        </div>
                    </div>

                    <div className="w-100 mr-25">
                        <Image src="/assets/competitionResources/UIL2007.png" width={700} height={800} alt="Xorkins Problem" className="w-full"/>
                        <p className="w-100 italic text-shdn">Page from UIL Invitational A, 2007</p>
                    </div>
                </section>

                <Scroll className="mt-10">
                    <h1 className="text-6xl shadow_class text-center underline">Study Resources</h1>
                                
                    <h2 className="text-6xl shadow_class text-center my-5">Learning Java</h2>
                    <div className="flex gap-5 justify-center flex-wrap">
                        
                        <Project project={
                            {
                                Name: "Code Academy - Java Courses",
                                author: "Code Academy",
                                projectLink: "https://www.codecademy.com/learn/learn-java",
                                imageLink: "/assets/competitionResources/codeAcademyJava.png",
                                description: "Code Academy offers a more hands on approach to learning Java. It has several courses with DAYS of content to explore. Plus, it's free under your KatyISD school account (MyKatyCloud -> CodeAcademy)"
                            }
                        }/>
                        <Project project={
                            {
                                Name: "Java Full Course",
                                author: "BroCode",
                                projectLink: "https://www.codecademy.com/learn/learn-java",
                                imageLink: "/assets/competitionResources/BroCode.jpg",
                                description: "This video goes over all the essentials to start programming in Java. On top of the fundamentals, BroCode goes over special concepts such as generics, enums, and datastructures. His channel is an actual goldmine."
                            }
                        }/>
                    </div>

                    <h2 className="text-6xl shadow_class text-center my-5">Programming Portion</h2>
                    <div className="flex gap-5 justify-center flex-wrap">
                        
                        <Project project={
                            {
                                Name: "USACO Guide",
                                author: "usacoguide",
                                projectLink: "https://usaco.guide/dashboard",
                                imageLink: "/assets/competitionResources/usacoGuide.png",
                                description: "USACO Guide is a tool used to study for the United States of America Computing Olympiad (USACO). However, it's a great resource for learning about patterns such as prefix sum, sliding window, difference arrays, coordinate compression, and more!"
                            }
                        }/>
                        <Project project={
                            {
                                Name: "Competitive Programmer's Handbook",
                                author: "Antti Laaksonen",
                                projectLink: "https://cses.fi/book/book.pdf",
                                imageLink: "/assets/competitionResources/CompHandbook.png",
                                description: "This book is one of the best resources out there for learning competitive programming. More than 250 pages going over datastrucutres, algorithms, dynamic programming, and more! Definately a must read."
                            }
                        }/>
                        <Project project={
                            {
                                Name: "Competitive Programming Algorithms",
                                author: "Open Source Community",
                                projectLink: "https://cp-algorithms.com/",
                                imageLink: "/assets/competitionResources/compAlgo.png",
                                description: "Open source project that translate the russian programming website, E-Maxx. Has a numerous amount of articles going over competitive programming topics in grave detail."
                            }
                        }/>
                    </div>
          
                    <h2 className="text-6xl shadow_class text-center my-5 mt-15">Written Portion</h2>
                    <div className="flex gap-5 justify-center flex-wrap">
                        
                        <Project project={
                            {
                                Name: "UIL Legends",
                                author: "Andrew Yoon",
                                projectLink: "https://uil-legends-api.onrender.com/",
                                imageLink: "/assets/competitionResources/uilLegends.png",
                                description: "A UIL studying tool developed by a student from Tompkins high school. The site has a lot of practice question sets directly ripped from previous contests."
                            }
                        }/>
                        <Project project={
                            {
                                Name: "UIL-DL",
                                author: "Shubh Randeria",
                                projectLink: "https://uildl.randeria.dev/",
                                imageLink: "/assets/competitionResources/uildl.png",
                                description: "A tool enabling easy and bulk download of UIL Academics contest materials and data files."
                            }
                        }/>
                        {/* <Project project={
                            {
                                name: "Competitive Programming Algorithms",
                                author: "Open Source Community",
                                projectLink: "https://cp-algorithms.com/",
                                imageLink: "/assets/competitionResources/compAlgo.png",
                                description: "Open source project that translate the russian programming website, E-Maxx. Has a numerous amount of articles going over competitive programming topics in grave detail."
                            }
                        }/> */}
                    </div>
                </Scroll>
            </div>
        </div>
    )
}


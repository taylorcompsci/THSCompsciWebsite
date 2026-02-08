import Officer from "@/util/Officers/Officer";
import Scroll from "@/util/Scroll";


export default function Officers()
{
    return (
        <Scroll className="flex flex-col items-center mt-10">
            <h1 className="shadow_class text-6xl">Officers</h1>        
            <div className="mt-10 flex flex-wrap justify-center gap-5">
                <Officer name="Jaiden Khosla" role="Vice President" background="bg-blue-400" description={"I enjoy programming, mathematics, music, and cats. Currently, I'm a sophmore interested in pursuing a computer science pathway. My favorite bands are Radiohead, Primus, and Stone Temple Pilots while my favorite TV show is Scrubs. (Fun fact: I coded this website)"} github="https://github.com/JaidenKhosla" instagram="https://www.instagram.com/jaidenkhosla" image="/assets/officers/JaidenKhosla.png"/>
                <Officer name="David Liu" role="Director of Competition" description={"I have large dreams of making society better by combining music with artificial intelligence.I am very effective at achieving my goals because I believe that both efficiency and hard work contribute to solving hard problems. I always think about whether there is a faster and more effective way to get the grade or win a competition. My hobbies include coding, playing the violin, playing tennis. My favorite algorithm is KMP and my favorite line of code is auto result = std::reduce(v.begin(), v.end());"} image="/assets/officers/DavidLiu.png"/>
            </div>
        </Scroll>
    )
}
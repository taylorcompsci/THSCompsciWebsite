import React, { ReactElement, useEffect, useRef } from "react";

interface ScrollProps extends React.HTMLProps<HTMLDivElement>
{
    children?: React.ReactNode
}

export default function Scroll({ children, ...props }: ScrollProps)
{


    const divElement = useRef<HTMLDivElement|null>(null);

    useEffect(()=>{

        divElement.current?.style.setProperty("opacity", "0");

        const observer = new IntersectionObserver((items)=>{
            items.forEach((item)=>{
                item.target.classList.add("fade-in");
            })
        }, { threshold: 0.8});

        observer.observe(divElement.current!);
    }, []);



    return (
        <section {...props} ref={divElement}>
           {children}
        </section>
    )

}
import type { Metadata } from "next";
import localfont from "next/font/local";
import "./globals.css";
import 'katex/dist/katex.min.css';

import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import { CommandWrapper, RootCommand } from "@/util/Home/Command";
import { ChildProcess } from "child_process";


const scientifica = localfont({
  src: [
    {
      path: "./fonts/scientifica.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "./fonts/scientificaBold.ttf",
      weight: "800",
      style: "bold"
    },
    {
      path: "./fonts/scientificaItalic.ttf",
      weight: "400",
      style: "italic"
    },
  ]
})

export const metadata: Metadata = {
  title: "THS Computer Science",
  description: "Creating the next generation of coders!",
  keywords: ["THS", "James E. Taylor High School", "JET", "THS COMPSCI", "JET COMPSCI", "THS Computer Science"],
  icons: {
    icon: "/assets/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${scientifica.className} bg-background antialiased`}
      >
        <div className="top-0 opacity-15 fixed pointer-events-none w-screen h-screen bg-[repeating-linear-gradient(to_bottom,transparent_0,white_3px)]"/>
        <Navbar/>
        <main className="min-h-screen mt-5 ml-5">
          <CommandWrapper>
            {children}
          </CommandWrapper>
        </main>

        <Footer/>
      </body>
    </html>
  );
}

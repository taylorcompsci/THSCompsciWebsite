"use client"

import Image from "next/image";
import Command from "@/app/util/Command";
export default function Home() {
  return (
    <div className="ml-5 mt-5">
      <div className="text-2xl">
        <p>THS CMD</p>
        <p>Copyright THS Corp. All rights reserved</p>
      </div>
      <Command command="ls " text="argssfkalfas;"/>
    </div>
  )
}

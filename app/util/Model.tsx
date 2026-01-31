"use client"

import * as THREE from "three";
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
// import { EffectComposer, Pixelation } from "@react-three/postprocessing";


function Logo(props: ThreeElements['group']) {
    const THS_LOGO = useGLTF("/assets/logo.glb");

    const model_ref = useRef<THREE.Group>(null);

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false);

    const SPEED = 1;

    return (
        <Center>
            <OrbitControls enableZoom={false} enableDamping={true} rotateSpeed={SPEED} onEnd={()=>{

            }}/>
            <group scale={1.5} ref={model_ref} {...props}>
                <primitive object={THS_LOGO.scene}/>
            </group>
        </Center>
    );
}

export default function Model()
{

    return (
        <div className="size-150 touch-auto">
            
        </div>
    )
}
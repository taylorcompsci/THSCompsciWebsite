"use client"

import * as THREE from "three";
import { useEffect, useRef, useState } from 'react'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import {  OrbitControls } from "@react-three/drei";
import { EffectComposer, RenderPass, EffectPass, ASCIIEffect, ASCIITexture, BlendFunction, BrightnessContrastEffect } from "postprocessing";

useGLTF.preload("/assets/logo.glb");

function Logo(props: ThreeElements['group']) {
    const { scene, camera, gl, size} = useThree();
    
    const composerRef = useRef<EffectComposer|null>(null);

    useEffect(()=>{
        
        const compos = new EffectComposer(gl);

        composerRef.current = compos;
    
        const renderPass = new RenderPass(scene, camera);
        
        compos.addPass(renderPass);
    
        const asciiTexture = new ASCIITexture({ characters: "@#&$%XMW80OQ"});
    
        const asciiEffect = new ASCIIEffect({
          asciiTexture: asciiTexture,
          cellSize: 10,
          inverted: true
        //   color: "#FFFFFF"
        });
    
        const dpRatio = window.devicePixelRatio;

        const cellSize = Math.min(1, Math.floor(1/dpRatio), Math.floor(1*dpRatio));

        composerRef.current.setSize(
            size.width / cellSize,
            size.height / cellSize
        );

        
        
        asciiEffect.blendMode.blendFunction = BlendFunction.SET;
        asciiEffect.blendMode.opacity.value = 1;
        const asciiPass = new EffectPass(camera,
            asciiEffect,
        )

        compos.addPass(asciiPass);
    
    }, []);

    useFrame(()=>{
        if(composerRef.current)
            composerRef.current.render()
    }, 2);

    const THS_LOGO = useGLTF("/assets/logo.glb");

    const model_ref = useRef<THREE.Group>(null);

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false);

    const SPEED = 1;

    return (
        <Center>
            <OrbitControls enableZoom={false} enableDamping={true} autoRotate rotateSpeed={SPEED} onEnd={()=>{

            }}/>
            <hemisphereLight intensity={5}/>
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
            <Canvas>
                <Logo/>
            </Canvas>
        </div>
    )
}
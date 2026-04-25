"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { Button } from "@/components/ui/button";

const NoiseLayer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));

        const noise = createNoise2D();
        const image = ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const v = (noise(x * 0.6, y * 0.6) + 1) * 0.5;
                const i = (y * canvas.width + x) * 4;
                const g = Math.floor(v * 255);
                image.data[i] = g;
                image.data[i + 1] = g;
                image.data[i + 2] = g;
                image.data[i + 3] = 90;
            }
        }
        ctx.putImageData(image, 0, 0);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 w-full h-full mix-blend-overlay opacity-40 pointer-events-none"
        />
    );
};

const HoloPanel = ({ children }: { children: React.ReactNode }) => {
    const reducedMotion = useReducedMotion();
    return (
        <motion.div
            className="holo bevel relative w-full h-[360px] rounded-2xl overflow-hidden"
            animate={
                reducedMotion
                    ? undefined
                    : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
            }
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
            {children}
            <NoiseLayer />
        </motion.div>
    );
};

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="flex space-x-10 pt-10 justify-center md:justify-normal"
        >
            <div className="flex flex-col basis-2/4 space-y-10">
                <h2 className="text-3xl md:text-5xl leading-tight font-serif font-semibold tracking-wide">
                    <span className="block text-[1.05em] opacity-70 uppercase tracking-widest font-mono">
                        Antonii Shymchyts
                    </span>
                    <span className="block chrome-text">full-stack developer</span>
                </h2>
                <p className="max-w-sm text-lg opacity-80">
                    I am a software developer focusing on
                    <span className="font-semibold"> Java</span> and
                    <span className="font-semibold"> Next.js</span>. I craft backend
                    systems with strong architecture and modern web frontends that
                    balance performance with aesthetic minimalism.
                </p>
                <div className="flex space-x-4">
                    <Link href="#about">
                        <Button variant="y2k">About Me</Button>
                    </Link>
                    <Link href="#contact">
                        <Button variant="chrome">Contact</Button>
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex basis-2/4">
                <HoloPanel>
                    <Image
                        src="/goofy.jpg"
                        alt="Antonii Shymchyts"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 mix-blend-luminosity"
                        priority
                    />
                </HoloPanel>
            </div>
        </section>
    );
};

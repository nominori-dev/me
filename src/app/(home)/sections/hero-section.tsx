"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";

export const HeroSection = () => {
    return (
        <section id={"about"} className={"flex space-x-10 pt-10 justify-center md:justify-normal"}>
            <div className="flex flex-col basis-2/4 space-y-10">
                <h2 className="text-3xl md:text-5xl leading-tight font-serif font-semibold tracking-wide" >
                    <span className="block text-[1.05em] opacity-70 uppercase tracking-widest">Antonii Shymchyts</span>
                    <span className="block neon-glow">full-stack developer</span>
                </h2>
                <p className="max-w-sm text-lg opacity-80">
                    I am a software developer focusing on
                    <span className="font-semibold"> Java</span> and
                    <span className="font-semibold"> Next.js</span>.
                    I craft backend systems with strong architecture and modern web frontends that balance performance with aesthetic minimalism.</p>
                <div className="flex space-x-4">
                    <Link href="#about">
                        <Button variant={"brutal"}>About Me</Button>
                    </Link>
                    <Link href="#contact">
                        <Button variant={"brutal"}>Contact</Button>
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex basis-2/4 w-full h-[360px] rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 to-black/80 shadow-2xl flex items-center justify-center">
                <img src="/goofy.jpg" alt="Hero Graphic" className="opacity-90" />
            </div>
        </section>
    )
}
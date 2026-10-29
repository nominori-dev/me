"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const stars = [
    { left: "38%", top: "27%", delay: 0 },
    { left: "72%", top: "38%", delay: 1.2 },
    { left: "87%", top: "57%", delay: 2.4 },
    { left: "57%", top: "64%", delay: 3.4 },
];

export const HeroSection = () => {
    const reduced = useReducedMotion();
    return <section id="hero" className="hero">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
            <h1>Thoughtful<br />code for the<br /><em>real world.</em></h1>
            <p className="hero-description">Hello, I’m Antonii. I build reliable backend systems and considered web experiences — from the first idea to the final detail.</p>
            <div className="hero-actions"><Link href="/projects" className="button-primary">EXPLORE MY WORK <span>↗</span></Link><Link href="#about" className="button-text">A LITTLE ABOUT ME <span>↓</span></Link></div>
        </motion.div>
        <motion.div className="hero-art" aria-hidden="true" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: "var(--hero-opacity)" }} transition={{ duration: 1.2, ease: "easeOut" }} />
        <div className="hero-stars" aria-hidden="true">{stars.map((star) => <motion.span key={star.left} className="hero-star" style={{ left: star.left, top: star.top }} initial={false} animate={reduced ? { opacity: 0 } : { opacity: [.12, 1, .12], scale: [.7, 1.25, .7] }} transition={{ duration: 3.5, delay: star.delay, repeat: Infinity, ease: "easeInOut" }} />)}</div>
        <a className="hero-credit" href="https://nousresearch.com" target="_blank" rel="noreferrer">image: nous research ↗</a>
    </section>;
};

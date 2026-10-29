"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound, FolderOpen, Github, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Header = () => {
    const [compact, setCompact] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
        const update = () => setCompact(window.scrollY > 60);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);
    return <div className="header-shell" id="top"><header className={`site-header${compact ? " is-compact" : ""}`}>
        <Link href="/" className="brand" aria-label="Antonii Shymchyts home"><span className="brand-mark">A<span>✳</span></span><span className="brand-name">ANTONII<br /><strong>SHYMCHYTS</strong></span></Link>
        <nav className="site-nav" aria-label="Main navigation">
            <Link href="/#about" className="nav-text-link" aria-label="About" title="About"><UserRound className="nav-icon" size={18}/><span className="nav-label">about</span></Link>
            <Link href="/projects" className="nav-text-link" aria-label="Projects" title="Projects"><FolderOpen className="nav-icon" size={18}/><span className="nav-label">projects</span></Link>
            <Link href="https://github.com/nominori-dev" aria-label="GitHub" title="GitHub"><Github className="nav-icon" size={18}/><span className="nav-label">github ↗</span></Link>
            <Link href="mailto:nominori999@gmail.com" className="nav-mail" aria-label="Email" title="Email"><Mail className="nav-icon" size={18}/><span className="nav-label">let’s talk ↗</span></Link>
            <button type="button" className="theme-toggle" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"} title={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>{mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
        </nav>
    </header></div>;
};

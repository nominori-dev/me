import {Logo} from "@/components/branding/logo";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="relative z-10 py-12 px-6 flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
                <div className="w-40 h-auto text-white">
                    <Link href="/"><Logo/></Link>
                </div>
            </div>
            <nav className="space-x-6 opacity-80 hidden md:flex">
                <Link className="hover:underline" href="#about">about</Link>
                <Link className="hover:underline" href="#contact">contact</Link>
                <Link className="hover:underline" href="https://github.com/nominori-dev">github</Link>
            </nav>
        </header>
    )
}
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    return (
        <header className={"z-10 py-12 px-2 flex flex-row justify-between items-center max-w-[90%] mx-auto"}>
            <div className="relative  flex flex-col max-w-6xl">
                <div className="flex items-center gap-4">
                    <h1 className="w-50 h-auto font-bold text-xl">
                        Antonii Shymchyts
                    </h1>
                </div>
                <nav className="space-x-2 opacity-80 flex">
                    <Link className="hover:underline" href="mailto:nominori999@gmail.com">nominori999@gmail.com</Link>
                </nav>
                <nav className="space-x-2 opacity-80 flex">
                    <Link className="hover:underline" href="https://github.com/nominori-dev">github</Link>
                    <Link className="hover:underline" href="https://www.linkedin.com/in/nominori/">linkedin</Link>
                </nav>
            </div>
            <div>
                <div>
                    <Image src={"/qr-code.png"} alt={"qr-code"} width={"150"} height={"150"}/>
                </div>
            </div>
        </header>
    )
}
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { label: "projects", href: "/projects" },
    { label: "github", href: "https://github.com/nominori-dev" },
    { label: "linkedin", href: "https://www.linkedin.com/in/nominori/" },
];

export const Header = () => {
    return (
        <header className="z-10 py-12 px-2 flex flex-row justify-between items-center max-w-[90%] mx-auto">
            <div className="flex flex-col gap-2 max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="chrome-text">Antonii Shymchyts</span>
                </h1>
                <Link
                    className="font-mono text-xs uppercase tracking-wider opacity-70 hover:opacity-100 hover:underline w-fit"
                    href="mailto:nominori999@gmail.com"
                >
                    nominori999@gmail.com
                </Link>
                <nav className="flex gap-3 mt-1 font-mono text-xs uppercase tracking-wider">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            className="opacity-70 hover:opacity-100 hover:underline"
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* Reserved for the locale switcher introduced in milestone 3. */}
                    <span data-slot="locale-switcher" />
                </nav>
            </div>
            <Image src="/qr-code.png" alt="qr-code" width={150} height={150} />
        </header>
    );
};

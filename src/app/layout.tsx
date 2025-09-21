import type { Metadata } from "next";
import "@/app/(home)/globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: "nominori-dev | Portfolio",
    description:
        "Portfolio of Antonii Shymchyts (nominori-dev) — Full-Stack Java & Next.js developer crafting backend systems and modern web experiences.",
    keywords: [
        "nominori-dev",
        "Antonii Shymchyts",
        "Java developer",
        "Next.js developer",
        "Spring Boot",
        "Fullstack",
        "Portfolio",
    ],
    authors: [{ name: "Antonii Shymchyts", url: "https://github.com/nominori-dev" }],
    creator: "nominori-dev",
    publisher: "nominori-dev",
    metadataBase: new URL("https://me-snowy-zeta-34.vercel.app"),
    openGraph: {
        title: "nominori-dev | Java & Next.js Developer",
        description:
            "Portfolio of Antonii Shymchyts — backend and frontend projects with Java, Spring Boot, and Next.js.",
        url: "https://me-snowy-zeta-34.vercel.app",
        siteName: "nominori-dev Portfolio",
        images: [
            {
                url: "/og_banner.png",
                width: 1200,
                height: 630,
                alt: "nominori-dev portfolio preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    category: "technology",
    robots: {
        index: true,
        follow: true,
    },
    other: {
        contact: "nominori999@gmail.com",
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased max-w-[1440px] mx-auto`}
      >
        <ThemeProvider attribute={"class"} defaultTheme={"light"} enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

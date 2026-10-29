import type { Metadata } from "next";
import { getAllProjects } from "./lib/projects";
import { ProjectsGrid } from "./sections/projects-grid";

export const metadata: Metadata = {
    title: "Projects | nominori-dev",
    description:
        "Selected projects by Antonii Shymchyts — backend systems, full-stack web apps, and experiments.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "Projects | nominori-dev",
        description:
            "Selected projects by Antonii Shymchyts — backend systems, full-stack web apps, and experiments.",
        url: "/projects",
        type: "website",
    },
};

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <main id="main-content" className="content-column mx-auto page-content">
            <header className="mb-10 space-y-3">
                <h1 className="page-title">Projects</h1>
                <p className="opacity-70 max-w-2xl">
                    A curated selection of things I&apos;ve built — backend services,
                    full-stack web apps, and the occasional experiment.
                </p>
            </header>
            <ProjectsGrid projects={projects} />
        </main>
    );
}

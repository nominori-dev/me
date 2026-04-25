import Link from "next/link";
import { getFeaturedProjects } from "@/app/(home)/projects/lib/projects";
import { ProjectsGrid } from "@/app/(home)/projects/sections/projects-grid";

export const FeaturedProjects = async () => {
    const projects = await getFeaturedProjects(3);
    if (projects.length === 0) return null;

    return (
        <section
            id="featured-projects"
            className="max-w-[90%] mx-auto mt-16 space-y-6"
        >
            <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl">Featured projects</h2>
                <Link
                    href="/projects"
                    className="text-sm opacity-70 hover:opacity-100 hover:underline"
                >
                    All projects →
                </Link>
            </div>
            <ProjectsGrid projects={projects} />
        </section>
    );
};

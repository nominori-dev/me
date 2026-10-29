import Link from "next/link";
import { getFeaturedProjects } from "@/app/(home)/projects/lib/projects";
import { ProjectsGrid } from "@/app/(home)/projects/sections/projects-grid";

export const FeaturedProjects = async () => {
    const projects = await getFeaturedProjects(3);
    return <section id="featured-projects" className="featured-section"><div className="section-label"><span>02 / SELECTED WORK</span><span>A FEW THINGS I’VE BUILT</span></div><div className="featured-heading"><h2>Work, in <em>practice.</em></h2><Link href="/projects" className="inline-link">VIEW ALL PROJECTS <span>↗</span></Link></div><ProjectsGrid projects={projects} /></section>;
};

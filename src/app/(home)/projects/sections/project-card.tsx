import Link from "next/link";
import type { Project } from "../lib/projects";
import { CaseVisual } from "../components/case-visual";

export const ProjectCard = ({ project }: { project: Project }) => (
    <Link href={`/projects/${project.slug}`} className="project-card">
        <div className="case-card-art"><CaseVisual variant={project.visual} project={project.slug} /><span className="case-card-status">{project.status ? `${project.status} / ` : ""}{project.private ? "Private access" : "Public repository"}</span><span className="case-card-arrow" aria-hidden="true">↗</span></div>
        <div className="project-card-body"><div className="case-card-category">{project.tech.slice(0, 2).join(" / ")}</div><h3>{project.title}</h3><p>{project.summary}</p><span className="case-card-link">Explore case <span aria-hidden="true">↗</span></span></div>
    </Link>
);

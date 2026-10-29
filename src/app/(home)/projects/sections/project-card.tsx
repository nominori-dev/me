import Link from "next/link";
import type { Project } from "../lib/projects";

const dateFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" });
export const ProjectCard = ({ project }: { project: Project }) => (
    <Link href={`/projects/${project.slug}`} className="project-card"><div className="project-card-top"><span>PROJECT / {dateFormatter.format(project.publishedAt).toUpperCase()}</span><span>↗</span></div><div className="project-card-body"><h3>{project.title}</h3><p>{project.summary}</p></div><div className="project-tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></Link>
);

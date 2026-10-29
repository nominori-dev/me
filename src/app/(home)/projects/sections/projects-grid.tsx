import type { Project } from "../lib/projects";
import { ProjectCard } from "./project-card";
export const ProjectsGrid = ({ projects }: { projects: Project[] }) => projects.length === 0 ? <p className="empty-projects">New work is in progress. Check back soon.</p> : <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>;

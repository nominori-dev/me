import type { Project } from "../lib/projects";
import { ProjectCard } from "./project-card";

export const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
    if (projects.length === 0) {
        return (
            <p className="opacity-70">No projects published yet — check back soon.</p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
    );
};

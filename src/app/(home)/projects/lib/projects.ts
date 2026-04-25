import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "./schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = ProjectFrontmatter & {
    slug: string;
    content: string;
};

let cache: Promise<Project[]> | undefined;

const loadAll = async (): Promise<Project[]> => {
    const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && e.name.endsWith(".mdx"));

    const projects = await Promise.all(
        files.map(async (file) => {
            const slug = file.name.replace(/\.mdx$/, "");
            const raw = await fs.readFile(path.join(PROJECTS_DIR, file.name), "utf8");
            const { data, content } = matter(raw);
            const parsed = projectFrontmatterSchema.safeParse(data);
            if (!parsed.success) {
                throw new Error(
                    `Invalid frontmatter in content/projects/${file.name}: ${parsed.error.message}`,
                );
            }
            return { ...parsed.data, slug, content } satisfies Project;
        }),
    );

    return projects.sort(
        (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
};

export const getAllProjects = (): Promise<Project[]> => {
    if (!cache) cache = loadAll();
    return cache;
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
    const all = await getAllProjects();
    return all.find((p) => p.slug === slug);
};

export const getFeaturedProjects = async (limit = 3): Promise<Project[]> => {
    const all = await getAllProjects();
    return all.filter((p) => p.featured).slice(0, limit);
};

import type { MetadataRoute } from "next";
import { getAllProjects } from "@/app/(home)/projects/lib/projects";

const SITE_URL = "https://me-snowy-zeta-34.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getAllProjects();
    const lastProjectUpdate = projects[0]?.publishedAt ?? new Date();

    return [
        {
            url: SITE_URL,
            lastModified: lastProjectUpdate,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/projects`,
            lastModified: lastProjectUpdate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...projects.map((p) => ({
            url: `${SITE_URL}/projects/${p.slug}`,
            lastModified: p.publishedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];
}

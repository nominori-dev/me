import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Mdx } from "../components/mdx";
import { getAllProjects, getProjectBySlug } from "../lib/projects";

type Params = { slug: string };

export const dynamicParams = false;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const generateStaticParams = async (): Promise<Params[]> => {
    const projects = await getAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return {};

    const url = `/projects/${project.slug}`;
    return {
        title: `${project.title} | nominori-dev`,
        description: project.summary,
        alternates: { canonical: url },
        openGraph: {
            title: project.title,
            description: project.summary,
            url,
            type: "article",
            publishedTime: project.publishedAt.toISOString(),
            ...(project.cover ? { images: [{ url: project.cover }] } : {}),
        },
    };
};

export default async function ProjectPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) notFound();

    return (
        <main className="max-w-[90%] mx-auto py-10">
            <Link
                href="/projects"
                className="text-sm opacity-70 hover:opacity-100 hover:underline"
            >
                ← All projects
            </Link>

            <article className="mt-6 max-w-3xl">
                <header className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold">{project.title}</h2>
                    <p className="opacity-80 text-lg">{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <Badge key={t} variant="secondary">
                                {t}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm opacity-70">
                        <time dateTime={project.publishedAt.toISOString()}>
                            {dateFormatter.format(project.publishedAt)}
                        </time>
                        {project.repo && (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Repository ↗
                            </a>
                        )}
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Live ↗
                            </a>
                        )}
                    </div>
                </header>

                <div className="mdx-content mt-10">
                    <Mdx source={project.content} />
                </div>
            </article>
        </main>
    );
}

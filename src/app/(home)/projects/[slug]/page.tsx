import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseVisual } from "../components/case-visual";
import { Mdx } from "../components/mdx";
import { getAllProjects, getProjectBySlug } from "../lib/projects";

type Params = { slug: string };

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

    const headings = [...project.content.matchAll(/^## (.+)$/gm)].map((match) => ({ title: match[1], id: match[1].toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-") }));
    return (
        <main id="main-content" className="content-column mx-auto page-content case-page">
            <Link href="/projects" className="case-back">← All projects</Link>
            <article>
                <header className="case-hero">
                    <div><p className="case-kicker">CASE STUDY / {project.status && `${project.status.toUpperCase()} / `}{project.private ? "PRIVATE ACCESS" : "PUBLIC REPOSITORY"}</p><h1 className="page-title">{project.title}</h1><p className="case-intro">{project.summary}</p><div className="case-meta">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>{project.repo && <a className="case-repo" href={project.repo} target="_blank" rel="noopener noreferrer">View repository ↗</a>}</div>
                    <div className="case-hero-art"><CaseVisual variant={project.visual} project={project.slug} /></div>
                </header>
                <div className="case-layout"><nav aria-label="On this page" className="case-nav"><span>IN THIS CASE</span>{headings.map((heading, i) => <a key={heading.id} href={`#${heading.id}`}><span>{String(i + 1).padStart(2, "0")} &nbsp; {heading.title}</span><span>↗</span></a>)}</nav><div className="case-article mdx-content"><Mdx source={project.content} /></div></div>
            </article>
        </main>
    );
}

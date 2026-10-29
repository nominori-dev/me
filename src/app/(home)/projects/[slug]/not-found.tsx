import Link from "next/link";

export default function ProjectNotFound() {
    return (
        <main id="main-content" className="content-column mx-auto py-20 text-center space-y-4">
            <h1 className="page-title">Project not found</h1>
            <p className="opacity-70">
                That project doesn&apos;t exist (yet).
            </p>
            <Link
                href="/projects"
                className="inline-block underline opacity-80 hover:opacity-100"
            >
                ← Back to all projects
            </Link>
        </main>
    );
}

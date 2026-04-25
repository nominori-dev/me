import Link from "next/link";

export default function ProjectNotFound() {
    return (
        <main className="max-w-[90%] mx-auto py-20 text-center space-y-4">
            <h2 className="text-3xl font-semibold">Project not found</h2>
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

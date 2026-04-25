import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Project } from "../lib/projects";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
});

export const ProjectCard = ({ project }: { project: Project }) => (
    <Link
        href={`/projects/${project.slug}`}
        className="group block focus:outline-none"
    >
        <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
            <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                        <Badge key={t} variant="chrome">
                            {t}
                        </Badge>
                    ))}
                </div>
                <time
                    dateTime={project.publishedAt.toISOString()}
                    className="text-xs opacity-60"
                >
                    {dateFormatter.format(project.publishedAt)}
                </time>
            </CardContent>
        </Card>
    </Link>
);

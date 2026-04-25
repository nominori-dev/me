import { z } from "zod";

export const projectFrontmatterSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    cover: z.string().optional(),
    tech: z.array(z.string()).default([]),
    repo: z.url().optional(),
    url: z.url().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

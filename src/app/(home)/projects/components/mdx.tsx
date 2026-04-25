import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
    theme: { dark: "github-dark-default", light: "github-light-default" },
    keepBackground: false,
};

export const Mdx = ({ source }: { source: string }) => (
    <MDXRemote
        source={source}
        options={{
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
            },
        }}
    />
);

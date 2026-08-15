import type { MetadataRoute } from "next";

import { fetchBlogPosts } from "@/actions/BlogActions";

type Frequency = "yearly" | "weekly" | "monthly" | "never" | "always" | "hourly" | "daily" | undefined;

const staticRoutes: { path: string, priority: number, changeFrequency: Frequency}[] = [
    {
        path: "",
        priority: 1,
        changeFrequency: "yearly" as const,
    },
    {
        path: "/gallery",
        priority: 0.6,
        changeFrequency: "weekly" as const
    },
    {
        path: "/projects",
        priority: 0.8,
        changeFrequency: "monthly" as const,
    },
    {
        path: "/resources",
        priority: 0.7,
        changeFrequency: "yearly" as const
    }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
    const posts = await fetchBlogPosts();

    const entries: MetadataRoute.Sitemap = posts.map((post)=>({
        url: `https://www.thscompsci.com/blog/${post.id}`,
        lastModified: post.created_at,
        changeFrequency: "weekly",
        priority: 0.8
    }));

    const mainRoutes: MetadataRoute.Sitemap = staticRoutes.map(({ path, ...route})=>({
        url: `https://www.thscompsci.com${path}`,
        ...route
    }))

    return [
        ...mainRoutes,
        ...entries
    ]
}
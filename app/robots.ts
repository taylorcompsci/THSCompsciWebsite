import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots
{
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/create_project"
        },
        sitemap: "https://www.thscompsci.com/sitemap.xml"
    }
}
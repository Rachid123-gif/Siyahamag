import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/candidat/", "/employeur/"],
    },
    // Both sitemaps listed so Bing/Google/Yandex pick up the news feed too.
    sitemap: [
      "https://siyahamag.ma/sitemap.xml",
      "https://siyahamag.ma/news-sitemap.xml",
    ],
  }
}

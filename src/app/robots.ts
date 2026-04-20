import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/candidat/", "/employeur/"],
    },
    sitemap: "https://siyahamag.ma/sitemap.xml",
  }
}

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevandhara.org";

  const staticRoutes = [
    "",
    "/about",
    "/our-work",
    "/where-we-work",
    "/get-involved",
    "/csr",
    "/transparency",
    "/contact",
    "/donate",
    "/volunteer-campaigns",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/donate" || route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/donate" || route === "/csr" ? 0.9 : 0.8,
  }));
}

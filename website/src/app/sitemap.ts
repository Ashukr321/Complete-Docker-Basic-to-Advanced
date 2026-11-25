import type { MetadataRoute } from "next";
import { docUrl, getDocs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...getDocs().map((d) => ({ url: site.url + docUrl(d), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}

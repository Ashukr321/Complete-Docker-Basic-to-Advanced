import { getCategories } from "./content";

export type NavDoc = { slug: string; title: string; group?: string };
export type NavCategory = { slug: string; title: string; docs: NavDoc[] };

/** The slim, serializable tree the client shell needs (no bodies). */
export const getNav = (): NavCategory[] =>
  getCategories().map((c) => ({
    slug: c.slug,
    title: c.title,
    docs: c.docs.map((d) => ({ slug: d.slug, title: d.title, ...(d.group ? { group: d.group } : {}) })),
  }));

import fs from "node:fs";
import path from "node:path";

/**
 * Reads the repo's markdown notes at build time. Every page is prerendered,
 * so none of this runs on the server at request time.
 */

export const CONTENT_ROOT = path.resolve(
  /*turbopackIgnore: true*/ process.env.CONTENT_DIR ??
    path.join(/*turbopackIgnore: true*/ process.cwd(), ".."),
);

/** Folders never read as notes or served as assets. */
export const SKIP_DIRS = new Set(["website", "node_modules", ".git", ".claude"]);
const IMAGE_EXT = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"]);
export const ASSET_EXT = new Set([...IMAGE_EXT, ".html"]);
/** Repo images that should not appear anywhere (repo-relative, posix). */
export const IGNORED_IMAGES: string[] = [];
const ACRONYMS = new Set(["api", "cli", "cmd", "ci", "cd", "dns", "http", "https", "json", "yaml", "url", "wsl", "ssl", "tls", "xss", "csrf", "cors", "ssh", "tcp", "udp", "ip", "os", "vm"]);
const SMALL_WORDS = new Set(["a", "an", "and", "or", "of", "the", "to", "in", "on", "for", "vs"]);

export type Doc = {
  slug: string;
  title: string;
  description: string;
  body: string;
  /** Repo-relative path of the .md file, or of the folder for an image-only page. */
  source: string;
  /** Repo-relative folder links in the body resolve from. */
  dir: string;
  category: string;
  categoryTitle: string;
  group?: string;
  /** Repo images shown as figures under the body (not linked in it). */
  images: string[];
  /** Repo-relative .html visualizations embedded on this page. */
  visualizations: string[];
};

export type Category = { slug: string; title: string; docs: Doc[] };

const abs = (rel: string) => path.join(/*turbopackIgnore: true*/ CONTENT_ROOT, rel);
const stripPrefix = (name: string) => name.replace(/^\d+[_\-. ]*/, "");
const slugify = (name: string) =>
  stripPrefix(name.replace(/\.md$/i, ""))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function titleize(name: string) {
  return stripPrefix(name.replace(/\.[a-z]+$/i, ""))
    .split(/[_\-\s]+/)
    .filter(Boolean)
    .map((w, i) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : i > 0 && SMALL_WORDS.has(w.toLowerCase())
          ? w.toLowerCase()
          : w[0].toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join(" ");
}

function listDir(rel: string) {
  return fs
    .readdirSync(/*turbopackIgnore: true*/ abs(rel), { withFileTypes: true })
    .filter((e) => !e.name.startsWith(".") && !SKIP_DIRS.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true })); // 92_ before 100_
}

const isMd = (n: string) => n.toLowerCase().endsWith(".md");
const isReadme = (n: string) => n.toLowerCase() === "readme.md";
const ext = (n: string) => path.extname(n).toLowerCase();

/** Markdown that isn't prose: headings, lists, tables, code, html, rules. */
const NOT_PROSE = /^(#|\||[-*+] |\d+\. |```|<|---|___|\*\*\*|!\[)/;

function describe(body: string) {
  let inFence = false;
  const paragraphs: string[] = [];
  let cur: string[] = [];
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim().replace(/^>\s?/, "");
    if (raw.trim().startsWith("```")) inFence = !inFence;
    if (inFence || raw.trim().startsWith("```")) continue;
    if (!line || NOT_PROSE.test(line)) {
      if (cur.length) paragraphs.push(cur.join(" "));
      cur = [];
      continue;
    }
    cur.push(line);
  }
  if (cur.length) paragraphs.push(cur.join(" "));
  const text = (paragraphs.find((p) => /[a-z]{3,}/i.test(p)) ?? "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}\p{P}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= 160 ? text : text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

function cleanTitle(t: string) {
  return t
    .replace(/[*_`]/g, "")
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .trim();
}

function readDoc(rel: string, slug: string, folderTitle: string): Omit<Doc, "category" | "categoryTitle"> {
  let body = fs.readFileSync(/*turbopackIgnore: true*/ abs(rel), "utf8");
  const name = path.posix.basename(rel);
  let title = titleize(name);
  const h1 = body.match(/^#[ \t]+(.+?)[ \t]*#*[ \t]*$/m);
  if (h1 && h1[1].length <= 60) {
    title = cleanTitle(h1[1]) || title;
    body = body.replace(h1[0], "");
  }
  if (isReadme(name) || name.toLowerCase() === "concept.md") title = folderTitle;
  return { slug, title, description: describe(body), body: body.trim(), source: rel, dir: path.posix.dirname(rel), images: [], visualizations: [] };
}

type Loaded = { categories: Category[]; docs: Doc[]; bySource: Map<string, Doc>; assets: string[] };
let cache: Loaded | undefined;

export function load(): Loaded {
  if (cache) return cache;
  const categories: Category[] = [];
  const assets: string[] = [];
  const images: string[] = [];

  // Walks a folder: README first, then files, then sub-folders (as groups).
  function walk(rel: string, slugBase: string, cat: Category, group: string | undefined) {
    const entries = listDir(rel);
    const files = entries.filter((e) => e.isFile());
    for (const f of files) {
      const p = rel ? `${rel}/${f.name}` : f.name;
      if (ASSET_EXT.has(ext(f.name))) {
        assets.push(p);
        if (IMAGE_EXT.has(ext(f.name)) && !IGNORED_IMAGES.includes(p)) images.push(p);
      }
    }
    const folderTitle = titleize(path.posix.basename(rel));
    const mds = files.filter((f) => isMd(f.name)).sort((a, b) => Number(isReadme(b.name)) - Number(isReadme(a.name)));
    const htmls = files.filter((f) => ext(f.name) === ".html").map((f) => `${rel}/${f.name}`);
    for (const f of mds) {
      const slug = isReadme(f.name) ? slugBase : `${slugBase}/${slugify(f.name)}`;
      const doc = readDoc(`${rel}/${f.name}`, slug, folderTitle);
      if (isReadme(f.name)) doc.visualizations = htmls;
      cat.docs.push({ ...doc, category: cat.slug, categoryTitle: cat.title, group });
    }
    // A folder of diagrams with no notes still gets a page so they show up.
    if (!mds.length && files.some((f) => IMAGE_EXT.has(ext(f.name)))) {
      cat.docs.push({
        slug: slugBase, title: folderTitle, description: `${folderTitle} diagrams.`, body: "", source: rel, dir: rel,
        category: cat.slug, categoryTitle: cat.title, group,
        images: files.filter((f) => IMAGE_EXT.has(ext(f.name))).map((f) => `${rel}/${f.name}`).filter((p) => !IGNORED_IMAGES.includes(p)),
        visualizations: htmls,
      });
    }
    for (const d of entries.filter((e) => e.isDirectory())) {
      walk(`${rel}/${d.name}`, `${slugBase}/${slugify(d.name)}`, cat, group ?? titleize(d.name));
    }
  }

  // Categories: every top-level folder (this repo's folders have no number prefix; one is stripped if present).
  for (const e of listDir("")) {
    if (e.isFile() && ASSET_EXT.has(ext(e.name))) {
      assets.push(e.name);
      if (IMAGE_EXT.has(ext(e.name)) && !IGNORED_IMAGES.includes(e.name)) images.push(e.name);
    }
    if (!e.isDirectory()) continue;
    const cat: Category = { slug: slugify(e.name), title: titleize(e.name), docs: [] };
    walk(e.name, cat.slug, cat, undefined);
    if (cat.docs.length) categories.push(cat);
  }

  const rootReadme = listDir("").find((e) => e.isFile() && isReadme(e.name));
  if (rootReadme && categories.length) {
    const first = categories[0];
    const doc = readDoc(rootReadme.name, `${first.slug}/overview`, "Overview");
    doc.dir = "";
    first.docs.unshift({ ...doc, category: first.slug, categoryTitle: first.title });
  }

  const docs = categories.flatMap((c) => c.docs);
  const bySource = new Map(docs.map((d) => [d.source, d]));

  // Images linked from markdown render where they are linked.
  const linked = new Set<string>();
  for (const d of docs) for (const img of linkedImages(d)) linked.add(img);
  const shown = new Set([...linked, ...docs.flatMap((d) => d.images)]);

  const words = (p: string) => path.posix.basename(p).replace(/\.[^.]+$/, "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  for (const img of images) {
    // An image whose name words all appear in a doc's file name also shows there.
    const iw = words(img);
    for (const d of docs) {
      if (!isMd(d.source) || linkedImages(d).has(img) || d.images.includes(img)) continue;
      const dw = new Set(words(d.source));
      if (iw.every((w) => dw.has(w))) {
        d.images.push(img);
        shown.add(img);
      }
    }
    if (shown.has(img)) continue;
    // Unlinked: nearest doc in its folder (README preferred), else the nearest parent folder.
    for (let dir = path.posix.dirname(img); ; dir = path.posix.dirname(dir)) {
      const key = dir === "." ? "" : dir;
      const here = docs.filter((d) => d.dir === key);
      const target = here.find((d) => isReadme(path.posix.basename(d.source))) ?? here[0];
      if (target) {
        target.images.push(img);
        break;
      }
      if (key === "") break;
    }
  }

  cache = { categories, docs, bySource, assets };
  return cache;
}

const linkedCache = new WeakMap<Doc, Set<string>>();
/** Repo-relative images a doc's markdown links to (`![](…)` and `<img src>`). */
export function linkedImages(doc: Doc): Set<string> {
  let set = linkedCache.get(doc);
  if (set) return set;
  set = new Set();
  const re = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?[^)]*\)|<img[^>]*\ssrc=["']([^"']+)["']/gi;
  for (const m of doc.body.matchAll(re)) {
    const p = toRepoPath(doc.dir, m[1] ?? m[2]);
    if (p && IMAGE_EXT.has(ext(p))) set.add(p);
  }
  linkedCache.set(doc, set);
  return set;
}

/** Resolves a relative link to a repo-relative path, or null if external or outside the repo. */
function toRepoPath(dir: string, href: string): string | null {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(href)) return null;
  let clean = href.split(/[?#]/)[0];
  try {
    clean = decodeURIComponent(clean);
  } catch {}
  const joined = path.posix.normalize(path.posix.join(dir || ".", clean)).replace(/\/$/, "");
  if (joined.startsWith("..") || path.posix.isAbsolute(joined)) return null;
  return joined === "." ? "" : joined;
}

export const assetUrl = (rel: string) => "/content/" + rel.split("/").map(encodeURIComponent).join("/");
export const docUrl = (doc: Pick<Doc, "slug">) => `/docs/${doc.slug}`;

/**
 * Rewrites a link in a doc's markdown. Returns the URL to use, or null when it
 * points at a note or file that doesn't exist (render as plain text).
 */
export function resolveLink(doc: Doc, href: string): string | null {
  if (!href) return null;
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(href)) return href;
  const rel = toRepoPath(doc.dir, href);
  if (rel === null) return null;
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
  const { bySource, docs } = load();
  // A folder link goes to its README, else its first note.
  const target = bySource.get(rel) ?? bySource.get(rel ? `${rel}/README.md` : "README.md") ?? docs.find((d) => d.dir === rel && rel !== "");
  if (target) return docUrl(target) + hash;
  if (ASSET_EXT.has(ext(rel)) && load().assets.includes(rel)) return assetUrl(rel);
  return null;
}

/** Servable repo assets as path segments (website/, .git, .claude, node_modules and dot-folders are never walked). */
export const listAssets = () => load().assets.map((p) => p.split("/"));
export const readAsset = (rel: string) => fs.readFileSync(/*turbopackIgnore: true*/ abs(rel));

export const getCategories = () => load().categories;
export const getDocs = () => load().docs;
export const getDoc = (slug: string) => load().docs.find((d) => d.slug === slug);

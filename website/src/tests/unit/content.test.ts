import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { getCategories, getDoc, getDocs, linkedImages, listAssets, load } from "@/lib/content";

describe("content loader (real notes)", () => {
  const docs = getDocs();

  it("finds categories and docs", () => {
    expect(getCategories().length).toBeGreaterThan(0);
    expect(docs.length).toBeGreaterThan(0);
  });

  it("gives every doc a unique, URL-safe slug and a title", () => {
    const slugs = docs.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const d of docs) {
      expect(d.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/);
      expect(d.title.trim()).not.toBe("");
    }
  });

  it("maps a README to its folder URL and misses to undefined", () => {
    const readme = docs.find((d) => d.source === "error-logs/README.md");
    expect(readme?.slug).toBe("error-logs");
    expect(getDoc("does/not/exist")).toBeUndefined();
  });

  it("never titles a doc 'Concept'", () => {
    expect(docs.filter((d) => d.title === "Concept")).toEqual([]);
  });

  it("shows every repo image on at least one page", () => {
    const shown = new Set(docs.flatMap((d) => [...linkedImages(d), ...d.images]));
    const images = load().assets.filter((a) => !a.endsWith(".html"));
    expect(images.length).toBeGreaterThan(0);
    expect(images.filter((i) => !shown.has(i))).toEqual([]);
  });

  it("gives an image-only folder its own page (fixture)", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
    fs.mkdirSync(path.join(dir, "01_Intro", "diagrams"), { recursive: true });
    fs.writeFileSync(path.join(dir, "01_Intro", "README.md"), "# Intro\n\nHello there.");
    fs.writeFileSync(path.join(dir, "01_Intro", "diagrams", "flow.svg"), "<svg xmlns='http://www.w3.org/2000/svg'/>");
    process.env.CONTENT_DIR = dir;
    vi.resetModules();
    try {
      const fresh = await import("@/lib/content");
      const page = fresh.getDocs().find((d) => d.source === "01_Intro/diagrams");
      expect(page?.slug).toBe("intro/diagrams");
      expect(page?.images).toEqual(["01_Intro/diagrams/flow.svg"]);
    } finally {
      delete process.env.CONTENT_DIR;
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("puts each diagram on its own explained page", () => {
    const daemon = docs.find((d) => d.source === "resources/02_docker_daemon.md");
    expect(daemon && linkedImages(daemon).has("resources/docker_daemon.svg")).toBe(true);
  });

  it("never serves files from website/, .git or .claude", () => {
    const bad = listAssets().filter((p) => /^(website|\.git|\.claude|node_modules)(\/|$)/.test(p.join("/")));
    expect(bad).toEqual([]);
    expect(listAssets().some((p) => p.includes(".."))).toBe(false);
  });
});

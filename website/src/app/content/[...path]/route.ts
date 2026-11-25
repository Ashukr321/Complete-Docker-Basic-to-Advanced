import { listAssets, readAsset } from "@/lib/content";

// Only the files listed here exist; any other path is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => listAssets().map((path) => ({ path }));

const TYPES: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  html: "text/html; charset=utf-8",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const rel = (await params).path.map(decodeURIComponent).join("/");
  if (!listAssets().some((p) => p.join("/") === rel)) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(readAsset(rel)), {
    headers: {
      "Content-Type": TYPES[rel.split(".").pop()!.toLowerCase()],
      "Cache-Control": "public, max-age=3600",
    },
  });
}

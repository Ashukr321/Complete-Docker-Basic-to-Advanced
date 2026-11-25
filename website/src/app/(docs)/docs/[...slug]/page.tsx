import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Maximize2 } from "lucide-react";
import Markdown from "@/components/markdown";
import { assetUrl, docUrl, getDoc, getDocs, linkedImages, titleize } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => getDocs().map((d) => ({ slug: d.slug.split("/") }));

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDoc((await params).slug.join("/"));
  if (!doc) return {};
  const title = `${doc.title} — ${doc.categoryTitle}`;
  const description = doc.description || site.description;
  return {
    title,
    description,
    alternates: { canonical: docUrl(doc) },
    openGraph: { type: "article", title, description, url: docUrl(doc), siteName: site.name },
    twitter: { card: "summary", title, description },
  };
}

export default async function DocPage({ params }: Props) {
  const doc = getDoc((await params).slug.join("/"));
  if (!doc) notFound();
  const docs = getDocs();
  const i = docs.indexOf(doc);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  const linked = linkedImages(doc);
  const figures = doc.images.filter((img) => !linked.has(img));
  const empty = !doc.body && !figures.length && !doc.visualizations.length;

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
        <Link href="/" className="hover:text-accent">
          {site.name}
        </Link>
        {[doc.categoryTitle, doc.group].filter(Boolean).map((c) => (
          <span key={c} className="flex items-center gap-1">
            <ChevronRight className="size-3.5" /> {c}
          </span>
        ))}
        <ChevronRight className="size-3.5" />
        <span className="text-neutral-900 dark:text-neutral-100">{doc.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        {empty && <p className="italic text-neutral-500">This topic is still being written.</p>}
        {doc.body && <Markdown doc={doc} />}

        {figures.map((img) => (
          <figure key={img}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl(img)} alt={titleize(img.split("/").pop()!)} loading="lazy" className="w-full" />
            <figcaption className="text-center">{titleize(img.split("/").pop()!)}</figcaption>
          </figure>
        ))}

        {doc.visualizations.map((v) => (
          <figure key={v} className="not-prose my-8">
            <iframe
              src={assetUrl(v)}
              title={titleize(v.split("/").pop()!)}
              sandbox="allow-scripts"
              loading="lazy"
              className="h-[600px] w-full rounded-lg border border-neutral-200 bg-white dark:border-neutral-800"
            />
            <figcaption className="mt-2 flex items-center justify-between text-sm text-neutral-500">
              {titleize(v.split("/").pop()!)}
              <a href={assetUrl(v)} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-accent hover:underline">
                Open full screen <Maximize2 className="size-3.5" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>

      <nav className="mt-12 grid gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800 sm:grid-cols-2">
        {prev ? (
          <Link href={docUrl(prev)} className="group rounded-lg border border-neutral-200 p-4 hover:border-accent dark:border-neutral-800">
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-1 block font-medium group-hover:text-accent">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={docUrl(next)} className="group rounded-lg border border-neutral-200 p-4 text-right hover:border-accent dark:border-neutral-800">
            <span className="flex items-center justify-end gap-1 text-xs text-neutral-500">
              Next <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 block font-medium group-hover:text-accent">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

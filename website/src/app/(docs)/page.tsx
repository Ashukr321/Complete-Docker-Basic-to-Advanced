import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { docUrl, getCategories, getDocs } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const categories = getCategories();
  const first = getDocs()[0];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="inline-flex rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
        {getDocs().length} topics · {categories.length} categories
      </p>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{site.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">{site.description}</p>
      {first && (
        <Link
          href={docUrl(first)}
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Start reading <ArrowRight className="size-4" />
        </Link>
      )}

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <section key={cat.slug} className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <h2 className="font-semibold">
              <Link href={docUrl(cat.docs[0])} className="hover:text-accent">
                {cat.title}
              </Link>
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {cat.docs.map((d) => (
                <li key={d.slug}>
                  <Link href={docUrl(d)} className="text-neutral-600 hover:text-accent dark:text-neutral-400">
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

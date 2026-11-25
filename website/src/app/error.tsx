"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Error</p>
      <h1 className="mt-3 text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">Try again, or head back to the home page.</p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Try again
        </button>
        <Link href="/" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-accent dark:border-neutral-700">
          Go home
        </Link>
      </div>
    </main>
  );
}

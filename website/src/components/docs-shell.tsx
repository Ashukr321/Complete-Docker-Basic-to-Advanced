"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Command } from "cmdk";
import { ChevronRight, Container, Moon, PanelLeft, Search, Sun, X } from "lucide-react";
import type { NavCategory } from "@/lib/nav";

const noop = () => () => {};
const getMod = () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl");
const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

export default function DocsShell({ nav, siteName, children }: { nav: NavCategory[]; siteName: string; children: React.ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mod = useSyncExternalStore(noop, getMod, () => "Ctrl");

  const toggleSidebar = useCallback(() => {
    if (isDesktop()) setDesktopOpen((o) => !o);
    else setMobileOpen((o) => !o);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.code === "KeyK") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (ctrl && !e.shiftKey && e.code === "KeyB") {
        e.preventDefault();
        toggleSidebar();
      } else if (!ctrl && !e.altKey && e.code === "Slash" && !typing) {
        e.preventDefault();
        if (e.shiftKey) toggleSidebar();
        else setSearchOpen(true);
      } else if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-neutral-200 bg-white/85 px-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85 sm:px-4">
        <Link href="/" className="mr-1 flex shrink-0 items-center gap-2 font-semibold lg:min-w-56">
          <Container className="size-5 text-accent" aria-hidden />
          <span className="hidden truncate sm:inline">{siteName}</span>
        </Link>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title={`Toggle sidebar (${mod} B)`}
          className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        >
          <PanelLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-500 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 sm:max-w-xs"
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search topics...</span>
          <kbd className="ml-auto hidden rounded border border-neutral-300 px-1.5 font-sans text-[11px] dark:border-neutral-700 sm:inline">
            {mod} K
          </kbd>
        </button>
        <ThemeToggle />
      </header>

      <div className="flex">
        {/* Desktop: width animates; the fixed-width inner wrapper stops the links reflowing. */}
        <aside
          aria-label="Topics"
          className={`sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-hidden border-neutral-200 transition-[width,visibility] duration-300 ease-in-out dark:border-neutral-800 lg:block ${
            desktopOpen ? "w-64 border-r" : "invisible w-0"
          }`}
        >
          <div className="h-full w-64 overflow-y-auto">
            <Sidebar nav={nav} />
          </div>
        </aside>

        {/* Mobile: off-canvas drawer. */}
        <div className="lg:hidden">
          <div
            onClick={closeMobile}
            className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden
          />
          <aside
            aria-label="Topics"
            inert={!mobileOpen}
            className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-neutral-200 bg-white transition-transform duration-300 ease-in-out dark:border-neutral-800 dark:bg-neutral-950 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
              <span className="flex items-center gap-2 font-semibold">
                <Container className="size-5 text-accent" aria-hidden />
                {siteName}
              </span>
              <button type="button" onClick={closeMobile} aria-label="Close sidebar" className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar nav={nav} onNavigate={closeMobile} />
            </div>
          </aside>
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <SearchDialog nav={nav} open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function Sidebar({ nav, onNavigate }: { nav: NavCategory[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <nav className="py-2 text-sm">
      {nav.map((cat) => {
        const isActive = cat.docs.some((d) => pathname === `/docs/${d.slug}`);
        const open = toggled[cat.slug] ?? isActive;
        return (
          <div key={cat.slug} className="border-b border-neutral-200 dark:border-neutral-800/70">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setToggled((t) => ({ ...t, [cat.slug]: !open }))}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {cat.title}
              <ChevronRight className={`size-4 text-neutral-500 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <ul className="overflow-hidden" inert={!open}>
                {cat.docs.map((d, i) => {
                  const heading = d.group && d.group !== cat.docs[i - 1]?.group ? d.group : undefined;
                  const active = pathname === `/docs/${d.slug}`;
                  return (
                    <li key={d.slug}>
                      {heading && <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{heading}</p>}
                      <Link
                        href={`/docs/${d.slug}`}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`block border-l-2 py-1.5 pl-6 pr-4 ${
                          active
                            ? "border-accent bg-accent/10 font-medium text-accent"
                            : "border-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                        }`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  );
                })}
                <li className="h-2" aria-hidden />
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// Every typed word must appear (cmdk's default fuzzy match is too loose).
const filter = (value: string, search: string, keywords?: string[]) => {
  const hay = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  return search.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w)) ? 1 : 0;
};

function SearchDialog({ nav, open, onOpenChange }: { nav: NavCategory[]; open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search topics"
      filter={filter}
      overlayClassName="fixed inset-0 z-50 bg-black/60"
      contentClassName="fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-2 border-b border-neutral-200 px-3 dark:border-neutral-800">
        <Search className="size-4 text-neutral-500" />
        <Command.Input placeholder="Search topics..." className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-500" />
        <kbd className="rounded border border-neutral-300 px-1.5 text-[11px] text-neutral-500 dark:border-neutral-700">Esc</kbd>
      </div>
      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-neutral-500">No topics found.</Command.Empty>
        {nav.map((cat) => (
          <Command.Group
            key={cat.slug}
            heading={cat.title}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500"
          >
            {cat.docs.map((d) => (
              <Command.Item
                key={d.slug}
                value={d.slug}
                keywords={[d.title, d.group ?? "", cat.title]}
                onSelect={() => {
                  onOpenChange(false);
                  router.push(`/docs/${d.slug}`);
                }}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
              >
                <span className="truncate">{d.title}</span>
                {d.group && <span className="shrink-0 text-xs text-neutral-500">{d.group}</span>}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="ml-auto rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}

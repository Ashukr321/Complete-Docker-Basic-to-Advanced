import DocsShell from "@/components/docs-shell";
import { getNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsShell nav={getNav()} siteName={site.name}>
      {children}
    </DocsShell>
  );
}

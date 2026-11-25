import Link from "next/link";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { resolveLink, type Doc } from "@/lib/content";

type HastNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HastNode[] };

const text = (n: HastNode): string => n.value ?? (n.children ?? []).map(text).join("");

/** GitHub-style heading ids, so in-page links like `#-overview` from the README work. */
function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const seen = new Map<string, number>();
    const visit = (n: HastNode) => {
      if (n.tagName && /^h[1-6]$/.test(n.tagName) && !n.properties?.id) {
        const base = text(n).toLowerCase().trim().replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "").replace(/ /g, "-");
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        n.properties = { ...n.properties, id: count ? `${base}-${count}` : base };
      }
      n.children?.forEach(visit);
    };
    visit(tree);
  };
}

export default function Markdown({ doc }: { doc: Doc }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHeadingIds]}
      urlTransform={defaultUrlTransform}
      components={{
        a({ href, children, node: _node, ...rest }) {
          void _node;
          const url = resolveLink(doc, href ?? "");
          if (!url) return <span>{children}</span>;
          if (/^https?:|^\/\//.test(url))
            return (
              <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
              </a>
            );
          if (url.startsWith("/docs/")) return <Link href={url}>{children}</Link>;
          return (
            <a href={url} {...rest}>
              {children}
            </a>
          );
        },
        img({ src, alt, node: _node, ...rest }) {
          void _node;
          const url = typeof src === "string" ? (resolveLink(doc, src) ?? src) : undefined;
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={url} alt={alt ?? ""} loading="lazy" {...rest} />;
        },
        table({ node: _node, ...props }) {
          void _node;
          return (
            <div className="my-6 overflow-x-auto">
              <table {...props} />
            </div>
          );
        },
      }}
    >
      {doc.body}
    </ReactMarkdown>
  );
}

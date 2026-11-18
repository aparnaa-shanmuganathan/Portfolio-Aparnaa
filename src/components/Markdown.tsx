import ReactMarkdown, { type UrlTransform } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { github } from "@/content/github.config";

/**
 * Renders a GitHub README safely: raw HTML is parsed, then sanitized (scripts, handlers, javascript: URLs are
 * removed), then code is highlighted. Relative links/images are rewritten to GitHub URLs.
 */
export function Markdown({ source, repo, branch }: { source: string; repo: string; branch: string }) {
  const urlTransform: UrlTransform = (url, key) => {
    if (url.startsWith("#") || /^(https?:|mailto:)/i.test(url)) return url;
    if (url.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(url)) return ""; // javascript:, data:, etc.
    const path = url.replace(/^\.?\//, "");
    return key === "src"
      ? `https://raw.githubusercontent.com/${github.username}/${repo}/${branch}/${path}`
      : `https://github.com/${github.username}/${repo}/blob/${branch}/${path}`;
  };

  return (
    <div className="readme">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, [rehypeHighlight, { detect: false }]]}
        urlTransform={urlTransform}
        components={{
          a: ({ node: _n, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ node: _n, alt, ...props }) => <img alt={alt ?? ""} loading="lazy" decoding="async" {...props} />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

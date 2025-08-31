// app/robots.js (Next.js App Router)
export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://treeline.dental";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
    host: base.replace(/\/$/, ""),
  };
}

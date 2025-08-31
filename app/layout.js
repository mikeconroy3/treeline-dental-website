import "../styles/globals.css";

export const metadata = {
  title: "Treeline Dental — Breckenridge",
  description: "Experience Exceptional Care with an Extraordinary View",
  metadataBase: new URL("https://treeline.dental"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://treeline.dental/",
    title: "Treeline Dental — Breckenridge",
    description: "Modern, tech-forward dentistry in Breckenridge. Same‑day crowns, family care, and cosmetics.",
    siteName: "Treeline Dental",
    images: [
      { url: "/hero.jpg", width: 1600, height: 900, alt: "Treeline Dental — Breckenridge view" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@treelinedental",
    title: "Treeline Dental — Breckenridge",
    description: "Experience Exceptional Care with an Extraordinary View",
    images: ["/hero.jpg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://treeline.dental/" />
    </head>
      <body className="min-h-screen bg-white text-slate-800 font-sans">{children}</body>
    </html>
  );
}

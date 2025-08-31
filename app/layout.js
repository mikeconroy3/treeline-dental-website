import "../styles/globals.css";

export const metadata = {
  title: "Treeline Dental — Breckenridge",
  description: "Experience Exceptional Care with an Extraordinary View",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white text-slate-800 font-sans">{children}</body>
    </html>
  );
}

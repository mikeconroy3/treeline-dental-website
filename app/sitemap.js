export default function sitemap() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://treeline.dental").replace(/\/$/, "");
  const now = new Date().toISOString();
  const urls = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services/preventative-diagnostic`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/gum-disease`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/family-dentist`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/same-day-services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/in-house-cerec-crowns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/dental-implants`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/sleep-related-conditions`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/facial-esthetics`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }
  ];
  return urls;
}

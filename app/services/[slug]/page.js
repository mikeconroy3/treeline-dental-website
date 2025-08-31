import { notFound } from "next/navigation";

const DATA = [
  {
    "slug": "preventative-diagnostic",
    "title": "Preventative & Diagnostic",
    "summary": "Cleanings and exams to keep your smile healthy.",
    "body": "Removes tartar and plaque above the gum line. These cleanings are the best way to keep your smile healthy. Regular checkups allow early detection and conservative treatment."
  },
  {
    "slug": "gum-disease",
    "title": "Gum Disease",
    "summary": "Periodontal care to protect your health.",
    "body": "Periodontal disease, also known as gum disease, can have significant effects on your body. It\u2019s a transmissible chronic bacterial infection and the leading cause of tooth loss in the US."
  },
  {
    "slug": "family-dentist",
    "title": "Family Dentist",
    "summary": "Comfortable care for kids and adults.",
    "body": "We see kiddos! We know dental anxiety affects patients of all ages. We help ease your children into the process while creating a safe and relaxing environment."
  },
  {
    "slug": "same-day-services",
    "title": "Same-Day Services",
    "summary": "Efficient visits with modern tech.",
    "body": "We live in busy times and most people don\u2019t have the extra time to make multiple visits. We work hard to be efficient so you can spend your time doing other things, like enjoying your life."
  },
  {
    "slug": "in-house-cerec-crowns",
    "title": "In-House CEREC Crowns",
    "summary": "Crowns designed and made in one visit.",
    "body": "In most cases, we fabricate crowns in-office in less than an hour. This technology eliminates the waste associated with traditional fabrication of dental restorations."
  },
  {
    "slug": "dental-implants",
    "title": "Dental Implants",
    "summary": "Gold standard for replacing teeth.",
    "body": "Dental implants are the gold standard for replacing lost dentition and the most predictively successful therapy in dentistry."
  },
  {
    "slug": "sleep-related-conditions",
    "title": "Sleep-Related Conditions",
    "summary": "Screening and dental therapies for better sleep.",
    "body": "Obstructive Sleep Apnea can be responsible for many conditions, like chronic fatigue syndrome, anxiety, depression, high blood pressure, heart disease, and many others. It has also been linked to ADD and ADHD."
  },
  {
    "slug": "facial-esthetics",
    "title": "Facial Esthetics",
    "summary": "Rejuvenation options tailored to your goals.",
    "body": "We offer several facial rejuvenation therapies, including fillers, PDO threads, lip enhancement, cheek enhancement, neck tightening, and wrinkle reduction."
  }
];

export async function generateStaticParams() {
  return DATA.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = DATA.find(i => i.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.title} — Treeline Dental`,
    description: s.summary
  };
}

export default function ServiceDetail({ params }) {
  const s = DATA.find(i => i.slug === params.slug);
  if (!s) return notFound();
  return (
    <main className="container py-16">
      <a href="/services" className="text-sm text-brand-700 hover:text-brand-800">← All services</a>
      <h1 className="mt-2 text-3xl font-semibold">{s.title}</h1>
      <p className="mt-3 max-w-3xl text-slate-700">{s.body}</p>
      <div className="mt-8">
        <a href="#contact" className="btn-primary">Request appointment</a>
      </div>
    </main>
  );
}

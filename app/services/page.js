export const metadata = {
  title: "Services — Treeline Dental",
  description: "Explore preventive, restorative, cosmetic, same-day services and more at Treeline Dental in Breckenridge."
};

export default function ServicesPage() {
  const items = [
    {"slug": "preventative-diagnostic", "title": "Preventative & Diagnostic", "summary": "Cleanings and exams to keep your smile healthy."},
    {"slug": "gum-disease", "title": "Gum Disease", "summary": "Periodontal care to protect your health."},
    {"slug": "family-dentist", "title": "Family Dentist", "summary": "Comfortable care for kids and adults."},
    {"slug": "same-day-services", "title": "Same-Day Services", "summary": "Efficient visits with modern tech."},
    {"slug": "in-house-cerec-crowns", "title": "In-House CEREC Crowns", "summary": "Crowns designed and made in one visit."},
    {"slug": "dental-implants", "title": "Dental Implants", "summary": "Gold standard for replacing teeth."},
    {"slug": "sleep-related-conditions", "title": "Sleep-Related Conditions", "summary": "Screening and dental therapies for better sleep."},
    {"slug": "facial-esthetics", "title": "Facial Esthetics", "summary": "Rejuvenation options tailored to your goals."}
  ];
  return (
    <main className="container py-16">
      <h1 className="text-3xl font-semibold">Our Services</h1>
      <p className="mt-2 text-slate-600 max-w-2xl">Comprehensive care for every smile — preventive, restorative, cosmetic, and beyond.</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <a key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-card transition-shadow overflow-hidden">    <div className="aspect-[16/10] bg-slate-100 overflow-hidden">      <img src={`/services/${"{s.slug}"}.jpg`} alt={s.title} className="h-full w-full object-cover" />    </div>    <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-slate-600 text-sm">{s.summary}</p>
            <span className="mt-3 inline-flex text-sm font-medium text-brand-700">Learn more →</span>
    </div>
          </a>
        ))}
      </div>
    </main>
  )
}

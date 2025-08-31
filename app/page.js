'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

/* ---------- Reviews helpers ---------- */
function Stars({ value = 0 }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < full ? "★" : "☆"}</span>)}
    </div>
  );
}

function useServerReviews() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const resp = await fetch("/api/reviews", { cache: "no-store" });
        const json = await resp.json();
        if (!resp.ok) throw new Error(json?.error || "Non-OK response");
        if (!ignore) setData(json || null);
      } catch (e) {
        if (!ignore) setError(e);
        console.error("[reviews] client fetch error:", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, []);

  return { data, loading, error };
}

export default function Page() {
  const { data, loading, error } = useServerReviews();
  const rating = data?.rating;
  const count  = data?.user_ratings_total;
  const reviews = useMemo(() => (data?.reviews || []).slice(0, 5), [data]);

  return (
    <main>
      {/* Hero with centered logo */}
      <section className="relative isolate overflow-hidden min-h-[80vh]">
        <Image
          src="/hero.jpg"
          alt="Breckenridge mountain view"
          width={1600}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-slate-900/40"/>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-full bg-white/80 p-4 shadow-xl backdrop-blur-sm">
            <Image src="/treeline-logo.png" alt="Treeline Dental logo" width={96} height={96} className="h-24 w-24"/>
          </div>
        </div>
        <div className="relative z-20 container py-24 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">Experience Exceptional Care with an Extraordinary View</h1>
            <p className="mt-4 text-lg text-slate-100">Same‑day crowns, family care, and esthetics powered by modern technology and mountain‑town warmth.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-contrast">Request Appointment</a>
              <a href="#services" className="btn-secondary">Explore Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Row */}
      <section className="border-t border-b border-slate-200">
        <div className="container py-6 flex flex-wrap items-center justify-center gap-6 text-slate-700 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★★★★★</span>
            <span>{rating ? `${Number(rating).toFixed(1)} on Google (${count?.toLocaleString()} reviews)` : "Google reviews"}</span>
          </div>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"/>
          <div>Same‑day crowns with CEREC</div>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"/>
          <div>Emergency appointments available</div>
        </div>
      </section>

      {/* New Patient Offers */}
      <section id="new-patients" className="container py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold">New Patient Offers</h2>
          <p className="mt-2 text-slate-600">Transparent, affordable bundles to make your first visit easy.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[{title:"Comprehensive Exam & Cleaning", priceLabel:"$300", includes:["Doctor exam","Routine cleaning","Digital X‑rays"], note:"*In absence of periodontal disease"}].map((o)=> (
            <div key={o.title} className="card p-6">
              <p className="text-lg font-semibold">{o.title}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-brand-700">{o.priceLabel}</span>
                <span className="text-xs text-slate-500">special</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {o.includes.map((i)=> <li key={i}>• {i}</li>)}
              </ul>
              <p className="mt-3 text-xs text-slate-500">{o.note}</p>
              <a href="#contact" className="mt-6 btn-primary">Claim Offer</a>
            </div>
          ))}
        </div>
      </section>

      {/* Services (OG-style cards) */}
      <section id="services" className="container py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold">Comprehensive, modern dentistry</h2>
          <p className="mt-2 text-slate-600">General, restorative, cosmetic, emergency, pediatric, and periodontal care—delivered with precision and comfort.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {title:"Emergency Dentistry",desc:"If you’re in pain, we prioritize same‑day care.",img:"/services/emergency.jpg"},
            {title:"Cosmetic Dentistry",desc:"Veneers, whitening, bonding for confident smiles.",img:"/services/cosmetic.jpg"},
            {title:"Preventive Dentistry",desc:"Cleanings, exams, and education for all ages.",img:"/services/preventive.jpg"},
            {title:"Restorative Dentistry",desc:"Fillings, CEREC crowns, implants, and more.",img:"/services/restorative.jpg"},
            {title:"Sedation Options",desc:"Relaxed visits with safe, tailored sedation.",img:"/services/sedation.jpg"},
            {title:"Pediatric Dentistry",desc:"Gentle, fun visits for kids and teens.",img:"/services/pediatric.jpg"},
          ].map((s) => (
            <div key={s.title} className="card card-hover overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={s.img} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                <a href="#contact" className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800">Learn more →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Doctors */}
      <section id="doctor" className="bg-slate-50">
        <div className="container py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">Meet Our Doctors</h2>
            <p className="mt-2 text-slate-600">Friendly, tech-forward care tailored to mountain life.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {name:"Dr. Symon Stanley", img:"/doctor1.jpg", bullets:["Same-day CEREC crowns","Implant dentistry","Family & pediatric care"]},
              {name:"Dr. Samantha Conroy", img:"/doctor2.jpg", bullets:["Cosmetic & esthetics","Clear aligners","Comfort-focused sedation"]},
            ].map((d)=> (
              <div key={d.name} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow">
                <div className="grid md:grid-cols-2 gap-0 items-stretch">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover"/>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{d.name}</h3>
                    <ul className="mt-4 space-y-2 text-slate-700 text-sm">
                      {d.bullets.map((b)=> <li key={b}>• {b}</li>)}
                    </ul>
                    <a href="#contact" className="mt-6 btn-primary">
                      Schedule with {d.name.split(' ')[1]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section (server-powered) */}
      <section id="reviews" className="container py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">What patients are saying</h2>
            <p className="mt-2 text-slate-600">Pulled live from Google — Latest Reviews.</p>
            <p className="mt-1 text-xs text-slate-500">
              Troubleshoot: <a className="underline" href="/api/reviews?debug=1" target="_blank">/api/reviews?debug=1</a>
            </p>
          </div>
          <div className="text-base text-slate-700 flex items-center gap-2">
            <div className="hidden sm:block"><Stars value={rating || 0} /></div>
            {rating ? <span className="font-semibold">{(+rating).toFixed(1)}</span> : <span className="text-slate-500">Google reviews</span>}
            {count ? <span className="text-slate-500">({count.toLocaleString()} reviews)</span> : null}
          </div>
        </div>

        <div className="mt-8">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Couldn’t load Google reviews. Check env vars, billing, and restrictions. See <code>/api/reviews?debug=1</code> and Vercel function logs.
            </div>
          ) : loading ? (
            <div className="rounded-xl border border-slate-200 p-6 text-sm text-slate-600">Loading reviews…</div>
          ) : !reviews || reviews.length === 0 ? (
            <p className="text-slate-600">No reviews returned by Google. Verify Place ID or API access.</p>
          ) : (
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-brand-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden"/>
                  <div>
                    <p className="font-semibold text-slate-900">{reviews[0]?.author_name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Stars value={reviews[0]?.rating || 0} />
                      {reviews[0]?.time ? <span>{new Date(reviews[0].time * 1000).toLocaleDateString()}</span> : null}
                    </div>
                  </div>
                </div>
                {reviews[0]?.author_url ? (
                  <a href={reviews[0].author_url} target="_blank" className="text-sm text-brand-700 hover:text-brand-800">View on Google →</a>
                ) : null}
              </div>
              <blockquote className="mt-4 text-slate-700">“{reviews[0]?.text}”</blockquote>
            </div>
          )}
        </div>
      </section>

      {/* Contact (simple form markup) */}
      <section id="contact" className="bg-slate-50">
        <div className="container py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">Request an appointment</h2>
            <p className="mt-2 text-slate-600">Fill out the form and our team will reach out to confirm a time that works for you.</p>
          </div>
          <form className="mt-8 grid gap-4 sm:grid-cols-2 bg-white p-6 rounded-2xl border border-slate-200 shadow">
            <div>
              <label className="block text-sm font-medium">Full name</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-700" placeholder="Jane Doe"/>
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-700" placeholder="jane@email.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-700" placeholder="(970) 555‑1234"/>
            </div>
            <div>
              <label className="block text-sm font-medium">Service of interest</label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-700">
                <option>Cleaning & exam</option>
                <option>Same‑day crown (CEREC)</option>
                <option>Implant consultation</option>
                <option>Cosmetic dentistry</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Notes</label>
              <textarea rows={4} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-700" placeholder="Tell us a bit about your needs"/>
            </div>
            <div className="sm:col-span-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">By submitting, you agree to be contacted by our team.</p>
              <button type="button" className="btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200">
        <div className="container py-10 grid sm:grid-cols-3 gap-8">
          <div>
            <p className="text-lg font-semibold">Treeline Dental</p>
            <p className="text-sm text-slate-400 mt-2">Modern dentistry in Breckenridge, Colorado.</p>
          </div>
          <div>
            <p className="font-semibold">Visit</p>
            <p className="text-sm text-slate-400 mt-2">235 S Ridge St #2B<br/>Breckenridge, CO 80424</p>
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <p className="text-sm text-slate-400 mt-2">(970) XXX‑XXXX<br/>hello@treeline.dental</p>
            <a href="#contact" className="mt-3 btn-primary">Schedule Online</a>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Treeline Dental. All rights reserved.</div>
      </footer>
    </main>
  );
}

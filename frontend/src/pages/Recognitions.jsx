import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { recognitions } from "@/data/content";
import { Award, ZoomIn, X } from "lucide-react";
import cert from "@/assets/certificate-1.jpg";

const certificates = [
  { src: cert, title: "Certificate of Accreditation" },
  { src: cert, title: "ISO 9001:2015 Certificate" },
  { src: cert, title: "International Quality Council" },
  { src: cert, title: "Global Universities Network" },
];

const Recognitions = () => {
  const [open, setOpen] = useState(null);
  return (
    <Layout>
      <PageHero title="Recognitions & Accreditations" subtitle="Trusted by international bodies, accredited for global standards." />

      <section className="py-16">
        <div className="container">
          <SectionHeading eyebrow="Trusted by" title="Accreditations & Partners" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recognitions.map((r) => (
              <div key={r.name} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{r.name}</h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Documents" title="Certificate Gallery" description="Click to view our official certificates." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c, i) => (
              <button
                key={i}
                onClick={() => setOpen(c.src)}
                className="group relative rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elegant transition-smooth"
              >
                <img src={c.src} alt={c.title} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover group-hover:scale-105 transition-smooth" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-smooth flex items-center justify-center">
                  <ZoomIn className="h-10 w-10 text-primary-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
                <div className="p-3 text-sm font-medium text-primary text-left">{c.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close certificate preview"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(null)}
          />
          <div className="relative z-10 w-[90vw] max-w-3xl rounded-2xl bg-background p-3 shadow-elegant">
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background/80 hover:bg-secondary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open} alt="Certificate enlarged" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Recognitions;

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Check } from "lucide-react";

const reqs = {
  Diploma: ["High school certificate or equivalent", "Copy of national ID / passport", "2 passport-size photos", "Completed application form"],
  Bachelor: ["High school certificate with minimum required grade", "Official transcript", "Copy of national ID / passport", "Proof of English proficiency (where applicable)", "2 passport-size photos"],
  Master: ["Recognized bachelor's degree", "Official transcripts", "Statement of purpose", "Two letters of recommendation", "CV / Resume", "Proof of English proficiency"],
  PhD: ["Recognized master's degree in a related field", "Research proposal (3-5 pages)", "Two academic recommendation letters", "CV with publications (if any)", "Interview with research committee"],
};

const Requirements = () => {
  const levels = Object.keys(reqs);
  const [active, setActive] = useState("Diploma");
  const items = reqs[active] || [];

  return (
    <Layout>
      <PageHero title="Admission Requirements" subtitle="Find the documents and qualifications required for your program level." />
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {levels.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setActive(k)}
                className={`rounded-md border px-3 py-2 text-sm font-semibold transition-smooth ${active === k ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground/80 hover:bg-secondary"}`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border bg-card p-7 shadow-soft">
            <h3 className="text-xl font-bold text-primary mb-5">Requirements for {active}</h3>
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-accent-soft flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-foreground/80">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Requirements;

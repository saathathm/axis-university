import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { recognitions } from "@/data/content";
import { Award, ZoomIn, X } from "lucide-react";
import cert from "@/assets/certificate-1.jpg";

const Recognitions = () => {
  return (
    <Layout>
      <PageHero
        title="Recognitions & Accreditations"
        subtitle="Trusted by international bodies, accredited for global standards."
      />

      <section className="py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Trusted by"
            title="Accreditations & Partners"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recognitions.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-smooth"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {r.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Recognitions;

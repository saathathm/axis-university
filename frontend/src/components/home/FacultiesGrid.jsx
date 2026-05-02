import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { faculties } from "@/data/content";

const FacultiesGrid = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <SectionHeading
        eyebrow="What we offer"
        title="Our Popular Faculties"
        description="Explore a diverse range of academic disciplines led by experienced faculty and modern curricula."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faculties.map((f) => (
          <Link
            key={f.id}
            to="/academics"
            className="group rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
          >
            <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-gradient-accent transition-smooth">
              <f.icon className={`h-6 w-6 ${f.color} group-hover:text-accent-foreground transition-smooth`} />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{f.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{f.description}</p>
            <span className="inline-flex items-center text-sm font-medium text-accent">
              View Programs <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FacultiesGrid;

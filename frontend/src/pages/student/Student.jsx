import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Link } from "react-router-dom";
import { FileText, ListChecks, Send, GraduationCap, ArrowRight } from "lucide-react";

const items = [
  { to: "/student/policies", title: "Admission Policies", desc: "Read our complete admission policies.", icon: FileText },
  { to: "/student/requirements", title: "Admission Requirements", desc: "Documents needed for each program level.", icon: ListChecks },
  { to: "/student/apply", title: "Apply Now", desc: "Start your online application today.", icon: Send },
  { to: "/student/grading", title: "Grading System", desc: "Understand our grading scale and GPA.", icon: GraduationCap },
];

const Student = () => (
  <Layout>
    <PageHero title="Student Information" subtitle="Everything you need to start and succeed at Axis University." />
    <section className="py-16">
      <div className="container grid gap-6 sm:grid-cols-2">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="group rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
            <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-gradient-accent transition-smooth">
              <it.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-smooth" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">{it.title}</h3>
            <p className="text-muted-foreground mb-4">{it.desc}</p>
            <span className="inline-flex items-center text-sm font-medium text-accent">
              Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  </Layout>
);

export default Student;

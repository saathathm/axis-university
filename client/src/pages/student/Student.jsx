import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  ListChecks,
  Send,
} from "lucide-react";

import PageHero from "../../components/widgets/PageHero";

const studentLinks = [
  {
    to: "/student/policies",
    title: "Admission Policies",
    description: "Read our complete admission policies.",
    icon: FileText,
  },
  {
    to: "/student/apply",
    title: "Apply Now",
    description: "Start your online application today.",
    icon: Send,
  }
];

const Student = () => {
  return (
    <>
      <PageHero
        title="Student Information"
        subtitle="Everything you need to start and succeed at Axis University."
      />

      <section className="py-16">
        <div className="container grid gap-6 sm:grid-cols-2">
          {studentLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-2xl border bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft transition-smooth group-hover:bg-gradient-accent">
                  <Icon className="h-6 w-6 text-accent transition-smooth group-hover:text-accent-foreground" />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-primary">
                  {item.title}
                </h3>

                <p className="mb-4 text-muted-foreground">{item.description}</p>

                <span className="inline-flex items-center text-sm font-medium text-accent">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Student;

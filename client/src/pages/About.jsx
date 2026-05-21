import Layout from "@/components/layout/Layout";
import PageHero from "@/components/widgets/PageHero";
import { Eye, Target } from "lucide-react";

import grad from "@/assets/about-graduation.jpg";

const aboutContent = [
  "Welcome to Axis University, a forward-thinking private institution committed to delivering high-quality education on a global scale. Established with a vision to empower students through knowledge and innovation, Axis University has grown into a respected academic institution offering diverse programs across multiple disciplines.",
  "We are dedicated to maintaining excellence in education through modern teaching methodologies, global partnerships, and internationally recognized standards. Our commitment to quality is reflected in our adherence to structured academic systems and internationally accepted certifications.",
  "At Axis University, students are given the opportunity to explore a wide range of academic pathways that lead to rewarding careers. With access to global learning platforms and partner institutions worldwide, we ensure that education is accessible, flexible, and future-focused.",
  "Our campus and learning resources are designed to support academic success, including modern libraries, strong alumni networks, and globally recognized certification programs.",
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "At Axis University, our mission is to provide accessible, high-quality education that equips students with the knowledge, skills, and competencies required to succeed in a rapidly evolving global environment.",
    borderClassName: "border-accent",
    iconClassName: "text-accent",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Our vision is to become a globally recognized university known for academic excellence, innovation, and transformative education.",
    borderClassName: "border-primary",
    iconClassName: "text-primary",
  },
];

const About = () => {
  return (
    <Layout>
      <PageHero
        title="About Axis University"
        subtitle="A forward-thinking private institution committed to high-quality education on a global scale."
      />

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-5 leading-relaxed text-foreground/80">
            {aboutContent.map((paragraph, index) => (
              <p key={index}>
                {(
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <img
            src={grad}
            alt="Axis University graduation ceremony"
            width={1600}
            height={900}
            loading="lazy"
            className="max-h-[420px] w-full rounded-3xl object-cover shadow-elegant"
          />
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container grid max-w-5xl gap-6 md:grid-cols-2">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-2xl border-t-4 bg-card p-8 shadow-soft ${item.borderClassName}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
                  <Icon className={`h-6 w-6 ${item.iconClassName}`} />
                </div>

                <h2 className="mb-3 text-2xl font-bold text-primary">
                  {item.title}
                </h2>

                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default About;
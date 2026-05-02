import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Target, Eye } from "lucide-react";
import grad from "@/assets/about-graduation.jpg";

const About = () => (
  <Layout>
    <PageHero title="About Axis University" subtitle="A forward-thinking private institution committed to high-quality education on a global scale." />
    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-5 leading-relaxed">
          <p>Welcome to <strong className="text-primary">Axis University</strong>, a forward-thinking private institution committed to delivering high-quality education on a global scale. Established with a vision to empower students through knowledge and innovation, Axis University has grown into a respected academic institution offering diverse programs across multiple disciplines.</p>
          <p>We are dedicated to maintaining excellence in education through modern teaching methodologies, global partnerships, and internationally recognized standards. Our commitment to quality is reflected in our adherence to structured academic systems and internationally accepted certifications.</p>
          <p>At Axis University, students are given the opportunity to explore a wide range of academic pathways that lead to rewarding careers. With access to global learning platforms and partner institutions worldwide, we ensure that education is accessible, flexible, and future-focused.</p>
          <p>Our campus and learning resources are designed to support academic success, including modern libraries, strong alumni networks, and globally recognized certification programs.</p>
        </div>
      </div>
    </section>

    <section className="py-12">
      <div className="container">
        <img src={grad} alt="Axis University graduation ceremony" width={1600} height={900} loading="lazy" className="w-full max-h-[420px] object-cover rounded-3xl shadow-elegant" />
      </div>
    </section>

    <section className="py-16 bg-secondary/40">
      <div className="container grid gap-6 md:grid-cols-2 max-w-5xl">
        <div className="rounded-2xl bg-card p-8 shadow-soft border-t-4 border-accent">
          <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Our Mission</h2>
          <p className="text-muted-foreground">At Axis University, our mission is to provide accessible, high-quality education that equips students with the knowledge, skills, and competencies required to succeed in a rapidly evolving global environment.</p>
        </div>
        <div className="rounded-2xl bg-card p-8 shadow-soft border-t-4 border-primary">
          <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Our Vision</h2>
          <p className="text-muted-foreground">Our vision is to become a globally recognized university known for academic excellence, innovation, and transformative education.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;

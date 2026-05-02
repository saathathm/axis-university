import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { testimonials } from "@/data/content";

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container">
        <SectionHeading eyebrow="Voices" title="Students Say About Us" description="Real stories from our students and alumni." />
        <div className="max-w-3xl mx-auto">
          <div key={i} className="rounded-2xl bg-card p-8 md:p-10 shadow-elegant text-center animate-fade-in">
            <Quote className="mx-auto h-10 w-10 text-accent mb-5" />
            <p className="text-lg md:text-xl text-foreground/85 italic leading-relaxed">"{testimonials[i].quote}"</p>
            <div className="mt-6">
              <div className="font-semibold text-primary">{testimonials[i].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[i].program}</div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-smooth ${idx === i ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { fetchTestimonials } from "@/store/actions/contentActions.js";

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.content.testimonials);
  const status = useSelector((state) => state.content.status.testimonials);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (testimonials.length === 0) return undefined;
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container">
        <SectionHeading eyebrow="Voices" title="Students Say About Us" description="Real stories from our students and alumni." />
        <div className="max-w-3xl mx-auto">
          {status === "loading" ? <LoadingState label="Loading testimonials..." /> : null}
          {status !== "loading" && testimonials.length === 0 ? (
            <EmptyState title="No testimonials available." description="Approve testimonials from the admin panel." />
          ) : null}
          {testimonials.length > 0 ? (
          <>
          <div key={i} className="rounded-2xl bg-card p-8 md:p-10 shadow-elegant text-center animate-fade-in">
            <Quote className="mx-auto h-10 w-10 text-accent mb-5" />
            <p className="text-lg md:text-xl text-foreground/85 italic leading-relaxed">"{testimonials[i % testimonials.length].quote}"</p>
            <div className="mt-6">
              <div className="font-semibold text-primary">{testimonials[i % testimonials.length].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[i % testimonials.length].program}</div>
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
          </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

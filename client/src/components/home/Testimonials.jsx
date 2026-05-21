import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quote } from "lucide-react";

import SectionHeading from "@/components/widgets/SectionHeading";
import { EmptyState, LoadingState } from "@/components/widgets/ContentState";
import { fetchTestimonials } from "@/actions/testimonialAction";

const SLIDE_TIME = 5500;

function Testimonials() {
  const dispatch = useDispatch();
  const { testimonials, loading, isLoaded } = useSelector(
    (state) => state.testimonial
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!loading && !isLoaded) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, loading, isLoaded]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_TIME);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const testimonial = testimonials[current % testimonials.length];

  return (
    <section className="bg-secondary/40 py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Voices"
          title="Students Say About Us"
          description="Real stories from our students and alumni."
        />

        <div className="mx-auto max-w-3xl">
          {loading && <LoadingState label="Loading testimonials..." />}

          {!loading && testimonials.length === 0 && (
            <EmptyState
              title="No testimonials available."
              description="Approve testimonials from the admin panel."
            />
          )}

          {testimonial && (
            <>
              <div
                key={current}
                className="rounded-2xl bg-card p-8 text-center shadow-elegant animate-fade-in md:p-10"
              >
                <Quote className="mx-auto mb-5 h-10 w-10 text-accent" />
                <p className="text-lg italic leading-relaxed text-foreground/85 md:text-xl">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6">
                  <div className="font-semibold text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.program}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id || index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Testimonial ${index + 1}`}
                    className={`h-2 rounded-full transition-smooth ${
                      index === current
                        ? "w-8 bg-accent"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

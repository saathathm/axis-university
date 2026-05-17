import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quote } from "lucide-react";

import SectionHeading from "@/components/shared/SectionHeading";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { fetchTestimonials } from "@/store/actions/contentActions.js";

const SLIDE_INTERVAL = 5500;

const Testimonials = () => {
  const dispatch = useDispatch();

  const testimonials = useSelector((state) => state.content.testimonials);
  const testimonialStatus = useSelector(
    (state) => state.content.status.testimonials,
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const isLoading = testimonialStatus === "loading";
  const hasTestimonials = testimonials.length > 0;
  const isEmpty = !isLoading && !hasTestimonials;

  const activeTestimonial = hasTestimonials
    ? testimonials[currentTestimonial % testimonials.length]
    : null;

  useEffect(() => {
    if (testimonialStatus === "idle") {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonialStatus]);

  useEffect(() => {
    if (!hasTestimonials) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [hasTestimonials, testimonials.length]);

  return (
    <section className="bg-secondary/40 py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Voices"
          title="Students Say About Us"
          description="Real stories from our students and alumni."
        />

        <div className="mx-auto max-w-3xl">
          {isLoading && <LoadingState label="Loading testimonials..." />}

          {isEmpty && (
            <EmptyState
              title="No testimonials available."
              description="Approve testimonials from the admin panel."
            />
          )}

          {activeTestimonial && (
            <>
              <div
                key={currentTestimonial}
                className="rounded-2xl bg-card p-8 text-center shadow-elegant animate-fade-in md:p-10"
              >
                <Quote className="mx-auto mb-5 h-10 w-10 text-accent" />

                <p className="text-lg italic leading-relaxed text-foreground/85 md:text-xl">
                  "{activeTestimonial.quote}"
                </p>

                <div className="mt-6">
                  <div className="font-semibold text-primary">
                    {activeTestimonial.name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {activeTestimonial.program}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === currentTestimonial;

                  return (
                    <button
                      key={testimonial.id || testimonial.name || index}
                      type="button"
                      onClick={() => setCurrentTestimonial(index)}
                      aria-label={`Testimonial ${index + 1}`}
                      className={`h-2 rounded-full transition-smooth ${
                        isActive
                          ? "w-8 bg-accent"
                          : "w-2 bg-muted-foreground/30"
                      }`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

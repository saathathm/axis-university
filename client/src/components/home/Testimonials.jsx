import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quote, Star } from "lucide-react";

import SectionHeading from "../../components/widgets/SectionHeading";
import {
  EmptyState,
  LoadingState,
} from "../../components/widgets/ContentState";
import { getTestimonials } from "../../features/testimonial/testimonialActions";

import defaultUser from "../../assets/default-user.webp";

const SLIDE_TIME = 5500;
const STORAGE_URL = "http://localhost:8000/storage";

const Testimonials = () => {
  const dispatch = useDispatch();

  const { testimonials = [], loading } = useSelector(
    (state) => state.testimonialState,
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, SLIDE_TIME);

    return () => {
      clearInterval(timer);
    };
  }, [testimonials.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials.length]);

  const hasTestimonials = testimonials.length > 0;
  const currentTestimonial = hasTestimonials
    ? testimonials[currentIndex]
    : null;

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

          {!loading && !hasTestimonials && (
            <EmptyState
              title="No testimonials available."
              description="Approve testimonials from the admin panel."
            />
          )}

          {!loading && currentTestimonial && (
            <>
              <TestimonialCard
                key={currentIndex}
                testimonial={currentTestimonial}
              />

              {testimonials.length > 1 && (
                <TestimonialDots
                  testimonials={testimonials}
                  currentIndex={currentIndex}
                  onChange={setCurrentIndex}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const photoUrl = testimonial.photo
    ? `${STORAGE_URL}/${testimonial.photo}`
    : defaultUser;

  const rating = Number(testimonial.rating) || 0;

  return (
    <div className="animate-fade-in rounded-2xl bg-card p-8 text-center shadow-elegant md:p-10">
      <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full border-4 border-accent/20 bg-secondary shadow-soft">
        <img
          src={photoUrl}
          alt={testimonial.name || "Student"}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = defaultUser;
          }}
        />
      </div>

      <div className="mb-5 flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* <Quote className="mx-auto mb-5 h-10 w-10 text-accent" /> */}

      <p className="text-lg italic leading-relaxed text-foreground/85 md:text-xl">
        “{testimonial.message}”
      </p>

      <div className="mt-6">
        <div className="font-semibold text-primary">{testimonial.name}</div>

        <div className="text-sm text-muted-foreground">
          {testimonial.course}
        </div>
      </div>
    </div>
  );
};

const TestimonialDots = ({ testimonials, currentIndex, onChange }) => {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {testimonials.map((testimonial, index) => {
        const isActive = index === currentIndex;

        return (
          <button
            key={testimonial.id || index}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Show testimonial ${index + 1}`}
            className={`h-2 rounded-full transition-smooth ${
              isActive ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Testimonials;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "@/assets/hero-campus.jpg";
import hero2 from "@/assets/hero-students.jpg";
import hero3 from "@/assets/hero-library.jpg";

const slides = [
  {
    image: hero1,
    title: "Shape Your Future at Axis University",
    subtitle: "World-class education with a global perspective.",
  },
  {
    image: hero2,
    title: "Learn. Innovate. Lead.",
    subtitle: "Programs designed for tomorrow's leaders and creators.",
  },
  {
    image: hero3,
    title: "A Community of Knowledge",
    subtitle: "Modern campus, brilliant faculty, lifelong network.",
  },
];

const SLIDE_INTERVAL = 6000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide.title}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt=""
              width={1920}
              height={1080}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
        );
      })}

      <div className="container relative z-10 flex h-full flex-col items-start justify-center text-primary-foreground">
        <div
          key={currentSlide}
          className="max-w-3xl rounded-3xl border border-primary-foreground/10 bg-background/10 p-8 backdrop-blur animate-fade-in-up md:p-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground">
            Welcome to Axis University
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            {activeSlide.title}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-primary-foreground/90 md:text-xl">
            {activeSlide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/student/apply"
              className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition-smooth hover:opacity-90"
            >
              Apply Now
            </Link>

            <Link
              to="/academics"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 bg-background/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition-smooth hover:bg-background/20"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goToPreviousSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-primary-foreground backdrop-blur transition-smooth hover:bg-background/40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={goToNextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-primary-foreground backdrop-blur transition-smooth hover:bg-background/40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <button
              key={slide.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-smooth ${
                isActive ? "w-8 bg-accent" : "w-2 bg-primary-foreground/50"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSlider;

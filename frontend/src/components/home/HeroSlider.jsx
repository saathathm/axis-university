import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-campus.jpg";
import hero2 from "@/assets/hero-students.jpg";
import hero3 from "@/assets/hero-library.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: hero1, title: "Shape Your Future at Axis University", subtitle: "World-class education with a global perspective." },
  { image: hero2, title: "Learn. Innovate. Lead.", subtitle: "Programs designed for tomorrow's leaders and creators." },
  { image: hero3, title: "A Community of Knowledge", subtitle: "Modern campus, brilliant faculty, lifelong network." },
];

const HeroSlider = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.image}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
      ))}

      <div className="container relative z-10 flex h-full flex-col items-start justify-center text-primary-foreground">
        <div key={i} className="max-w-3xl rounded-3xl border border-primary-foreground/10 bg-background/10 backdrop-blur p-8 md:p-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground">
            Welcome to Axis University
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">{slides[i].title}</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 max-w-xl">{slides[i].subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/student/apply"
              className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-90 transition-smooth"
            >
              Apply Now
            </Link>
            <Link
              to="/academics"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 bg-background/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-background/20 transition-smooth"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground backdrop-blur flex items-center justify-center transition-smooth"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setI((p) => (p + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground backdrop-blur flex items-center justify-center transition-smooth"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-smooth ${idx === i ? "w-8 bg-accent" : "w-2 bg-primary-foreground/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

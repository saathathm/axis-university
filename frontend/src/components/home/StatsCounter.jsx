import { useEffect, useRef, useState } from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: 12500,
    label: "Total Graduates",
    suffix: "+",
  },
  {
    icon: BookOpen,
    value: 85,
    label: "Approved Programs",
    suffix: "",
  },
  {
    icon: Users,
    value: 7800,
    label: "Current Students",
    suffix: "+",
  },
];

const ANIMATION_DURATION = 1600;

const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);

  const counterRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const counterElement = counterRef.current;

    if (!counterElement) return;

    const startCounter = () => {
      const startTime = performance.now();

      const animateCounter = (currentTime) => {
        const progress = Math.min(
          (currentTime - startTime) / ANIMATION_DURATION,
          1,
        );

        setCount(Math.floor(progress * value));

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        }
      };

      requestAnimationFrame(animateCounter);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startCounter();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(counterElement);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-primary py-20 text-primary-foreground">
      <div className="container relative">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            By the numbers
          </span>

          <h2 className="text-3xl font-bold md:text-4xl">Axis in Figures</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 text-center backdrop-blur"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>

                <div className="mb-2 text-4xl font-extrabold md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                <div className="text-sm uppercase tracking-wider text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;

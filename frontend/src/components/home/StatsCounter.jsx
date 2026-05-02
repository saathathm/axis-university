import { useEffect, useRef, useState } from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 12500, label: "Total Graduates", suffix: "+" },
  { icon: BookOpen, value: 85, label: "Approved Programs", suffix: "" },
  { icon: Users, value: 7800, label: "Current Students", suffix: "+" },
];

const Counter = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1600;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(p * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
};

const StatsCounter = () => (
  <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
    <div className="container relative">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">By the numbers</span>
        <h2 className="text-3xl md:text-4xl font-bold">Axis in Figures</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center rounded-2xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10 p-8">
            <div className="mx-auto h-14 w-14 rounded-full bg-accent flex items-center justify-center mb-4">
              <s.icon className="h-7 w-7 text-accent-foreground" />
            </div>
            <div className="text-4xl md:text-5xl font-extrabold mb-2">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-primary-foreground/80 text-sm uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsCounter;

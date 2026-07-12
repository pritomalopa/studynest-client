import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Resources shared", value: 1200 },
  { label: "Active students", value: 3400 },
  { label: "Universities", value: 28 },
  { label: "Verified tutors", value: 65 },
];

const Counter = ({ target }: { target: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString()}+</span>;
};

const StatsSection = () => {
  return (
    <section className="bg-indigo-900 py-16">
      <div className="container-page grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl sm:text-4xl font-display font-semibold text-white">
              <Counter target={s.value} />
            </div>
            <p className="text-sm text-indigo-200 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

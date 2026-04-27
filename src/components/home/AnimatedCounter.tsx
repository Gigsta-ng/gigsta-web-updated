import { useEffect, useRef, useState } from "react";
import CountUpNumber from "../shared/CountUpNumber";

const AnimatedCounter = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: "Bookings this month",
      render: <><CountUpNumber to={20} start={startCount} />+</>,
    },
    {
      label: "Clients Served",
      render: <><CountUpNumber to={30} start={startCount} />+</>,
    },
    {
      label: "Active Providers",
      render: <><CountUpNumber to={10} start={startCount} />+</>,
    },
    {
      label: "Homes & laundry cleaned",
      render: <><CountUpNumber to={20} start={startCount} />+</>,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#F0A500]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 py-10 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`
                text-center py-8 sm:py-0 transition-all duration-700
                ${i !== 0 ? "border-t-2 sm:border-t-0 sm:border-l-2 border-white/40" : ""}
                ${startCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-2">
                {stat.render}
              </div>
              <div className="text-sm sm:text-base font-medium text-white/90 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCounter;
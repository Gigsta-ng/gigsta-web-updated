import { useEffect, useRef, useState } from "react";
import CountUpNumber from "./CountUpNumber";

const SafetyGuarantee = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: "Vetted Providers",
      render: (
        <>
          <CountUpNumber to={100} start={startCount} />%
        </>
      ),
    },
    {
      label: "Support Available",
      render: (
        <>
          <CountUpNumber to={24} start={startCount} />
          /7
        </>
      ),
    },
    {
      label: "Client Satisfaction",
      render: (
        <>
          <CountUpNumber to={100} start={startCount} />%
        </>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#F0A500]/8 border border-[#F0A500]  rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-12">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-6 font-bold leading-[1.2] text-[#0D0F11]">
              Our Safety Guarantee
            </h2>
            <p className="text-[#0D0F11] font-normal text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              If you ever feel unsafe or uncomfortable during a service, contact
              us immediately. We'll address the issue right away and make it
              right. Your safety and satisfaction are unconditionally guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  startCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#F0A500] mb-2">
                  {stat.render}
                </div>
                <div className="text-[#0D0F11] text-sm sm:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyGuarantee;

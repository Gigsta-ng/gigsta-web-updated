import { useEffect, useState } from "react";

type CountUpNumberProps = {
  to: number;
  duration?: number; 
  start?: boolean;
};

export default function CountUpNumber({
  to,
  duration = 1200,
  start = false,
}: CountUpNumberProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setValue(Math.floor(progress * to));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [start, to, duration]);

  return <>{value}</>;
}

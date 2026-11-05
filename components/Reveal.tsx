"use client";

import { useEffect, useRef, useState } from "react";

// Agrega la clase "is-in" cuando el bloque entra en pantalla (dispara animaciones .rv-up).
export function Reveal({ as: Tag = "div", className = "", children, ...rest }: {
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`${className}${inView ? " is-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

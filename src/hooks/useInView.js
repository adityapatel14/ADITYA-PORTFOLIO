// src/hooks/useInView.js
// Fires once when element enters viewport — use to trigger scroll animations
import { useState, useRef, useEffect } from 'react';

export function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // one-shot — animate once
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

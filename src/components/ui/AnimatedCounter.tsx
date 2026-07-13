"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const decimals = value % 1 !== 0 ? 1 : 0;
        ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [springValue, suffix, value]);

  return (
    <motion.span
      ref={ref}
      className="tabular-price font-display text-4xl font-bold text-white md:text-5xl"
    >
      0{suffix}
    </motion.span>
  );
}

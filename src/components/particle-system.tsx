"use client"; // ← make sure this is a client component

import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only run GSAP after mount (client-only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      // Skip everything during SSR / hydration
      if (!isMounted || !containerRef.current) return;

      const container = containerRef.current;
      const particleCount = 100;

      const particles: HTMLDivElement[] = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        // You can still randomize size here – it's now client-only
        const size = gsap.utils.random(4, 14, 1);

        gsap.set(particle, {
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "#fff",
          position: "absolute",
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0,
          willChange: "transform, opacity",
        });

        container.appendChild(particle);
        particles.push(particle);
      }

      const emit = () => {
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        particles.forEach((particle) => {
          gsap.set(particle, {
            x: centerX,
            y: centerY,
            opacity: 0,
            scale: 0,
            rotation: 0,
          });

          const angle = gsap.utils.random(0, 360);
          const distance = gsap.utils.random(80, 220);
          const targetX = Math.cos((angle * Math.PI) / 180) * distance;
          const targetY = Math.sin((angle * Math.PI) / 180) * distance;

          const duration = gsap.utils.random(1.2, 2.8);
          const delay = gsap.utils.random(0, 0.6);

          gsap
            .timeline({ delay })
            .to(particle, {
              opacity: gsap.utils.random(0.6, 1),
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
            .to(particle, {
              x: `+=${targetX}`,
              y: `+=${targetY + 60}`,
              rotation: `+=${gsap.utils.random(-180, 180)}`,
              duration,
              ease: "power1.out",
            })
            .to(
              particle,
              {
                opacity: 0,
                scale: 0.3,
                duration: duration * 0.4,
                ease: "power1.in",
              },
              `-=${duration * 0.3}`,
            );
        });
      };

      const interval = setInterval(emit, 1800);

      // Optional: initial burst
      emit();

      return () => {
        clearInterval(interval);
        // Optional: kill tweens / remove particles if needed
        particles.forEach((p) => p.remove());
      };
    },
    { scope: containerRef, dependencies: [isMounted] }, // re-run when mounted changes
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      suppressHydrationWarning
    />
  );
};

export default ParticleSystem;

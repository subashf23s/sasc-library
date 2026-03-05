import { ComponentProps, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RandomBox = ({
  colors = ["bg-red-500", "bg-blue-500", "bg-green-500"],
  className = "",
  x = 500,
  y = 500,
  duration = 3,
  repeatDelay = 0.2,
  ...props
}: ComponentProps<"div"> & {
  colors?: string[];
  x?: number;
  y?: number;
  duration?: number;
  repeatDelay?: number;
}) => {
  const boxColor = colors[Math.floor(Math.random() * colors.length)];
  const boxRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: () => gsap.utils.random(-x, x, 5),
      y: () => gsap.utils.random(-y, y, 5),
      duration,
      repeat: -1,
      yoyo: true,
      repeatDelay,
      //   repeatRefresh: true,
      ease: "power2.out",
    });
  });
  return (
    <div ref={boxRef} {...props} className={` ${className} ${boxColor}`} />
  );
};

export default RandomBox;

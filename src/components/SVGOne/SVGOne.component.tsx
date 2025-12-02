"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "./SVGOne.style.css";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

export function GSAPOne() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      tl.from("#shape", {
        drawSVG: "0% 0%",
        duration: 1.2,
        ease: "power2.out",
      })

        .to("#shape", {
          morphSVG: "#triangle",
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        })

        .to("#shape", {
          morphSVG: "#star",
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        })

        .to("#shape", {
          morphSVG: "#circle",
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "260px",
        height: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "40px auto",
        cursor: "pointer",
      }}
    >
      <svg
        width="220"
        height="220"
        viewBox="0 0 200 200"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0px 0px 8px rgba(0, 150, 255, 0.4))",
        }}
      >
        {/* hidden shapes for morphing */}
        <path id="triangle" d="M100 10 L190 190 L10 190 Z" opacity="0" />
        <path
          id="star"
          d="M100 10 L130 80 L200 80 L145 120 L165 190 L100 150 L35 190 L55 120 0 80 70 80 Z"
          opacity="0"
        />
        <circle id="circle" cx="100" cy="100" r="90" opacity="0" />

        {/* actual animated shape */}
        <path
          id="shape"
          d="M100 10 L190 190 L10 190 Z"
          fill="none"
          stroke="#00aaff"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

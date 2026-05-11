import "./complexTextAnimationTwo.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function ComplexTextAnimationTwo() {
  const sspRef = useRef<HTMLSpanElement | null>(null);
  const funStuffRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sspRef?.current || !funStuffRef?.current) return;

    const sspTxt = SplitText.create(sspRef.current, { type: "chars" });
    const funStuffTxt = SplitText.create(funStuffRef.current, {
      type: "chars",
    });

    const tw = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      delay: 1,
    });

    tw.to(sspTxt.chars, {
      rotateX: 360,
      duration: 1.4,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    tw.to(
      sspTxt.chars,
      {
        keyframes: [{ color: "#000" }, { color: "#00ff7f" }, { color: "#000" }],
        duration: 1,
        ease: "linear",
        stagger: 0.07,
      },
      "<"
    );

    tw.to(funStuffTxt.chars, {
      keyframes: [{ color: "#000" }, { color: "#00ff7f" }, { color: "#000" }],
      duration: 1.4,
      ease: "linear",
      stagger: { amount: 1, yoyo: true },
    });

    tw.from(
      funStuffTxt.chars,
      {
        opacity: 0,
        y: 100,
        duration: 1.4,
        stagger: { amount: 1, yoyo: true },
        ease: "elastic.out(1, 0.5)",
      },
      "<0.5"
    );
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center" ref={containerRef}>
      <div id="desc" className="text-[60px] p-40 font-semibold">
        GSAP allows you to effortlessly animate anything JS can touch.
        Delivering <span ref={sspRef}>silky-smooth performance</span> and
        unmatched support so you can focus on the{" "}
        <span ref={funStuffRef}>fun stuff.</span>
      </div>
    </div>
  );
}

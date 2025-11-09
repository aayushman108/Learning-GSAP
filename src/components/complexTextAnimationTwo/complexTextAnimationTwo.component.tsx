import "./complexTextAnimationTwo.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollSmoother);

export function ComplexTextAnimationTwo() {
  const descRef = useRef<HTMLSpanElement | null>(null);
  const funStuffRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!descRef?.current || !funStuffRef?.current) return;

    const descTxt = SplitText.create(descRef.current, { type: "chars" });
    const funStuffTxt = SplitText.create(funStuffRef.current, {
      type: "chars",
    });

    descTxt.chars.forEach((char) => {
      (char as HTMLElement).style.display = "inline-block";
      (char as HTMLElement).style.transformOrigin = "50% 50%";
      (char as HTMLElement).style.color = "#000";
    });

    const tw = gsap.timeline({ delay: 1 });

    tw.to(descTxt.chars, {
      rotateX: 360,
      duration: 1.4,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    tw.to(
      descTxt.chars,
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
    <div className="w-full min-h-screen flex items-center">
      <div id="desc" className="text-[80px] p-40">
        GSAP allows you to effortlessly animate anything JS can touch.
        Delivering <span ref={descRef}>silky-smooth performance</span> and
        unmatched support so you can focus on the{" "}
        <span ref={funStuffRef}>fun stuff.</span>
      </div>
    </div>
  );
}

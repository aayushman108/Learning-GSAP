import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./heroSection.style.css";

export function HeroSection() {
  useGSAP(() => {
    const revealImageTimeline = gsap.timeline({});
    revealImageTimeline
      .to(".revealImage", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power1.inOut",
      })
      .to(".revealImage > img", {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
      });
  });
  return (
    <div className="heroSectionContainer w-screen h-screen relative">
      <figure className="revealImage">
        <img src="/assets/hero_1.jpg" alt="" />
      </figure>
    </div>
  );
}

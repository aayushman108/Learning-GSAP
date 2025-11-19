import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./heroSection.style.css";

export function HeroSection() {
  useGSAP(() => {
    const revealImageTimeline = gsap.timeline();
    revealImageTimeline
      .to(".revealImage", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power1.inOut",
      })
      .to(".revealImage > img", {
        scale: 1,
        duration: 0.8,
        ease: "power1.out",
      });

    const staggeredImagesTimeline = gsap.timeline();

    const staggeredImages = document.querySelectorAll(".staggeredImages > img");

    staggeredImages.forEach((img, index) => {
      gsap.set(img, {
        zIndex: index + 10,
      });
      staggeredImagesTimeline.to(img, {
        stagger: 1,
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: "power1.out",
      });
    });

    revealImageTimeline.add(staggeredImagesTimeline);
  });
  return (
    <div className="heroSectionContainer relative w-screen h-screen">
      <figure className="revealImage absolute top-0 left-0">
        <img src="/assets/hero_1.jpg" alt="" />
      </figure>
      <figure className="staggeredImages absolute top-0 left-0">
        <img src="/assets/hero_2.jpg" alt="" />
        <img src="/assets/hero_3.jpg" alt="" />
        <img src="/assets/hero_4.jpg" alt="" />
        <img src="/assets/hero_5.jpg" alt="" />
        <img src="/assets/hero_6.jpg" alt="" />
        <img src="/assets/hero_7.jpg" alt="" />
      </figure>
    </div>
  );
}

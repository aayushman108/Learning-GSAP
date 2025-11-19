import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./heroSection.style.css";
import { Flip } from "gsap/all";

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
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      });

    const staggeredImagesTimeline = gsap.timeline();

    const staggeredImages = document.querySelectorAll<HTMLImageElement>(
      ".staggeredImages > img"
    );

    staggeredImages.forEach((img, index) => {
      gsap.set(img, {
        zIndex: index + 10,
      });
      staggeredImagesTimeline.to(img, {
        stagger: 1.2,
        opacity: 1,
        duration: 1.2,
        scale: 1.05,
        ease: "power2.inOut",
      });
    });

    const revealImage =
      document.querySelector<HTMLImageElement>(".revealImage > img");

    const mainImages = document.querySelectorAll<HTMLImageElement>(
      ".staggeredImages > img.mainImg"
    );

    const targets = document.querySelectorAll<HTMLElement>(
      ".targetContainer > .target"
    );

    revealImageTimeline.add(staggeredImagesTimeline).add(() => {
      staggeredImages.forEach((img) => {
        if (!img.classList.contains("mainImg")) {
          img.remove();
        }
      });
      revealImage?.remove();
      // Flip.fit(
      //   ".staggeredImages > img.container",
      //   ".targetContainer > .target",
      //   {}
      // );

      const state = Flip.getState(mainImages);

      mainImages.forEach((img, i) => {
        targets[i].appendChild(img);
      });

      Flip.from(state, {
        duration: 1.5,
        ease: "power2.inOut",
        stagger: -0.2,
        scale: true,
        simple: true,
        onComplete: () => {
          gsap.to(mainImages, {
            borderRadius: "6px",
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.1,
            overflow: "hidden",
          });
        },
      });
    });
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
        <img className="mainImg" src="/assets/hero_5.jpg" alt="" />
        <img className="mainImg" src="/assets/hero_6.jpg" alt="" />
        <img className="mainImg" src="/assets/hero_7.jpg" alt="" />
      </figure>

      <div className="targetContainer">
        <div className="target"></div>
        <div className="target"></div>
        <div className="target"></div>
      </div>
    </div>
  );
}

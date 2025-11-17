import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import "./_scrollTriggerWithCardInflow.style.css";

export function ScrollTriggerWithCardInflow() {
  useGSAP(() => {
    const allFigures = document.querySelectorAll(".figure");

    const widthOfScreen = window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".card-in-flow-wrapper",
        start: "top top",
        end: "+=600%",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    Array.from(allFigures).forEach((figure, index) => {
      gsap.set(figure, {
        zIndex: index + 10,
        y: 200 + index * 30,
        opacity: 0,
      });

      tl.to(figure, {
        stagger: 1,
        rotate: "random(-10, 10)",
        y: 0,
        left: `random(20, ${widthOfScreen - 420})`,
        opacity: 1,
        duration: 0.8,
      });
    });
  });

  return (
    <div className="card-in-flow-wrapper h-screen w-screen flex items-center justify-center border-2 ">
      <div className="w-full relative">
        <figure className="figure">
          <img src="/assets/media_1.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_2.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_3.jpg" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_4.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_5.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_6.jpg" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_7.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_8.png" alt="" />
        </figure>
        <figure className="figure">
          <img src="/assets/media_9.jpg" alt="" />
        </figure>
      </div>
    </div>
  );
}

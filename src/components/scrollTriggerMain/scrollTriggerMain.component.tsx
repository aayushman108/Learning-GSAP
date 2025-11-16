import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

export function ScrollTriggerMain() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!containerRef?.current) return;

    const widthToScroll = containerRef.current?.scrollWidth - window.innerWidth;
    // const t1 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".wrapper",
    //     start: "top top",
    //     end: `+=${widthToScroll}`,
    //     scrub: true,
    //     pin: true,
    //     // markers: true,
    //   },
    // });
    // t1.to(".wrapper", {
    //   x: `-${widthToScroll}`,
    // });
    gsap.to(".wrapper", {
      x: `-${widthToScroll}`,
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: `+=${widthToScroll}`,
        scrub: true,
        pin: true,
        // markers: true,
      },
    });
  });

  return (
    <div
      ref={containerRef}
      className="wrapper h-screen w-screen flex flex-row flex-nowrap "
    >
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center">
        1
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center">
        2
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center">
        3
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center">
        4
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center">
        5
      </div>
    </div>
  );
}

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

export function ScrollTriggerMain() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  useGSAP(() => {
    if (!containerRef?.current) return;

    const widthToScroll = containerRef.current.scrollWidth - window.innerWidth;

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: `+=${widthToScroll}`,
        scrub: true,
        pin: true,
      },
    });

    tl1.to(".wrapper", {
      x: `-${widthToScroll}`,
    });

    textRefs.current.forEach((textEl) => {
      if (!textEl) return;

      const box = textEl.closest(".box");
      if (!box) return;

      // const start = (index + 1) * 10;
      // const end = (index + 2) * 10;

      gsap
        .timeline({
          // delay: 1,
          scrollTrigger: {
            trigger: box,
            start: "15% right",
            end: "25% right",
            horizontal: true,
            scrub: true,
            containerAnimation: tl1,
            markers: true,
          },
        })
        .to(
          textEl,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            ease: "power1.inOut",
          },
          "<"
        );
    });
  });

  return (
    <div
      ref={containerRef}
      className="wrapper h-screen w-screen flex flex-row flex-nowrap "
    >
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center flex-col gap-20 text-9xl">
        <h1> 01</h1>
        <p
          ref={(el) => {
            textRefs.current[0] = el;
          }}
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          className="text border-2 text-center"
        >
          Hello world This is me, Aayushman Sharma
        </p>
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center flex-col gap-20 text-9xl">
        <h1> 02</h1>
        <p
          ref={(el) => {
            textRefs.current[1] = el;
          }}
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          className="text border-2 text-center"
        >
          Hello world This is me, Aayushman Sharma
        </p>
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center flex-col gap-20 text-9xl">
        <h1> 03</h1>
        <p
          ref={(el) => {
            textRefs.current[2] = el;
          }}
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          className="text border-2 text-center"
        >
          Hello world This is me, Aayushman Sharma
        </p>
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center flex-col gap-20 text-9xl">
        <h1> 04</h1>
        <p
          ref={(el) => {
            textRefs.current[3] = el;
          }}
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          className="text border-2 text-center"
        >
          Hello world This is me, Aayushman Sharma
        </p>
      </div>
      <div className="box w-full flex-none h-full border-2  flex items-center justify-center flex-col gap-20 text-9xl">
        <h1> 05</h1>
        <p
          ref={(el) => {
            textRefs.current[4] = el;
          }}
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          className="text border-2 text-center"
        >
          Hello world This is me, Aayushman Sharma
        </p>
      </div>
    </div>
  );
}

export function ScrollTriggerPinVideo() {
  useGSAP(() => {});

  return <div className="h-screen w-screen">Hello World</div>;
}

import "./complexTextAnimation.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function ComplexTextAnimation() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    const splitText = SplitText.create(headingRef.current, {
      type: "chars, words",
    });

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    t1.from(splitText.chars, {
      opacity: 0,
      yPercent: "random([-100, 100])",
      duration: 2,
      stagger: {
        amount: 0.8,
        from: "random",
      },
    });

    splitText.chars.forEach((char) => {
      const parentWord = char.parentElement?.innerText;
      if (char?.innerHTML === "i" && parentWord === "anything") {
        (char as HTMLElement).style.display = "inline-block";
        (char as HTMLElement).style.transformOrigin = "50% 55%";

        // const spinI = gsap.timeline({ repeat: -1 });

        // spinI
        //   .to(char, {
        //     rotationX: "+=540",
        //     duration: 1.5,
        //     ease: "power2.inOut",
        //   })
        //   .to({}, { duration: 1 })
        //   .to(char, {
        //     rotationX: "+=540",
        //     duration: 1.5,
        //     ease: "power2.inOut",
        //   })
        //   .to({}, { duration: 1 });

        // t1.add(spinI);

        t1.to(char, {
          keyframes: [
            { rotationX: "+=540", duration: 1.5, ease: "power2.inOut" },
            { duration: 1 },
            { rotationX: "+=540", duration: 1.5, ease: "power2.inOut" },
            { duration: 1 },
          ],
          repeat: -1,
        });
      }
    });

    splitText.chars.forEach((char: Element) => {
      const parentWord = char.parentElement?.innerText;

      if (char.innerHTML === "n" && parentWord === "Animate") {
        (char as HTMLElement).style.position = "relative";

        const img = document.createElement("img");
        img.src = "https://cdn-icons-png.flaticon.com/512/616/616430.png";
        img.classList.add("n-image");

        char.appendChild(img);

        const nRect = char.getBoundingClientRect();

        t1.from(
          img,
          {
            x: -(nRect.left + nRect.width),
            rotation: -360,
            duration: 1,
            ease: "power2.out",
            // onComplete: startRotatingImg,
          },
          "<-0.8"
        );

        // function startRotatingImg() {
        //   gsap.to(img, {
        //     keyframes: [
        //       { rotationZ: 90, duration: 0.6, ease: "power1.inOut" },
        //       { duration: 0.5 },
        //       { rotationZ: 180, duration: 0.6, ease: "power1.inOut" },
        //       { duration: 0.5 },
        //       { rotationZ: 270, duration: 0.6, ease: "power1.inOut" },
        //       { duration: 0.5 },
        //       { rotationZ: 360, duration: 0.6, ease: "power1.inOut" },
        //       { duration: 0.5 },
        //     ],
        //     repeat: -1,
        //     delay: 2,
        //   });
        // }

        // const spin = gsap.timeline({ repeat: -1, delay: 2 });

        // spin
        //   .to(img, {
        //     rotationZ: 90,
        //     duration: 0.6,
        //     ease: "power1.inOut",
        //   })
        //   .to({}, { duration: 0.5 })
        //   .to(img, { rotationZ: 180, duration: 0.6, ease: "power1.inOut" })
        //   .to({}, { duration: 0.5 })
        //   .to(img, { rotationZ: 270, duration: 0.6, ease: "power1.inOut" })
        //   .to({}, { duration: 0.5 })
        //   .to(img, { rotationZ: 360, duration: 0.6, ease: "power1.inOut" })
        //   .to({}, { duration: 0.5 });

        // t1.add(spin, "<");

        t1.to(img, {
          keyframes: [
            { rotationZ: 90, duration: 0.6, ease: "power1.inOut" },
            { duration: 0.5 },
            { rotationZ: 180, duration: 0.6, ease: "power1.inOut" },
            { duration: 0.5 },
            { rotationZ: 270, duration: 0.6, ease: "power1.inOut" },
            { duration: 0.5 },
            { rotationZ: 360, duration: 0.6, ease: "power1.inOut" },
            { duration: 0.5 },
          ],
          repeat: -1,
          delay: 2,
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <h1 className="visually-hidden">Animate anything</h1>
      <div
        aria-hidden={true}
        className="w-full border-2 p-30 flex flex-col leading-60"
        ref={headingRef}
        style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <span className="text-[250px]">Animate</span>
        <span className="text-[250px] self-end">anything</span>
      </div>
    </div>
  );
}

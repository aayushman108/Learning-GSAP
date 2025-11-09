import "./complexTextAnimation.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollSmoother);
export function ComplexTextAnimation() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    const splitText = SplitText.create(headingRef.current, {
      type: "chars, words",
    });

    const t1 = gsap.timeline();

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

        const spinI = gsap.timeline({ repeat: -1 });

        spinI
          .to(char, {
            rotationX: "+=540",
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to({}, { duration: 1 })
          .to(char, {
            rotationX: "+=540",
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to({}, { duration: 1 });

        t1.add(spinI);
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

        const spin = gsap.timeline({ repeat: -1 });

        spin
          .to(img, { rotationZ: 90, duration: 0.6, ease: "power1.inOut" })
          .to({}, { duration: 0.5 })
          .to(img, { rotationZ: 180, duration: 0.6, ease: "power1.inOut" })
          .to({}, { duration: 0.5 })
          .to(img, { rotationZ: 270, duration: 0.6, ease: "power1.inOut" })
          .to({}, { duration: 0.5 })
          .to(img, { rotationZ: 360, duration: 0.6, ease: "power1.inOut" })
          .to({}, { duration: 0.5 });

        t1.add(spin, "<");
      }
    });
  }, []);

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

    const tw = gsap.timeline({ delay: 5 });

    tw.to(
      descTxt.chars,
      {
        rotateX: 360,
        duration: 1.4,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      "<"
    );

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
    <div className="w-full min-h-screen flex items-center justify-center border-2 flex-col ">
      <h1 className="visually-hidden">Animate anything</h1>
      <div
        aria-hidden={true}
        className="border-2 w-full p-20 flex flex-col leading-60"
        ref={headingRef}
        style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <span className="text-[250px]">Animate</span>
        <span className="text-[250px] self-end">anything</span>
      </div>

      <div id="desc" className="text-[80px] p-40">
        GSAP allows you to effortlessly animate anything JS can touch.
        Delivering <span ref={descRef}>silky-smooth performance</span> and
        unmatched support so you can focus on the{" "}
        <span ref={funStuffRef}>fun stuff.</span>
      </div>
    </div>
  );
}

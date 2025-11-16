import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import "./textSplitting.style.css";

export const TextSplitting: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = SplitText.create(textRef.current, {
      type: "chars, words, lines",
    });

    // const split = SplitText.create(".myText", {
    //   type: "chars, words, lines",
    //   charsClass: "chars",
    //   wordsClass: "words",
    //   linesClass: "lines",
    // });

    // const split = new SplitText(textRef.current, {
    //   type: "chars,words,lines",
    // });

    // gsap.from(split.chars, {
    //   opacity: 0,
    //   y: 40,
    //   duration: 0.6,
    //   stagger: {
    //     amount: 0.5,
    //     from: "random",
    //     yoyo: true,
    //     repeat: -1,
    //   },
    //   ease: "power3.out",
    // });

    // gsap.from(split.chars, {
    //   yPercent: "random([-100, 100])",
    //   rotation: "random(-30, 30)",
    //   autoAlpha: 0,
    //   repeat: -1,
    //   yoyo: true,
    //   stagger: {
    //     amount: 0.5,
    //     from: "random",
    //   },
    // });

    gsap.from(split.chars, {
      yPercent: "random([-100, 100])",
      rotation: "random(-30, 30)",
      stagger: {
        amount: 0.5,
        from: "random",
      },
    });

    return () => split.revert();
  });

  return (
    <div className="container">
      <h1 ref={textRef} className="myText">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
        ratione, fugit reprehenderit cum aliquam dicta esse incidunt rem qui
        provident!
      </h1>
    </div>
  );
};

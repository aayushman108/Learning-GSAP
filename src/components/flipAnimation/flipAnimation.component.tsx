import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import "./flipAnimation.style.css";

gsap.registerPlugin(Flip);

export default function FlipAnimation() {
  const containerRef = useRef(null);
  const [isList, setIsList] = useState(false);

  useGSAP(() => {
    if (!containerRef?.current) return;
    const state = Flip.getState(".card", { props: "width,height" });

    // apply layout changes
    (containerRef.current as HTMLDivElement).classList.toggle("list", isList);

    // animate to the new position
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
      stagger: 0.05,
    });
  }, [isList]);

  return (
    <div className="wrapper">
      <button className="toggle" onClick={() => setIsList(!isList)}>
        Toggle Layout
      </button>

      <div className="cards" ref={containerRef}>
        <div className="card a">A</div>
        <div className="card b">B</div>
        <div className="card c">C</div>
        <div className="card d">D</div>
      </div>
    </div>
  );
}

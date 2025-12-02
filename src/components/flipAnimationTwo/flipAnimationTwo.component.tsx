import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import "./flipAnimationTwo.style.css";

gsap.registerPlugin(Flip);

type ItemID = string;

export function FlipAnimationTwo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<ItemID[]>([]);

  const items: ItemID[] = ["A", "B", "C", "D", "E", "F"];

  const toggleItem = (id: ItemID) => {
    // Capture FLIP state before DOM changes
    const state = Flip.getState(".item, .selected-box, .items-grid");
    flipState.current = state;

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const flipState = useRef<Flip.FlipState | null>(null);

  useLayoutEffect(() => {
    if (!flipState.current) return;

    Flip.from(flipState.current, {
      targets: ".item, .selected-box, .items-grid",
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: ".item",
      onComplete: () => {
        flipState.current = null;
      },
    });
  }, [selected]);

  return (
    <div className="flip-animation-two-wrapper">
      <h2>GSAP FLIP (TypeScript): Move Items Between Containers</h2>

      {/* SELECTED AREA */}
      <div className="selected-area">
        <h3>Selected:</h3>
        <div className="selected-box" ref={containerRef}>
          {items
            .filter((id) => selected.includes(id))
            .map((id) => (
              <div
                key={id}
                className="item"
                data-flip-id={id}
                onClick={() => toggleItem(id)}
              >
                {id}
              </div>
            ))}
        </div>
      </div>

      {/* AVAILABLE ITEMS */}
      <h3>All Items:</h3>
      <div className="items-grid">
        {items
          .filter((id) => !selected.includes(id))
          .map((id) => (
            <div
              key={id}
              className="item"
              data-flip-id={id}
              onClick={() => toggleItem(id)}
            >
              {id}
            </div>
          ))}
      </div>
    </div>
  );
}

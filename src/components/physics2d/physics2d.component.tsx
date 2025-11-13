import "./physics2d.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { SplitText } from "gsap/SplitText";

// Register plugins
gsap.registerPlugin(Physics2DPlugin);
gsap.registerPlugin(SplitText);

export function Physics2D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const [ballCount, setBallCount] = useState(5);

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const balls: HTMLDivElement[] = [];

    // Remove existing balls
    container.querySelectorAll(".physics-ball").forEach((ball) => {
      gsap.killTweensOf(ball);
      ball.remove();
    });

    // Create new balls
    for (let i = 0; i < ballCount; i++) {
      const ball = document.createElement("div");
      ball.className = "physics-ball";

      // Random size between 30-60px
      const size = 30 + Math.random() * 30;
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;

      // Random starting position
      const startX = size + Math.random() * (containerRect.width - size * 2);
      const startY = size + Math.random() * (containerRect.height - size * 2);

      // Set initial position using GSAP
      gsap.set(ball, {
        x: startX,
        y: startY,
        position: "absolute",
      });

      // Random color
      const hue = (i * 360) / ballCount;
      ball.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;

      container.appendChild(ball);
      balls.push(ball);
    }

    // Apply Physics2D to each ball
    balls.forEach((ball) => {
      // Random initial velocity
      const velocityX = (Math.random() - 0.5) * 300;
      const velocityY = (Math.random() - 0.5) * 300;

      // Use GSAP Physics2D plugin
      gsap.to(ball, {
        physics2D: {
          velocity: velocityX,
          velocityY: velocityY,
          gravity: 400,
          friction: 0.1,
          acceleration: 0,
          accelerationAngle: 0,
        } as any,
        duration: 10,
        ease: "none",
        onUpdate: function () {
          // Boundary collision detection
          const rect = ball.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const ballWidth = rect.width;
          const ballHeight = rect.height;

          const currentX = gsap.getProperty(ball, "x") as number;
          const currentY = gsap.getProperty(ball, "y") as number;

          // Check boundaries and reverse velocity if needed
          if (currentX <= 0) {
            const currentVelocity = gsap.getProperty(
              ball,
              "physics2D.velocity"
            ) as number;
            gsap.set(ball, {
              physics2D: {
                velocity: Math.abs(currentVelocity) * 0.8,
              } as any,
            });
            gsap.set(ball, { x: 0 });
          } else if (currentX + ballWidth >= containerRect.width) {
            const currentVelocity = gsap.getProperty(
              ball,
              "physics2D.velocity"
            ) as number;
            gsap.set(ball, {
              physics2D: {
                velocity: -Math.abs(currentVelocity) * 0.8,
              } as any,
            });
            gsap.set(ball, { x: containerRect.width - ballWidth });
          }

          if (currentY <= 0) {
            const currentVelocityY = gsap.getProperty(
              ball,
              "physics2D.velocityY"
            ) as number;
            gsap.set(ball, {
              physics2D: {
                velocityY: Math.abs(currentVelocityY) * 0.8,
              } as any,
            });
            gsap.set(ball, { y: 0 });
          } else if (currentY + ballHeight >= containerRect.height) {
            const currentVelocityY = gsap.getProperty(
              ball,
              "physics2D.velocityY"
            ) as number;
            gsap.set(ball, {
              physics2D: {
                velocityY: -Math.abs(currentVelocityY) * 0.8,
              } as any,
            });
            gsap.set(ball, { y: containerRect.height - ballHeight });
          }
        },
        repeat: -1,
      });
    });

    // Interactive: Click to add force
    const handleClick = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const clickY = e.clientY - containerRect.top;

      balls.forEach((ball) => {
        const ballX = gsap.getProperty(ball, "x") as number;
        const ballY = gsap.getProperty(ball, "y") as number;
        const rect = ball.getBoundingClientRect();
        const ballCenterX = ballX + rect.width / 2;
        const ballCenterY = ballY + rect.height / 2;

        const dx = clickX - ballCenterX;
        const dy = clickY - ballCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If click is within 200px of ball, apply force
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200;
          const forceX = (dx / distance) * force * 500;
          const forceY = (dy / distance) * force * 500;

          const currentVelocity =
            (gsap.getProperty(ball, "physics2D.velocity") as number) || 0;
          const currentVelocityY =
            (gsap.getProperty(ball, "physics2D.velocityY") as number) || 0;

          gsap.set(ball, {
            physics2D: {
              velocity: currentVelocity + forceX,
              velocityY: currentVelocityY + forceY,
            } as any,
          });
        }
      });
    };

    container.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      container.removeEventListener("click", handleClick);
      balls.forEach((ball) => {
        gsap.killTweensOf(ball);
        ball.remove();
      });
    };
  }, [ballCount]);

  // Text splitting animation
  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Split title text
    const titleSplit = SplitText.create(titleRef.current, {
      type: "chars",
    });

    // Split subtitle text
    const subtitleSplit = SplitText.create(subtitleRef.current, {
      type: "words",
    });

    // Animate title characters
    gsap.from(titleSplit.chars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6,
        from: "random",
      },
    });

    // Animate subtitle words
    gsap.from(subtitleSplit.words, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.5,
    });

    // Cleanup
    return () => {
      titleSplit.revert();
      subtitleSplit.revert();
    };
  }, []);

  return (
    <div className="physics2d-container">
      <div className="physics2d-controls">
        <h2 ref={titleRef} className="physics2d-title">
          Physics 2D Animation
        </h2>
        <p ref={subtitleRef} className="physics2d-subtitle">
          Click anywhere to apply force to nearby balls
        </p>
        <div className="physics2d-control-group">
          <label htmlFor="ballCount">Number of Balls: {ballCount}</label>
          <input
            id="ballCount"
            type="range"
            min="3"
            max="15"
            value={ballCount}
            onChange={(e) => setBallCount(Number(e.target.value))}
            className="physics2d-slider"
          />
        </div>
      </div>
      <div ref={containerRef} className="physics2d-canvas"></div>
    </div>
  );
}

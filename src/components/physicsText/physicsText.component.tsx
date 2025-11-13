import "./physicsText.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { SplitText } from "gsap/SplitText";

// Register plugins
gsap.registerPlugin(Physics2DPlugin);
gsap.registerPlugin(SplitText);

export function PhysicsText() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const applyPhysicsRef = useRef<((isAutoTrigger?: boolean) => void) | null>(
    null
  );
  const resetTextRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<number | null>(null);
  const splitRef = useRef<any>(null);
  const originalPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;

    const textElement = textRef.current;
    const container = containerRef.current;

    // Split the text into characters
    const split = SplitText.create(textElement, {
      type: "chars",
    });

    // Initial animation - characters come in
    gsap.from(split.chars, {
      opacity: 0,
      scale: 0,
      rotation: "random(-180, 180)",
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        amount: 1,
        from: "random",
      },
    });

    // Store original positions
    const originalPositions: { x: number; y: number }[] = [];
    split.chars.forEach((char) => {
      const rect = (char as HTMLElement).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      originalPositions.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    // Store in refs for access in useEffect
    splitRef.current = split;
    originalPositionsRef.current = originalPositions;

    // Function to apply physics to characters with crack effect
    const applyPhysics = (isAutoTrigger = false) => {
      setIsActive(true);

      // Add crack effect animation before physics
      if (isAutoTrigger) {
        // Shake and crack effect - more dramatic
        gsap.to(split.chars, {
          scale: "random(0.7, 1.3)",
          rotation: "random(-30, 30)",
          x: "random(-20, 20)",
          y: "random(-20, 20)",
          duration: 0.4,
          ease: "power2.inOut",
          stagger: {
            amount: 0.6,
            from: "center",
          },
          onComplete: () => {
            // Reset transforms before applying physics
            gsap.set(split.chars, {
              scale: 1,
              rotation: 0,
            });
            // Now apply physics
            applyPhysicsToChars();
          },
        });
      } else {
        applyPhysicsToChars();
      }

      function applyPhysicsToChars() {
        split.chars.forEach((char, index) => {
          const charElement = char as HTMLElement;

          // Set initial position
          const originalPos = originalPositions[index];
          gsap.set(charElement, {
            position: "absolute",
            x: originalPos.x,
            y: originalPos.y,
            transformOrigin: "50% 50%",
          });

          // For auto-trigger (crack effect), make it fall more dramatically
          const isCrackMode = isAutoTrigger;
          // More spread out velocities for cracker effect
          const velocityX = isCrackMode
            ? (Math.random() - 0.5) * 500 + (Math.random() > 0.5 ? 150 : -150) // Spread out horizontally
            : (Math.random() - 0.5) * 400;
          const velocityY = isCrackMode
            ? Math.random() * 250 + 150 // Mostly downward, like crackers falling
            : (Math.random() - 0.5) * 400 - 200;

          // Add random rotation for crack effect - more dramatic spinning
          const initialRotation = isCrackMode
            ? (Math.random() - 0.5) * 1080
            : 0;

          // Apply Physics2D
          gsap.to(charElement, {
            physics2D: {
              velocity: velocityX,
              velocityY: velocityY,
              gravity: isCrackMode ? 700 : 500, // Stronger gravity for crack effect
              friction: 0.08,
              acceleration: 0,
              accelerationAngle: 0,
            } as any,
            rotation: `+=${initialRotation}`,
            scale: isCrackMode ? "random(0.8, 1.2)" : 1,
            duration: 15,
            ease: "none",
            onUpdate: function () {
              // Boundary collision detection
              const rect = charElement.getBoundingClientRect();
              const containerRect = container.getBoundingClientRect();
              const charWidth = rect.width;
              const charHeight = rect.height;

              const currentX = gsap.getProperty(charElement, "x") as number;
              const currentY = gsap.getProperty(charElement, "y") as number;

              // Left and right boundaries
              if (currentX <= charWidth / 2) {
                const currentVelocity = gsap.getProperty(
                  charElement,
                  "physics2D.velocity"
                ) as number;
                gsap.set(charElement, {
                  physics2D: {
                    velocity: Math.abs(currentVelocity) * 0.7,
                  } as any,
                });
                gsap.set(charElement, { x: charWidth / 2 });
              } else if (currentX + charWidth / 2 >= containerRect.width) {
                const currentVelocity = gsap.getProperty(
                  charElement,
                  "physics2D.velocity"
                ) as number;
                gsap.set(charElement, {
                  physics2D: {
                    velocity: -Math.abs(currentVelocity) * 0.7,
                  } as any,
                });
                gsap.set(charElement, {
                  x: containerRect.width - charWidth / 2,
                });
              }

              // Top and bottom boundaries
              if (currentY <= charHeight / 2) {
                const currentVelocityY = gsap.getProperty(
                  charElement,
                  "physics2D.velocityY"
                ) as number;
                gsap.set(charElement, {
                  physics2D: {
                    velocityY: Math.abs(currentVelocityY) * 0.7,
                  } as any,
                });
                gsap.set(charElement, { y: charHeight / 2 });
              } else if (currentY + charHeight / 2 >= containerRect.height) {
                const currentVelocityY = gsap.getProperty(
                  charElement,
                  "physics2D.velocityY"
                ) as number;
                gsap.set(charElement, {
                  physics2D: {
                    velocityY: -Math.abs(currentVelocityY) * 0.7,
                  } as any,
                });
                gsap.set(charElement, {
                  y: containerRect.height - charHeight / 2,
                });
              }

              // Add continuous rotation based on velocity (more dramatic for crack effect)
              const velX =
                (gsap.getProperty(
                  charElement,
                  "physics2D.velocity"
                ) as number) || 0;
              const rotationSpeed = isCrackMode ? velX * 0.15 : velX * 0.1;
              const currentRotation = gsap.getProperty(
                charElement,
                "rotation"
              ) as number;
              // Continuous rotation for cracker effect
              gsap.set(charElement, {
                rotation: currentRotation + rotationSpeed * 0.05,
              });
            },
            repeat: -1,
          });
        });
      }
    };

    // Function to reset characters to original positions
    const resetText = () => {
      setIsActive(false);

      split.chars.forEach((char, index) => {
        const charElement = char as HTMLElement;
        gsap.killTweensOf(charElement);

        const originalPos = originalPositions[index];
        gsap.to(charElement, {
          x: originalPos.x,
          y: originalPos.y,
          rotation: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.02,
        });
      });
    };

    // Store functions in refs for button access
    applyPhysicsRef.current = applyPhysics;
    resetTextRef.current = resetText;

    // Cleanup
    return () => {
      split.chars.forEach((char) => {
        gsap.killTweensOf(char);
      });
      split.revert();
      applyPhysicsRef.current = null;
      resetTextRef.current = null;
    };
  }, []);

  // Auto-trigger after 60 seconds
  useEffect(() => {
    if (isActive) return; // Don't start timer if already active

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Main timer - trigger after 60 seconds
    timerRef.current = setTimeout(() => {
      if (applyPhysicsRef.current && !isActive) {
        // Call with isAutoTrigger = true for crack effect
        applyPhysicsRef.current(true);
      }
      clearInterval(countdownInterval);
    }, 60000); // 60 seconds

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      clearInterval(countdownInterval);
    };
  }, [isActive]);

  // Button handlers
  const handleActivate = () => {
    // Clear the auto-timer if manually activated
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTimeRemaining(0); // Stop countdown
    if (applyPhysicsRef.current) {
      applyPhysicsRef.current(false); // Manual trigger, not auto
    }
  };

  const handleReset = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (resetTextRef.current) {
      resetTextRef.current();
      setTimeRemaining(60); // Reset timer - useEffect will restart it
    }
  };

  return (
    <div className="physics-text-container">
      <div className="physics-text-controls">
        <h3 className="physics-text-title">Physics Text Animation</h3>
        <p className="physics-text-description">
          Text splitting combined with GSAP Physics2D
        </p>
        {!isActive && timeRemaining > 0 && (
          <div className="physics-text-timer">
            <span className="timer-label">Auto-break in:</span>
            <span className="timer-value">{timeRemaining}s</span>
          </div>
        )}
        {isActive && timeRemaining === 0 && (
          <div className="physics-text-cracked">
            💥 Text has cracked and fallen!
          </div>
        )}
        <div className="physics-text-buttons">
          <button
            onClick={handleActivate}
            disabled={isActive}
            className="physics-text-button physics-text-button-primary"
          >
            {isActive ? "Physics Active" : "Activate Physics"}
          </button>
          <button
            onClick={handleReset}
            disabled={!isActive}
            className="physics-text-button physics-text-button-secondary"
          >
            Reset Text
          </button>
        </div>
      </div>
      <div ref={containerRef} className="physics-text-canvas">
        <h1 ref={textRef} className="physics-text-heading">
          GSAP Physics
        </h1>
      </div>
    </div>
  );
}

import "./scrollTriggerAnimation.style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Register plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export interface ScrollTriggerAnimationProps {
  children: ReactNode;
  animationType?:
    | "fade"
    | "slideLeft"
    | "slideRight"
    | "slideUp"
    | "slideDown"
    | "scale"
    | "rotate"
    | "blur"
    | "textReveal"
    | "magnetic";
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
  once?: boolean;
  pin?: boolean;
  pinSpacing?: boolean;
}

/**
 * Advanced Reusable ScrollTrigger Animation Component
 * Features: Text splitting, pin sections, parallax, magnetic effects
 */
export function ScrollTriggerAnimation({
  children,
  animationType = "fade",
  delay = 0,
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  scrub = false,
  className = "",
  once = true,
  pin = false,
  pinSpacing = true,
}: ScrollTriggerAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Handle text reveal animation
    if (animationType === "textReveal") {
      const split = SplitText.create(element, { type: "chars,words" });

      gsap.set(split.chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          once,
          toggleActions: once
            ? "play none none none"
            : "play none reverse none",
        },
      });

      tl.to(split.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        delay,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.5,
          from: "random",
        },
      });

      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      };
    }

    // Handle magnetic effect
    if (animationType === "magnetic") {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Set initial state based on animation type
    const initialStyles: gsap.TweenVars = {
      opacity: animationType === "fade" || animationType === "blur" ? 0 : 1,
    };

    switch (animationType) {
      case "slideLeft":
        initialStyles.x = -100;
        break;
      case "slideRight":
        initialStyles.x = 100;
        break;
      case "slideUp":
        initialStyles.y = 100;
        break;
      case "slideDown":
        initialStyles.y = -100;
        break;
      case "scale":
        initialStyles.scale = 0.5;
        break;
      case "rotate":
        initialStyles.rotation = -45;
        break;
      case "blur":
        initialStyles.filter = "blur(10px)";
        break;
    }

    gsap.set(element, initialStyles);

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        once,
        pin: pin ? element : false,
        pinSpacing,
        toggleActions: once ? "play none none none" : "play none reverse none",
      },
    });

    // Animate to final state
    const finalStyles: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power2.out",
    };

    switch (animationType) {
      case "slideLeft":
      case "slideRight":
        finalStyles.x = 0;
        break;
      case "slideUp":
      case "slideDown":
        finalStyles.y = 0;
        break;
      case "scale":
        finalStyles.scale = 1;
        break;
      case "rotate":
        finalStyles.rotation = 0;
        break;
      case "blur":
        finalStyles.filter = "blur(0px)";
        break;
    }

    tl.to(element, finalStyles);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [
    animationType,
    delay,
    duration,
    start,
    end,
    scrub,
    once,
    pin,
    pinSpacing,
  ]);

  return (
    <div ref={elementRef} className={`scroll-trigger-element ${className}`}>
      {children}
    </div>
  );
}

/**
 * Animated Counter Component
 */
function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.to(
      { value: 0 },
      {
        value: end,
        duration,
        ease: "power2.out",
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].value));
        },
      }
    );
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/**
 * Parallax Layer Component
 */
function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!layerRef.current) return;

    gsap.to(layerRef.current, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: layerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={layerRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
}

/**
 * Unique Portfolio Demo with Advanced Animations
 */
export function ScrollTriggerDemo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="scroll-trigger-demo">
      {/* Animated Cursor Effect */}
      <div
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      {/* Hero Section with Text Reveal */}
      <section className="scroll-hero-section">
        <div className="hero-background" />
        <ParallaxLayer speed={0.3}>
          <div className="hero-content">
            <ScrollTriggerAnimation animationType="textReveal" delay={0.1}>
              <h1 className="scroll-hero-title">Creative Developer</h1>
            </ScrollTriggerAnimation>
            <ScrollTriggerAnimation animationType="textReveal" delay={0.3}>
              <p className="scroll-hero-subtitle">
                Crafting digital experiences that blend innovation with elegance
              </p>
            </ScrollTriggerAnimation>
            <ScrollTriggerAnimation animationType="scale" delay={0.5}>
              <div className="hero-badge">
                <span>Available for Projects</span>
              </div>
            </ScrollTriggerAnimation>
          </div>
        </ParallaxLayer>
      </section>

      {/* Stats Section with Pin */}
      <section className="scroll-stats-section">
        <ScrollTriggerAnimation pin={true} pinSpacing={true} start="top top">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-number">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-number">
                <AnimatedCounter end={5} suffix="+" />
              </div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-number">
                <AnimatedCounter end={20} suffix="+" />
              </div>
              <div className="stat-label">Countries Reached</div>
            </div>
          </div>
        </ScrollTriggerAnimation>
      </section>

      {/* Skills with Magnetic Effect */}
      <section className="scroll-section">
        <ScrollTriggerAnimation animationType="textReveal">
          <h2 className="scroll-section-title">Core Expertise</h2>
        </ScrollTriggerAnimation>
        <div className="scroll-skills-grid">
          {[
            {
              icon: "⚛️",
              name: "React",
              desc: "Modern UI Development",
              color: "#61DAFB",
            },
            {
              icon: "🎨",
              name: "GSAP",
              desc: "Advanced Animations",
              color: "#88CE02",
            },
            {
              icon: "📘",
              name: "TypeScript",
              desc: "Type-Safe Code",
              color: "#3178C6",
            },
            {
              icon: "🎯",
              name: "Node.js",
              desc: "Full Stack Solutions",
              color: "#339933",
            },
            {
              icon: "🎭",
              name: "Three.js",
              desc: "3D Experiences",
              color: "#000000",
            },
            {
              icon: "⚡",
              name: "Next.js",
              desc: "Production Ready",
              color: "#000000",
            },
          ].map((skill, index) => (
            <ScrollTriggerAnimation
              key={skill.name}
              animationType="magnetic"
              delay={index * 0.1}
            >
              <div
                className="scroll-skill-card magnetic-card"
                style={{ "--skill-color": skill.color } as React.CSSProperties}
              >
                <div className="scroll-skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p>{skill.desc}</p>
                <div className="skill-progress">
                  <div className="skill-progress-bar" />
                </div>
              </div>
            </ScrollTriggerAnimation>
          ))}
        </div>
      </section>

      {/* Projects with Parallax */}
      <section className="scroll-projects-section">
        <ScrollTriggerAnimation animationType="fade">
          <h2 className="scroll-section-title">Featured Work</h2>
        </ScrollTriggerAnimation>

        <div className="projects-container">
          <ScrollTriggerAnimation
            animationType="slideRight"
            delay={0.2}
            scrub={1}
          >
            <div className="scroll-project-card project-card-large">
              <div className="project-image-wrapper">
                <div className="project-image project-image-1" />
                <div className="project-overlay">
                  <h3>E-Commerce Platform</h3>
                  <p>Modern shopping experience with real-time inventory</p>
                  <button className="scroll-project-button">Explore</button>
                </div>
              </div>
            </div>
          </ScrollTriggerAnimation>

          <ScrollTriggerAnimation
            animationType="slideLeft"
            delay={0.2}
            scrub={1}
          >
            <div className="scroll-project-card project-card-large">
              <div className="project-image-wrapper">
                <div className="project-image project-image-2" />
                <div className="project-overlay">
                  <h3>Creative Agency Site</h3>
                  <p>Portfolio showcase with immersive animations</p>
                  <button className="scroll-project-button">Explore</button>
                </div>
              </div>
            </div>
          </ScrollTriggerAnimation>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="scroll-timeline-section">
        <ScrollTriggerAnimation animationType="fade">
          <h2 className="scroll-section-title">Journey</h2>
        </ScrollTriggerAnimation>
        <div className="timeline">
          {[
            {
              year: "2024",
              title: "Senior Developer",
              desc: "Leading innovative projects",
            },
            {
              year: "2022",
              title: "Full Stack Developer",
              desc: "Expanded skill set",
            },
            {
              year: "2020",
              title: "Frontend Developer",
              desc: "Started the journey",
            },
          ].map((item, index) => (
            <ScrollTriggerAnimation
              key={item.year}
              animationType={index % 2 === 0 ? "slideRight" : "slideLeft"}
              delay={index * 0.2}
            >
              <div className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </ScrollTriggerAnimation>
          ))}
        </div>
      </section>

      {/* Contact with Blur Effect */}
      <section className="scroll-contact-section">
        <ParallaxLayer speed={0.2}>
          <ScrollTriggerAnimation animationType="blur" scrub={1}>
            <div className="scroll-contact-card contact-card-enhanced">
              <ScrollTriggerAnimation animationType="textReveal">
                <h2 className="scroll-contact-title">Let's Create Together</h2>
              </ScrollTriggerAnimation>
              <p className="scroll-contact-text">
                Ready to bring your vision to life? Let's discuss your next
                project.
              </p>
              <div className="contact-buttons">
                <button className="scroll-contact-button primary-button">
                  Start a Project
                </button>
                <button className="scroll-contact-button secondary-button">
                  View Resume
                </button>
              </div>
            </div>
          </ScrollTriggerAnimation>
        </ParallaxLayer>
      </section>
    </div>
  );
}

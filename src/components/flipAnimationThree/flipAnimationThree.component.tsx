"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import "./flipAnimationThree.style.css";

gsap.registerPlugin(Flip);

interface ImageItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

const images: ImageItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    title: "Red Nike",
    category: "Sneakers",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    title: "Classic Brown",
    category: "Boots",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
    title: "Green Jordan",
    category: "Sneakers",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
    title: "Running Blue",
    category: "Sport",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    title: "Purple Haze",
    category: "Sneakers",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    title: "Urban Grey",
    category: "Casual",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
    title: "Running Blue",
    category: "Sport",
  },
];

export function FlipAnimationThree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSelect = (id: string) => {
    const state = Flip.getState(
      ".image-card, .gallery-grid, .image-card.featured, .featured-container"
    );
    flipState.current = state;

    setSelectedId((prev) => (prev === id ? null : id));
  };

  useGSAP(
    () => {
      if (!flipState.current) return;

      Flip.from(flipState.current, {
        targets: ".image-card, .gallery-grid, .featured-container",
        duration: 0.8,
        ease: "power3.inOut",
        absolute: selectedId ? `[data-flip-id="${selectedId}"]` : false,
        zIndex: 10,
        toggleClass: "flipping",
        onComplete: () => {
          flipState.current = null;
        },
      });
    },
    { dependencies: [selectedId], scope: containerRef }
  );

  const selectedImage = images.find((img) => img.id === selectedId);

  return (
    <div className="gallery-wrapper" ref={containerRef}>
      <div className="gallery-header">
        <h2>Premium Footwear</h2>
        <p>Select a product to view details</p>
      </div>

      <div className="gallery-content">
        {/* FEATURED SECTION */}
        <div className={`featured-container ${selectedId ? "active" : ""}`}>
          {selectedImage && (
            <div
              className="image-card featured"
              data-flip-id={selectedImage.id}
              onClick={() => toggleSelect(selectedImage.id)}
            >
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="card-info">
                <h3>{selectedImage.title}</h3>
                <span>{selectedImage.category}</span>
              </div>
            </div>
          )}
        </div>

        {/* GRID SECTION */}
        <div className="gallery-grid">
          {images.map((img) =>
            img.id === selectedId ? null : (
              <div
                key={img.id}
                className="image-card"
                data-flip-id={img.id}
                onClick={() => toggleSelect(img.id)}
              >
                <img src={img.url} alt={img.title} />
                <div className="card-overlay">
                  <h4>{img.title}</h4>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

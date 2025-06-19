import React, { useEffect, useState, useRef } from 'react';
import './slideshow.css';

export interface SlideshowImage {
  full: string;
  alt?: string;
}

interface SlideshowProps {
  images: SlideshowImage[];
  interval?: number; // ms
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shuffled, setShuffled] = useState<SlideshowImage[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setShuffled(shuffleArray(images));
  }, [images]);

  useEffect(() => {
    if (!paused && shuffled.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % shuffled.length);
      }, interval);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused, shuffled, interval]);

  if (shuffled.length === 0) return null;

  return (
    <div className="slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slideshow-image-wrapper">
        {shuffled.map((img, idx) => (
          <img
            key={img.full}
            src={img.full}
            alt={img.alt || `Slideshow image ${idx + 1}`}
            className={`slideshow-image${idx === current ? ' active' : ''}`}
            style={{ display: idx === current ? 'block' : 'none' }}
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

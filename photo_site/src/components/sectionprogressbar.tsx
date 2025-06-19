import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'film', label: '35mm Film' },
  { id: 'beach', label: 'Beach' },
  { id: 'graduation', label: 'Graduation' },
  { id: 'sports', label: 'Sports' },
  { id: 'studio', label: 'Studio' },
  { id: 'wedding', label: 'Wedding' },
];

const SectionProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = sections.length;
      let idx = 0;
      for (let i = 0; i < total; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            idx = i;
          }
        }
      }
      setProgress(idx / (total - 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '6px',
      height: '100vh',
      background: '#F8D7D0',
      zIndex: 9999,
    }}>
      <div style={{
        width: '100%',
        height: `${progress * 100}%`,
        background: '#E07A5F',
        transition: 'height 0.2s',
      }} />
    </div>
  );
};

export default SectionProgressBar;

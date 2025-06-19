import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'film', label: '35mm Film' },
  { id: 'beach', label: 'Beach' },
  { id: 'graduation', label: 'Graduation' },
  { id: 'sports', label: 'Sports' },
  { id: 'studio', label: 'Studio' },
  { id: 'wedding', label: 'Wedding' },
];

const StickySectionNav: React.FC = () => {
  const [active, setActive] = useState('film');

  useEffect(() => {
    const handleScroll = () => {
      let found = 'film';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 90) { // offset for top navbar height
            found = section.id;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80; // offset for sticky nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={{
      fontFamily: 'Belgiano Serif, serif', // match main navbar font
      position: 'sticky',
      top: 80, // offset for top navbar height
      background: 'rgba(255,255,255,0.95)',
      zIndex: 10,
      display: 'flex',
      gap: '1.5rem',
      padding: '0.5rem 1rem',
      borderBottom: '1px solid #F8D7D0',
      justifyContent: 'center',
      marginBottom: '2rem',
      minWidth: 0,
      width: 'fit-content',
      maxWidth: '100vw',
      alignItems: 'center',
      borderRadius: '0 0 12px 12px',
      boxShadow: '0 2px 8px rgba(60,60,60,0.04)',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          style={{
            color: active === section.id ? '#E07A5F' : '#3D405B',
            fontWeight: active === section.id ? 700 : 500,
            borderBottom: active === section.id ? '2px solid #E07A5F' : '2px solid transparent',
            padding: '0.25rem 0.5rem',
            background: 'none',
            border: 'none',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.2s, border 0.2s',
            cursor: 'pointer',
            minWidth: 0,
          }}
        >
          {section.label}
        </button>
      ))}
      <button
        onClick={scrollToTop}
        style={{
          background: '#F8D7D0',
          color: '#E07A5F',
          border: 'none',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          marginLeft: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(60,60,60,0.04)',
        }}
      >
        Top
      </button>
    </nav>
  );
};

export default StickySectionNav;

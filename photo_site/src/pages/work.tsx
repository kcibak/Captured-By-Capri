import React from 'react';

const sectionStyle: React.CSSProperties = {
  margin: '4rem 0',
  padding: '2rem 0',
  borderBottom: '1px solid #F8D7D0',
};

const Work: React.FC = () => (
  <div>
    <h1 style={{ fontFamily: 'Belgiano Serif, serif', fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>
      Photography Work
    </h1>
    <section id="film" style={sectionStyle}>
      <h2>35mm Film</h2>
      {/* 35mm Film gallery or content here */}
    </section>
    <section id="beach" style={sectionStyle}>
      <h2>Beach</h2>
      {/* Beach gallery or content here */}
    </section>
    <section id="graduation" style={sectionStyle}>
      <h2>Graduation</h2>
      {/* Graduation gallery or content here */}
    </section>
    <section id="sports" style={sectionStyle}>
      <h2>Sports</h2>
      {/* Sports gallery or content here */}
    </section>
    <section id="studio" style={sectionStyle}>
      <h2>Studio</h2>
      {/* Studio gallery or content here */}
    </section>
    <section id="wedding" style={sectionStyle}>
      <h2>Wedding</h2>
      {/* Wedding gallery or content here */}
    </section>
  </div>
);

export default Work;

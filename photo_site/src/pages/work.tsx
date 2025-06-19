import React from 'react';
import Gallery from '../components/gallery';
import { filmImages, graduationImages, weddingImages } from '../components/galleryImages';
import StickySectionNav from '../components/stickysectionnav';
import '../styles/workSections.css';

const sectionStyle: React.CSSProperties = {
  margin: '4rem 0',
  padding: '2rem 0',
  borderBottom: '1px solid #F8D7D0',
};

const Work: React.FC = () => (
  <div>
    <h1 style={{ fontFamily: 'Belgiano Serif, serif', fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center', marginTop: '6.5rem' }}>
      Photography Work
    </h1>
    <StickySectionNav />
    <section id="film" className="work-section" style={sectionStyle}>
      <Gallery title="35mm Film" images={filmImages} />
    </section>
    <section id="beach" className="work-section alt" style={sectionStyle}>
      <h2 className="gallery-section-title">Beach</h2>
      {/* Beach gallery or content here */}
    </section>
    <section id="graduation" className="work-section" style={sectionStyle}>
      <Gallery title="Graduation" images={graduationImages} />
    </section>
    <section id="sports" className="work-section alt" style={sectionStyle}>
      <h2 className="gallery-section-title">Sports</h2>
      {/* Sports gallery or content here */}
    </section>
    <section id="studio" className="work-section" style={sectionStyle}>
      <h2 className="gallery-section-title">Studio</h2>
      {/* Studio gallery or content here */}
    </section>
    <section id="wedding" className="work-section alt" style={sectionStyle}>
      <Gallery title="Wedding" images={weddingImages} />
    </section>
  </div>
);

export default Work;

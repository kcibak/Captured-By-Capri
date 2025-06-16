import React from 'react';
import { MainLayout } from '../components/mainlayout';

const Home = () => (
  <MainLayout>
    <h1 style={{ textAlign: 'center', fontFamily: 'Belgiano Serif, serif', fontSize: '2.5rem', margin: '3rem 0 2rem' }}>
      Hi, I’m Capri Procopio!
    </h1>
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', height: 400, background: '#F8D7D0', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#3A4D44', boxShadow: '0 4px 24px rgba(60,60,60,0.08)' }}>
      {/* Slideshow placeholder */}
      Slideshow goes here
    </div>
  </MainLayout>
);

export default Home;

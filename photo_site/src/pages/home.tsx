import { MainLayout } from '../components/mainlayout';
import { filmImages } from '../components/galleryImages';
import Slideshow from '../components/slideshow';

const allSlideshowImages = filmImages.map(img => ({ full: img.full, alt: img.full.split('/').pop() }));

const Home = () => (
  <MainLayout>
    <div style={{ width: '100vw', maxWidth: 1600, height: '65vh', margin: '1rem auto 0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'none', boxShadow: 'none', borderRadius: 0, padding: 0 }}>
      <Slideshow images={allSlideshowImages} interval={4000} />
    </div>
  </MainLayout>
);

export default Home;

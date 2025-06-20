import { ThemeProvider } from './components/themeprovider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Work from './pages/work';
import About from './pages/about';
import Contact from './pages/contact';
import { MainLayout } from './components/mainlayout';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

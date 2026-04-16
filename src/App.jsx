import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import BottomSection from './components/BottomSection';

export default function App() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Projects />
      <BottomSection />
    </div>
  );
}

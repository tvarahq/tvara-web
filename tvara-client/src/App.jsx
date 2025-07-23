import './App.css'
import About from './components/AboutSection'
import CTA from './components/CTA'
import Features from './components/Features'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
      <About />
      <Features />
      <CTA />
      <Footer />
    </>
  )
}

export default App

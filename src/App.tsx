import AmbientBackground from './Components/AmbientBackground'
import Hero from './Components/Hero'
import './App.css'
import Navbar from './Components/ui/Navabar'
import Arcade from './Components/Arcade'
import Experience from './Components/Experience'
import Education from './Components/Education'
import Stack from './Components/Stack'
import Projects from './Components/Projects'
import Websites from './Components/Websites'
import Contact from './Components/Contact'
import Footer from './Components/Footer'

function App() {
  const isContactPage = window.location.pathname === '/contact'

  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground />
      <Navbar />
      {isContactPage ? (
        <Contact />
      ) : (
        <>
          <Hero />
          <Projects />
          <Experience />
          <Education />
          <Stack />
          <Arcade />
          <Websites />
          <Contact embedded />
        </>
      )}
      <Footer />
    </div>
  )
}

export default App

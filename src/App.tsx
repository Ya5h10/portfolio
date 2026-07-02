import Hero from './Components/Hero'
import './App.css'
import Navbar from './Components/ui/Navabar'
import About from './Components/About'
import Projects from './Components/Projects'
import Websites from './Components/Websites'
import Contact from './Components/Contact'
import Footer from './Components/Footer'

function App() {
  const isContactPage = window.location.pathname === '/contact'

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar/>
    {isContactPage ? (
      <Contact/>
    ) : (
      <>
      <Hero/>
      <About/>
      <Projects/>
      <Websites/>
      </>
    )}
    <Footer />
    </div>

  )
}

export default App

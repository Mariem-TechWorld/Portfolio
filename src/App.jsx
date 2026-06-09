import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import AnimatedBackground from "./components/Background"
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Footer from "./components/Footer"

function App() {
  return (
    <HelmetProvider>
      <div className="pointer-events-none">
        <AnimatedBackground />
      </div>
      <BrowserRouter>
        <Navbar />
        <Home />
        <About />
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
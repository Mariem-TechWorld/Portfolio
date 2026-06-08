import AnimatedBackground from "./components/Background"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SocialLinks from "./components/SocialLinks"

function App() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '2rem'
      }}>
        <div style={{ width: '400px' }}>
          <SocialLinks />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
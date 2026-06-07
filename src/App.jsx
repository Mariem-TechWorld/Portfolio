import AnimatedBackground from "./components/Background"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

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
        color: 'white',
        fontSize: '2rem',
        fontFamily: 'sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
        ✅ Footer test
      </div>
      <Footer />
    </>
  )
}

export default App
import AnimatedBackground from "./components/Background"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CommentSection from "./components/Comment"
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
        <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1100px' }}>
          <div style={{ flex: 1 }}>
            <SocialLinks />
          </div>
          <div style={{ flex: 1 }}>
            <CommentSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
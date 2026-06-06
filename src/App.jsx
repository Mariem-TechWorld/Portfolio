import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [status, setStatus] = useState('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('count')
        
        if (error) {
          setStatus(`❌ Error: ${error.message}`)
        } else {
          setStatus('✅ Supabase connected successfully!')
        }
      } catch (err) {
        setStatus(`❌ Failed: ${err.message}`)
      }
    }
    testConnection()
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#030014', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontFamily: 'sans-serif'
    }}>
      {status}
    </div>
  )
}

export default App
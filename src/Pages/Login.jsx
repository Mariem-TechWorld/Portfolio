import { useState, useEffect, useRef } from 'react'
import { supabase } from "../supabase"
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Shield, Eye, EyeOff } from 'lucide-react'

const ParticleCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '6, 182, 212' : '99, 102, 241',
    }))

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.fill()
      })

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = texts[index]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
        return () => clearTimeout(t)
      } else {
        setIndex((index + 1) % texts.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, index])

  return (
    <span className="text-cyan-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setMounted(true), 100)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); setLoading(false); return }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    console.log('Profile:', profile, 'Error:', profileError)

    if (profileError || profile?.role !== 'admin') {
      alert('Access denied')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#020818] flex items-center justify-center px-4 relative overflow-hidden">

      <ParticleCanvas />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f06_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f06_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        <div className="flex items-center justify-center mb-6 gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 text-xs font-mono">Admin Portal</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse" />
          <div className="relative bg-[#080d1a]/95 backdrop-blur-xl border border-cyan-500/15 rounded-2xl overflow-hidden">

            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="p-8 space-y-6">

              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#0d1829] to-[#020818] border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                      <Shield className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white font-mono">
                  <TypewriterText texts={["Secure Access", "Admin Login", "Zero Trust Auth"]} />
                </h1>
                <p className="text-gray-500 text-xs font-mono">
                  myriam<span className="text-cyan-500/50">@</span>cloud-infrastructure<span className="text-cyan-500/50">:~$</span>
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">Email</label>
                  <div className="group flex items-center bg-[#020818]/60 border border-white/8 rounded-xl overflow-hidden focus-within:border-cyan-500/40 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="flex items-center justify-center w-11 h-11 shrink-0 border-r border-white/5">
                      <Mail className="w-4 h-4 text-gray-600 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      placeholder="admin@domain.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent px-3 py-3 text-gray-200 placeholder-gray-700 text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">Password</label>
                  <div className="group flex items-center bg-[#020818]/60 border border-white/8 rounded-xl overflow-hidden focus-within:border-cyan-500/40 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="flex items-center justify-center w-11 h-11 shrink-0 border-r border-white/5">
                      <Lock className="w-4 h-4 text-gray-600 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent px-3 py-3 text-gray-200 placeholder-gray-700 text-sm outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="mr-3 shrink-0 text-gray-600 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="relative group/btn w-full mt-2">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl opacity-50 blur-sm group-hover/btn:opacity-80 transition-all duration-300" />
                  <div className="relative h-12 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 rounded-xl border border-cyan-500/25 flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
                        <span className="text-cyan-300 text-sm font-mono">authenticating...</span>
                      </div>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 text-cyan-300 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                        <span className="text-sm font-semibold text-white font-mono tracking-wide">Sign In</span>
                      </>
                    )}
                  </div>
                </button>
              </form>

            </div>

            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          </div>
        </div>

        <p className="text-center text-gray-700 text-[11px] font-mono mt-5">
          Unauthorized access is monitored and logged.
        </p>

      </div>
    </div>
  )
}

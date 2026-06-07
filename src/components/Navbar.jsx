import React, { useState, useEffect } from "react"
import { Menu, X, Code2 } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Projects" },
    { href: "#Contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map(item => {
        const section = document.querySelector(item.href)
        if (section) {
          return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop - 550,
            height: section.offsetHeight,
          }
        }
        return null
      }).filter(Boolean)

      const currentPosition = window.scrollY
      const active = sections.find(section =>
        currentPosition >= section.offset &&
        currentPosition < section.offset + section.height
      )
      if (active) setActiveSection(active.id)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      window.scrollTo({ top: section.offsetTop - 100, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isOpen ? "bg-[#020818]" : scrolled ? "bg-[#020818]/50 backdrop-blur-xl border-b border-cyan-500/10" : "bg-transparent"}`}>
      <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">

          <a href="#Home" onClick={(e) => scrollToSection(e, "#Home")} className="flex items-center gap-2 text-xl font-bold">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-mono">myriam:~$</span>
          </a>

          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={(e) => scrollToSection(e, item.href)} className="group relative px-1 py-2 text-sm font-medium">
                  <span className={`relative z-10 transition-colors duration-300 ${activeSection === item.href.substring(1) ? "bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-semibold" : "text-gray-300 group-hover:text-white"}`}>
                    {item.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400 transform origin-left transition-transform duration-300 ${activeSection === item.href.substring(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`relative p-2 text-gray-300 hover:text-white transition-transform duration-300 ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"}`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 py-6 space-y-4 border-t border-cyan-500/10">
          {navItems.map((item, index) => (
            <a key={item.label} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
              className={`block px-4 py-3 text-lg font-medium transition-all duration-300 font-mono ${activeSection === item.href.substring(1) ? "bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-semibold" : "text-gray-300 hover:text-white"}`}
              style={{ transitionDelay: `${index * 100}ms`, transform: isOpen ? "translateX(0)" : "translateX(50px)", opacity: isOpen ? 1 : 0 }}
            >
              <span className="text-cyan-500 mr-2">~/</span>{item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
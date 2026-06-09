import React, { useState } from 'react'
import { X, ExternalLink, ArrowRight } from 'lucide-react'

const ProjectCardModal = ({ title, description, link }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 text-white/90 transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm font-mono">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020818]/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#0d1829] border border-cyan-500/20 p-6 text-white shadow-2xl shadow-cyan-500/10 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 rounded-lg p-2 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
            <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-mono">
              {title}
            </h2>
            <p className="mb-6 text-gray-400 leading-relaxed">{description}</p>
            <div className="flex justify-end space-x-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 px-4 py-2 font-medium hover:from-cyan-500/30 hover:to-indigo-500/30 transition-all duration-200 text-cyan-300 font-mono text-sm"
              >
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
              <button
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 font-medium hover:bg-white/10 transition-all duration-200 text-gray-300 font-mono text-sm"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCardModal

import React from "react"
import { Link } from "react-router-dom"
import { ExternalLink, ArrowRight } from "lucide-react"
import { toSlug } from "../utils/slug"

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault()
      alert("Live demo link is not available")
    }
  }

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover aspect-[16/8] transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-200 via-indigo-200 to-emerald-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium font-mono">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm font-mono">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${toSlug(Title)}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 text-white/90 border border-transparent hover:border-cyan-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-sm font-medium font-mono">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm font-mono">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/30 rounded-xl transition-colors duration-300 -z-50" />
        </div>
      </div>
    </div>
  )
}

export default CardProject

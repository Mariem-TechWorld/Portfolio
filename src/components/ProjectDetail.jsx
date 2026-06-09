import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react"
import Swal from "sweetalert2"
import { toSlug } from "../utils/slug"

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
}

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"]
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-cyan-600/10 to-indigo-600/10 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-cyan-300/90 group-hover:text-cyan-200 transition-colors font-mono">
          {tech}
        </span>
      </div>
    </div>
  )
}

const FeatureItem = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-emerald-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
      {feature}
    </span>
  </li>
)

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0
  const featuresCount = project?.Features?.length || 0

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 opacity-50 blur-2xl z-0" />
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-cyan-500/20 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50">
        <div className="bg-cyan-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-cyan-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-cyan-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400 font-mono">Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-emerald-500/20 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50">
        <div className="bg-emerald-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-emerald-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-emerald-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400 font-mono">Key Features</div>
        </div>
      </div>
    </div>
  )
}

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Repository is Private",
      text: "This project's source code is not publicly available.",
      confirmButtonText: "Understood",
      confirmButtonColor: "#06b6d4",
      background: "#020818",
      color: "#ffffff",
    })
    return false
  }
  return true
}

const ProjectDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || []
    const selectedProject = storedProjects.find(
      (p) => toSlug(p.Title) === slug
    )
    if (selectedProject) {
      setProject({
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/Mariem-TechWorld",
      })
    }
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020818] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white font-mono">
            Loading Project...
          </h2>
        </div>
      </div>
    )
  }

  const projectUrl = `https://mariem.is-a.dev/project/${toSlug(project.Title)}`

  return (
    <>
      <Helmet>
        <title>{project.Title} — Mariem | Cloud & DevSecOps Engineer</title>
        <meta name="description" content={project.Description ? project.Description.slice(0, 155) : `Project ${project.Title} by Mariem — Cloud Infrastructure & DevSecOps Engineer.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={projectUrl} />
        <meta property="og:title" content={`${project.Title} — Mariem`} />
        <meta property="og:description" content={project.Description?.slice(0, 155)} />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:type" content="website" />
        {project.Img && <meta property="og:image" content={project.Img} />}
      </Helmet>

      <div className="min-h-screen bg-[#020818] px-[2%] sm:px-0 relative overflow-hidden">
        <div className="fixed inset-0">
          <div className="absolute -inset-[10px] opacity-20">
            <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-cyan-500/10 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 text-sm md:text-base font-mono"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50 font-mono">
                <span>~/projects</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-cyan-400 truncate">{project.Title}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-indigo-200 to-emerald-200 bg-clip-text text-transparent leading-tight">
                    {project.Title}
                  </h1>
                  <div className="relative h-1 w-16 md:w-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-sm" />
                  </div>
                </div>

                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project.Description}
                </p>

                <ProjectStats project={project} />

                <div className="flex flex-wrap gap-3 md:gap-4">
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-cyan-600/10 to-indigo-600/10 hover:from-cyan-600/20 hover:to-indigo-600/20 text-cyan-300 rounded-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium font-mono">Live Demo</span>
                  </a>
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-indigo-600/10 to-emerald-600/10 hover:from-indigo-600/20 hover:to-emerald-600/20 text-indigo-300 rounded-xl transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                  >
                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium font-mono">GitHub</span>
                  </a>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-2 md:gap-3 font-mono">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                    Technologies Used
                  </h3>
                  {project.TechStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.TechStack.map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                  )}
                </div>
              </div>

              <div className="space-y-6 md:space-y-10">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020818] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-cyan-500/20 transition-colors duration-300 rounded-2xl" />
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-cyan-500/20 transition-colors duration-300 group">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3 font-mono">
                    <Star className="w-5 h-5 text-cyan-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                    Key Features
                  </h3>
                  {project.Features.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {project.Features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 opacity-50">No features added.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 10s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    </>
  )
}

export default ProjectDetails

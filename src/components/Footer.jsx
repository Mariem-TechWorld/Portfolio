const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
        <hr className="my-3 border-cyan-500/10 sm:mx-auto lg:my-6" />
        <div className="pb-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-mono text-cyan-500/50">
            ~/infrastructure $ <span className="text-emerald-400">echo</span> "built with precision"
          </span>
          <span className="text-sm text-gray-500">
            © {currentYear}{" "}
            <a href="https://mariem.is-a.dev" className="text-cyan-400/70 hover:text-cyan-400 transition-colors hover:underline">
              Mariem
            </a>
            {" "}— Cloud & DevSecOps Engineer. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
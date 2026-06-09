import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#020818] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-4 animate-bounce font-mono">
            404
          </h1>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-200 mb-4 font-mono">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            This page doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mb-6">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 font-mono"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-mono"
          >
            <Home size={20} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

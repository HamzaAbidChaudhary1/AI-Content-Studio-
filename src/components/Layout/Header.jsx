// src/components/Layout/Header.jsx
import React from 'react';

const Header = ({ showInputForm, setShowInputForm }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 sticky top-0 z-50 shadow-xl backdrop-blur-lg bg-opacity-90">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600/10 to-purple-600/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">AI Content Studio</h1>
              <p className="text-xs text-sky-300">Professional Content Generation Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Pricing</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors text-sm font-medium">About</a>
            <button 
              onClick={() => setShowInputForm(!showInputForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 font-semibold text-sm transition-all transform hover:scale-105 shadow-lg"
            >
              {showInputForm ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Close</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Content</span>
                </>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

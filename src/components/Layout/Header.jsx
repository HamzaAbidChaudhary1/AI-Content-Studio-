import React from 'react';

const Header = ({ showInputForm, setShowInputForm }) => {
  return (
    <header className="bg-gray-900 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold">AI Content Studio</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowInputForm(!showInputForm)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 font-semibold text-sm transition-colors"
            >
              {showInputForm ? 'Hide Panel' : 'New Content'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

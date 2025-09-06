import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h2 className="text-xl font-semibold text-slate-700">AI is crafting your content...</h2>
      <p className="text-slate-500 mt-2">Analyzing sources, writing copy, and generating visuals.</p>
    </div>
  );
};

export default LoadingSpinner;

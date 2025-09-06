import React from 'react';

const SourceArticleCard = ({ article }) => {
  const safeArticle = article || {};
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-800 mb-2">Source Article</h3>
        {safeArticle.url && (
          <a 
            href={safeArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-800 text-sm font-semibold"
          >
            Read Original
          </a>
        )}
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-700">{safeArticle.title || "No title"}</h4>
        <p className="text-sm text-slate-600">{safeArticle.description || "No summary"}</p>
      </div>
    </div>
  );
};

export default SourceArticleCard;

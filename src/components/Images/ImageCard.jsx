import React from 'react';

const ImageCard = ({ image, onApprove, onReject, isProcessing }) => {
  const isApproved = image.status === "approved";
  const isRejected = image.status === "rejected";
  
  return (
    <div className={`image-card shadow-sm border border-slate-200 rounded-xl overflow-hidden ${
      isApproved ? "approved" : ""
    } ${isRejected ? "rejected" : ""}`}>
      <div className="relative">
        <img 
          src={image.url}
          alt={image.altDescription || image.prompt}
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            isRejected ? "opacity-50" : ""
          }`}
        />
        {isApproved && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white">
        <p className="text-sm text-slate-700 line-clamp-2 h-10">
          {image.altDescription || image.prompt}
        </p>
        {image.source === "unsplash" && image.photographer && (
          <div className="text-xs text-slate-500 mt-1">Photo by {image.photographer}</div>
        )}
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => onApprove(image.id)}
            disabled={isProcessing || isApproved}
            className="flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors bg-slate-100 text-slate-700 hover:bg-green-100 hover:text-green-800 disabled:opacity-50"
          >
            Approve
          </button>
          <button 
            onClick={() => onReject(image.id)}
            disabled={isProcessing || isRejected}
            className="flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-800 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

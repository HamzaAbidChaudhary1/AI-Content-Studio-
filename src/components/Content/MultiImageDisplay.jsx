import React from 'react';
import ImageCard from '../Images/ImageCard';

const MultiImageDisplay = ({ imageData, onImageAction, isProcessing }) => {
  const realWorldImages = imageData?.realWorldImages || [];
  const aiGeneratedImage = imageData?.aiGeneratedImage;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl text-slate-800">Visual Selection</h3>
        <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-semibold">
          {realWorldImages.length + (aiGeneratedImage ? 1 : 0)} Options
        </span>
      </div>
      
      <div className="space-y-8">
        {realWorldImages.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-slate-700 mb-4">
              Real World Images <span className="text-sm font-medium text-slate-500">(from Unsplash)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realWorldImages.map((image) => (
                <ImageCard 
                  key={image.id}
                  image={image}
                  onApprove={(id) => onImageAction("approve", id, "realWorld")}
                  onReject={(id) => onImageAction("reject", id, "realWorld")}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          </div>
        )}
        
        {aiGeneratedImage && (
          <div>
            <h4 className="text-lg font-semibold text-slate-700 mb-4">
              AI Generated Image <span className="text-sm font-medium text-slate-500">(from AI)</span>
            </h4>
            <div className="max-w-md">
              <ImageCard 
                image={aiGeneratedImage}
                onApprove={(id) => onImageAction("approve", id, "aiGenerated")}
                onReject={(id) => onImageAction("reject", id, "aiGenerated")}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageDisplay;

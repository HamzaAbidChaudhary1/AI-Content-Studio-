import React, { useState, useEffect } from 'react';
import { INDUSTRIES } from '../../config/constants';

const UserInputForm = ({ userInputs, setUserInputs, onGenerate, isGenerating }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(userInputs.industry && userInputs.prompt.trim().length >= 10);
  }, [userInputs]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
      <h3 className="font-bold text-xl text-slate-800 mb-2">Create New Content</h3>
      <p className="text-sm text-slate-500 mb-6">
        Provide a theme and our AI will research, write, and find matching visuals.
      </p>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Industry Focus <span className="text-red-500">*</span>
          </label>
          <select 
            value={userInputs.industry}
            onChange={(e) => setUserInputs(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
          >
            {INDUSTRIES.map(industry => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Content Theme / Prompt <span className="text-red-500">*</span>
          </label>
          <textarea 
            value={userInputs.prompt}
            onChange={(e) => setUserInputs(prev => ({ ...prev, prompt: e.target.value }))}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
            rows={4}
            placeholder="e.g., 'The impact of generative AI on B2B marketing strategies'"
          />
        </div>
        
        <div className="pt-4 border-t border-slate-200">
          <button 
            onClick={onGenerate}
            disabled={!isFormValid || isGenerating}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
              isFormValid && !isGenerating 
                ? "bg-sky-500 text-white hover:bg-sky-600 shadow-sm hover:shadow-md" 
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Content & Images'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInputForm;

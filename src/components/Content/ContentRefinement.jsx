import React, { useState } from 'react';

const ContentRefinement = ({ onRefine, isRefining, conversationHistory }) => {
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (refinementPrompt.trim() && !isRefining) {
      onRefine(refinementPrompt);
      setRefinementPrompt('');
    }
  };

  const suggestionPrompts = [
    "Make it more conversational and engaging",
    "Add relevant statistics and data points",
    "Shorten the LinkedIn post to be more concise",
    "Make the tone more professional",
    "Add a stronger call-to-action",
    "Focus more on ROI and business value",
    "Make it more storytelling-oriented",
    "Add emojis for better engagement"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-800">Refine Your Content</h3>
        {conversationHistory.length > 1 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-sky-600 hover:text-sky-700 font-medium"
          >
            {showHistory ? 'Hide' : 'Show'} History ({conversationHistory.length - 1} refinements)
          </button>
        )}
      </div>

      {/* Revision History */}
      {showHistory && conversationHistory.length > 1 && (
        <div className="mb-6 bg-slate-50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <h4 className="font-semibold text-slate-700 mb-3 text-sm">Revision History</h4>
          <div className="space-y-2">
            {conversationHistory.map((item, idx) => (
              <div key={idx} className="text-sm border-l-2 border-sky-300 pl-3">
                <div className="font-medium text-slate-700">
                  {item.type === 'initial' ? '🚀 Initial Generation' : `✏️ Revision ${idx}`}
                </div>
                <div className="text-slate-600 mt-1">{item.prompt}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refinement Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            How would you like to improve this content?
          </label>
          <textarea
            value={refinementPrompt}
            onChange={(e) => setRefinementPrompt(e.target.value)}
            placeholder="E.g., 'Make it more casual', 'Add statistics', 'Focus more on ROI', 'Shorten the LinkedIn post'..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 resize-none"
            rows={3}
            disabled={isRefining}
          />
        </div>

        {/* Suggestion Pills */}
        <div className="flex flex-wrap gap-2">
          {suggestionPrompts.slice(0, 4).map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setRefinementPrompt(suggestion)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors"
              disabled={isRefining}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isRefining || !refinementPrompt.trim()}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
            isRefining || !refinementPrompt.trim()
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm hover:shadow-md'
          }`}
        >
          {isRefining ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Refining Content...
            </span>
          ) : (
            'Refine Content'
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
        <h4 className="text-sm font-semibold text-sky-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-sky-700 space-y-1">
          <li>• Be specific about what you want to change</li>
          <li>• You can refine multiple times until perfect</li>
          <li>• Try different tones: professional, casual, urgent</li>
          <li>• Ask for platform-specific optimizations</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentRefinement;

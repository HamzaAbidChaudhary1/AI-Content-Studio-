import React, { useState } from 'react';

const ContentEditor = ({ editedContent, setEditedContent, isEditing, handleEditMode, twitterContent }) => {
  const [activeTab, setActiveTab] = useState('linkedin');
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg text-slate-800">Generated Content</h3>
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'linkedin' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              LinkedIn
            </button>
            <button
              onClick={() => setActiveTab('twitter')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'twitter' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              Twitter/X
            </button>
          </div>
        </div>
        <button 
          onClick={handleEditMode}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            isEditing ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      {activeTab === 'linkedin' ? (
        // LinkedIn Content
        isEditing ? (
          <div className="space-y-4">
            <textarea 
              value={editedContent.postText}
              onChange={(e) => setEditedContent(prev => ({ ...prev, postText: e.target.value }))}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
              rows={15}
            />
            <input 
              type="text"
              value={editedContent.hashtags}
              onChange={(e) => setEditedContent(prev => ({ ...prev, hashtags: e.target.value }))}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
              placeholder="Hashtags"
            />
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="space-y-3 prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-slate-800">{editedContent.postText}</p>
              <p className="font-semibold text-sky-600">{editedContent.hashtags}</p>
            </div>
          </div>
        )
      ) : (
        // Twitter Content
        <div className="space-y-3">
          {twitterContent?.thread?.map((tweet, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-slate-500 mt-1">{tweet.position}/</span>
                <p className="text-slate-800 flex-1">{tweet.tweet}</p>
              </div>
            </div>
          )) || <p className="text-slate-500">No Twitter content generated</p>}
          {twitterContent?.hashtags && (
            <p className="font-semibold text-sky-600 text-sm">{twitterContent.hashtags}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;

import React, { useState } from 'react';

const ContentEditor = ({ 
  editedContent, 
  setEditedContent, 
  isEditing, 
  handleEditMode, 
  twitterContent,
  linkedinContent 
}) => {
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
                activeTab === 'linkedin' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              LinkedIn
            </button>
            <button
              onClick={() => setActiveTab('twitter')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'twitter' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Twitter/X
            </button>
          </div>
        </div>
        <button 
          onClick={handleEditMode}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            isEditing 
              ? "bg-sky-500 text-white hover:bg-sky-600" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      <div className="h-[400px] overflow-y-auto">
        {activeTab === 'linkedin' ? (
          // LinkedIn Content
          isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn Post</label>
                <textarea 
                  value={editedContent.postText}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, postText: e.target.value }))}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  rows={12}
                  placeholder="Enter your LinkedIn post content..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hashtags</label>
                <input 
                  type="text"
                  value={editedContent.hashtags}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, hashtags: e.target.value }))}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  placeholder="#Hashtags #Separated #BySpaces"
                />
              </div>
              {linkedinContent?.callToAction && (
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-sky-800">Call to Action:</p>
                  <p className="text-sm text-sky-700">{linkedinContent.callToAction}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                    {editedContent.postText || linkedinContent?.post || "No LinkedIn content generated yet"}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sky-600">
                  {editedContent.hashtags || linkedinContent?.hashtags || ""}
                </p>
              </div>
              {linkedinContent?.estimatedReach && (
                <div className="flex gap-4 text-sm text-slate-600">
                  <span>📊 Estimated Reach: <strong className="text-slate-800">{linkedinContent.estimatedReach}</strong></span>
                  <span>⏱️ Reading Time: <strong className="text-slate-800">{linkedinContent.readingTime}</strong></span>
                </div>
              )}
            </div>
          )
        ) : (
          // Twitter Content
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-2">
                  Edit each tweet in the thread (max 280 characters each)
                </p>
                {editedContent.twitterThread?.map((tweet, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Tweet {index + 1}/{editedContent.twitterThread.length}
                    </label>
                    <textarea
                      value={tweet.tweet}
                      onChange={(e) => {
                        const newThread = [...editedContent.twitterThread];
                        newThread[index] = { ...tweet, tweet: e.target.value };
                        setEditedContent(prev => ({ ...prev, twitterThread: newThread }));
                      }}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                      rows={3}
                      maxLength={280}
                    />
                    <div className="text-xs text-slate-500 text-right">
                      {tweet.tweet.length}/280 characters
                    </div>
                  </div>
                )) || <p className="text-slate-500">No Twitter thread generated</p>}
              </div>
            ) : (
              <>
                {twitterContent?.thread?.map((tweet, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-slate-500 mt-1 bg-white px-2 py-1 rounded">
                        {tweet.position}/{twitterContent.thread.length}
                      </span>
                      <p className="text-slate-800 flex-1 leading-relaxed">{tweet.tweet}</p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>No Twitter thread generated yet</p>
                  </div>
                )}
                {twitterContent?.hashtags && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="font-semibold text-sky-600 text-sm">
                      {twitterContent.hashtags}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;

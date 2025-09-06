import React, { useState } from 'react';
import Header from './components/Layout/Header';
import UserInputForm from './components/Content/UserInputForm';
import ContentEditor from './components/Content/ContentEditor';
import SourceArticleCard from './components/Content/SourceArticleCard';
import MultiImageDisplay from './components/Content/MultiImageDisplay';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { generateContent, approveContent } from './services/n8n';

// Icons as components
const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 15.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 18l-1.035-.259a3.375 3.375 0 00-2.456-2.456L18 14.25l-.259 1.035a3.375 3.375 0 00-2.455 2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035-.259a3.375 3.375 0 00-2.456-2.456z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
  </svg>
);

function App() {
  const [currentContent, setCurrentContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);
  const [editedContent, setEditedContent] = useState({ postText: "", hashtags: "" });
  const [userInputs, setUserInputs] = useState({ 
    industry: "technology", 
    prompt: "", 
    contentAge: "3" 
  });

  const handleGenerateContent = async () => {
    if (!userInputs.industry || userInputs.prompt.trim().length < 10) return;
    
    setIsGenerating(true);
    setCurrentContent(null);

    try {
      const result = await generateContent(userInputs);
      setCurrentContent(result);
      setEditedContent({
        postText: result.content.linkedin.post,
        hashtags: result.content.linkedin.hashtags
      });
      setShowInputForm(false);
    } catch (error) {
      console.error('Error generating content:', error);
      alert(`Generation failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageAction = async (action, imageId, category) => {
    setIsImageProcessing(true);
    
    try {
      await approveContent({
        action: action === "approve" ? "approve_image" : "reject_image",
        data: { imageId, imageType: category }
      });

      setCurrentContent(prev => {
        const updated = JSON.parse(JSON.stringify(prev));
        const newStatus = action === "approve" ? "approved" : "rejected";
        
        if (category === "realWorld") {
          updated.imageData.realWorldImages = updated.imageData.realWorldImages.map(img => 
            img.id === imageId ? { ...img, status: newStatus } : img
          );
        } else if (category === "aiGenerated" && updated.imageData.aiGeneratedImage) {
          updated.imageData.aiGeneratedImage.status = newStatus;
        }
        
        return updated;
      });
    } catch (error) {
      console.error('Error processing image action:', error);
    } finally {
      setIsImageProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showInputForm={showInputForm} setShowInputForm={setShowInputForm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showInputForm && (
          <div className="animate-slide-up">
            <UserInputForm 
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              onGenerate={handleGenerateContent}
              isGenerating={isGenerating}
            />
          </div>
        )}
        
        {isGenerating && <LoadingSpinner />}
        
        {currentContent && !isGenerating && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SourceArticleCard article={currentContent.sourceArticle} />
              <ContentEditor 
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                isEditing={isEditing}
                handleEditMode={() => setIsEditing(!isEditing)}
              />
            </div>
            
            <MultiImageDisplay 
              imageData={currentContent.imageData}
              onImageAction={handleImageAction}
              isProcessing={isImageProcessing}
            />
            
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="font-bold text-2xl mb-4">Ready to Launch Your Content? 🚀</h3>
              <p className="text-sky-100 mb-6">Your AI-crafted content is ready for the world. Choose your action:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-4 bg-white text-sky-600 rounded-xl hover:bg-sky-50 font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                  <CheckIcon className="inline mr-2" />
                  Publish to All Platforms
                </button>
                <button className="px-6 py-4 bg-sky-800/50 backdrop-blur text-white rounded-xl hover:bg-sky-800/70 font-semibold transition-all border border-sky-400/30">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        )}
        
        {!currentContent && !isGenerating && !showInputForm && (
          <>
            {/* Hero Section - FIXED GRADIENT */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-slate-900 to-sky-900 rounded-3xl p-12 md:p-16 mb-16 text-white overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                    <SparklesIcon />
                    <span className="text-sm font-bold text-sky-100 uppercase tracking-wider">AI-Powered Content Engine</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white leading-tight">
                    Content That Converts,<br />
                    <span className="text-sky-400">In Seconds</span>
                  </h1>
                  
                  <p className="text-xl sm:text-2xl text-sky-100 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
                    Harness the power of GPT-4, real-time web research, and smart image curation to create viral social media content that drives engagement
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button 
                      onClick={() => setShowInputForm(true)}
                      className="group relative inline-flex items-center gap-3 px-10 py-5 bg-sky-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-sky-600"
                    >
                      <SparklesIcon />
                      <span>Generate Content Now</span>
                    </button>
                    <button className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 font-semibold text-lg border border-white/30 transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch 2-Min Demo
                    </button>
                  </div>

                  <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>10x faster than manual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>Unlimited generations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid - CLEAN BACKGROUND */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AI Research & Writing</h3>
                  <p className="text-slate-600 leading-relaxed">Advanced AI analyzes trending topics, researches authoritative sources, and crafts engaging content tailored to your industry.</p>
                  <div className="mt-6 flex items-center text-sky-600 font-semibold group-hover:text-sky-700">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Visual Selection</h3>
                  <p className="text-slate-600 leading-relaxed">Automatically curated professional images from Unsplash and custom AI-generated visuals that perfectly match your content.</p>
                  <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">One-Click Publishing</h3>
                  <p className="text-slate-600 leading-relaxed">Review, edit, and approve your content with our intuitive interface. Ready-to-publish posts in minutes, not hours.</p>
                  <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Social Proof - SUBTLE GRAY BACKGROUND */}
              <div className="bg-slate-50 rounded-2xl p-12 mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Trusted by Content Creators Worldwide</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">Join thousands of marketers, entrepreneurs, and creators who've revolutionized their content strategy</p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-sky-600 mb-2">10x</div>
                    <div className="text-sm text-slate-600 font-medium">Faster Content Creation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-purple-600 mb-2">95%</div>
                    <div className="text-sm text-slate-600 font-medium">Time Saved on Research</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-green-600 mb-2">200%</div>
                    <div className="text-sm text-slate-600 font-medium">Increase in Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2">5min</div>
                    <div className="text-sm text-slate-600 font-medium">From Idea to Published</div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-8">
                  <span className="text-slate-400 font-semibold">TechCorp</span>
                  <span className="text-slate-400 font-semibold">StartupX</span>
                  <span className="text-slate-400 font-semibold">MediaPro</span>
                  <span className="text-slate-400 font-semibold">CloudNet</span>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center py-16 px-8 bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl shadow-2xl">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Ready to 10x Your Content Game?
                </h2>
                <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
                  Start creating professional, engaging content that drives real results. No credit card required.
                </p>
                <button 
                  onClick={() => setShowInputForm(true)}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-sky-600 rounded-2xl hover:bg-sky-50 font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <SparklesIcon />
                  Start Creating Free Content
                </button>
                <p className="text-sky-200 mt-6 text-sm">
                  ✨ Free forever plan available • No credit card needed • Cancel anytime
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

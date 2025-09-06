import React, { useState } from 'react';
import Header from './components/Layout/Header';
import UserInputForm from './components/Content/UserInputForm';
import ContentEditor from './components/Content/ContentEditor';
import SourceArticleCard from './components/Content/SourceArticleCard';
import MultiImageDisplay from './components/Content/MultiImageDisplay';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { generateContent, approveContent } from './services/n8n';

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
    <div className="min-h-screen bg-slate-50">
      <Header showInputForm={showInputForm} setShowInputForm={setShowInputForm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showInputForm && (
          <div className="animate-fade-in">
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
          <div className="space-y-8 animate-slide-up">
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
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Ready to Publish?</h3>
              <div className="flex gap-3">
                <button className="flex-1 px-5 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-semibold transition-colors">
                  Approve & Post
                </button>
                <button className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                  Reject All
                </button>
              </div>
            </div>
          </div>
        )}
        
        {!currentContent && !isGenerating && !showInputForm && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to AI Content Studio
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Generate engaging social media content with AI
            </p>
            <button 
              onClick={() => setShowInputForm(true)}
              className="px-8 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 font-semibold text-lg transition-colors"
            >
              Start Creating Content
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

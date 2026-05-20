import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { analyzeFaceShape, AnalysisResult } from './services/geminiService';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CitySilhouette from './components/CitySilhouette';
import LandingView from './components/LandingView';
import CameraView from './components/CameraView';
import ProcessingView from './components/ProcessingView';
import ResultsView from './components/ResultsView';

export default function App() {
  const [view, setView] = useState<'landing' | 'processing' | 'results' | 'camera'>('landing');
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        startAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async (base64: string) => {
    setView('processing');
    setError(null);
    try {
      const analysis = await analyzeFaceShape(base64);
      setResult(analysis);
      // Artificial delay for futuristic effect
      setTimeout(() => setView('results'), 2500);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to analyze face. Please try a different photo.";
      setError(message);
      setView('landing');
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-cyan-500/30 relative flex flex-col">
      <CitySilhouette />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation view={view} onReset={handleReset} />

        <main className="max-w-7xl mx-auto px-6 pb-20 w-full flex-1">
          <AnimatePresence mode="wait">
            {view === 'landing' && (
              <LandingView 
                key="landing" 
                onUpload={handleUploadClick} 
                onStartCamera={() => setView('camera')} 
                fileInputRef={fileInputRef} 
                onFileChange={handleFileChange} 
              />
            )}

            {view === 'camera' && (
              <CameraView 
                key="camera" 
                onCapture={(cap) => {
                  setImage(cap);
                  startAnalysis(cap);
                }} 
                onCancel={() => setView('landing')} 
              />
            )}

            {view === 'processing' && (
              <ProcessingView key="processing" image={image} />
            )}

            {view === 'results' && result && (
              <ResultsView key="results" image={image} result={result} onReset={handleReset} />
            )}
          </AnimatePresence>
        </main>

        <Footer />

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 z-[200] border border-red-400/20"
            >
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

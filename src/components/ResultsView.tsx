import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalysisResult } from '../services/geminiService';
import { FACE_SHAPES } from '../constants';
import { X, Maximize2 } from 'lucide-react';

interface ResultsViewProps {
  image: string | null;
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ image, result, onReset }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const shapeData = FACE_SHAPES[result.detectedShape] || FACE_SHAPES['Oval'];
  
  // Define SVG paths for the outlines
  const shapeOutlines: Record<string, React.ReactNode> = {
    Oval: <path d="M50,10 C30,10 15,30 15,60 C15,95 30,110 50,110 C70,110 85,95 85,60 C85,30 70,10 50,10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Heart: <path d="M50,30 C50,30 45,15 30,15 C15,15 10,25 10,40 C10,65 50,100 50,105 C50,100 90,65 90,40 C90,25 85,15 70,15 C55,15 50,30 50,30 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Round: <circle cx="50" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Square: <rect x="15" y="20" width="70" height="80" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Diamond: <path d="M50,15 L85,60 L50,105 L15,60 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Triangle: <path d="M50,15 L90,100 L10,100 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    Oblong: <rect x="22" y="10" width="56" height="100" rx="18" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  };

  const getShapeMask = (shape: string) => {
    switch (shape) {
      case 'Oval': return 'ellipse(38% 48% at 50% 50%)';
      case 'Heart': return 'polygon(50% 10%, 90% 30%, 80% 80%, 50% 95%, 20% 80%, 10% 30%)';
      case 'Round': return 'circle(42% at 50% 50%)';
      case 'Square': return 'inset(10% 15% round 20%)';
      case 'Diamond': return 'polygon(50% 5%, 85% 50%, 50% 95%, 15% 50%)';
      case 'Triangle': return 'polygon(50% 5%, 95% 90%, 5% 90%)';
      case 'Oblong': return 'ellipse(30% 55% at 50% 50%)';
      default: return 'ellipse(40% 50% at 50% 50%)';
    }
  };

  const currentOutline = shapeOutlines[result.detectedShape] || shapeOutlines['Oval'];
  const currentMask = getShapeMask(result.detectedShape);

  // Eyewear SVG definitions and selection
  const eyewearModels: Record<string, React.ReactNode> = {
    Rectangle: (
      <g stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinejoin="round">
        <rect x="10" y="42" width="32" height="16" rx="2" />
        <rect x="58" y="42" width="32" height="16" rx="2" />
        <path d="M42,48 C45,45 55,45 58,48" strokeWidth="2" />
        <path d="M10,48 L0,45" opacity="0.4" />
        <path d="M90,48 L100,45" opacity="0.4" />
      </g>
    ),
    Round: (
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="28" cy="48" r="16" />
        <circle cx="72" cy="48" r="16" />
        <path d="M44,48 C48,44 52,44 56,48" strokeWidth="2" />
        <path d="M12,48 L0,45" opacity="0.4" />
        <path d="M88,48 L100,45" opacity="0.4" />
      </g>
    ),
    Aviator: (
      <g stroke="currentColor" fill="none" strokeWidth="1.2">
        <path d="M12,42 Q28,38 42,42 Q42,65 27,68 Q12,65 12,42" />
        <path d="M58,42 Q72,38 88,42 Q88,65 73,68 Q58,65 58,42" />
        <path d="M42,45 L58,45" strokeWidth="2" />
        <path d="M42,52 L58,52" />
        <path d="M12,45 L0,40" opacity="0.4" />
        <path d="M88,45 L100,40" opacity="0.4" />
      </g>
    ),
    Square: (
      <g stroke="currentColor" fill="none" strokeWidth="1.8">
        <rect x="10" y="40" width="34" height="24" rx="4" />
        <rect x="56" y="40" width="34" height="24" rx="4" />
        <path d="M44,48 L56,48" strokeWidth="2.5" />
        <path d="M10,48 L0,45" opacity="0.4" />
        <path d="M90,48 L100,45" opacity="0.4" />
      </g>
    ),
    Browline: (
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <path d="M10,40 L44,40 L44,55 Q27,60 10,55 Z" strokeWidth="3" />
        <path d="M56,40 L90,40 L90,55 Q73,60 56,55 Z" strokeWidth="3" />
        <path d="M10,55 Q27,65 44,55" />
        <path d="M56,55 Q73,65 90,55" />
        <path d="M44,45 L56,45" strokeWidth="2" />
      </g>
    ),
    Oval: (
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <ellipse cx="28" cy="48" rx="18" ry="12" />
        <ellipse cx="72" cy="48" rx="18" ry="12" />
        <path d="M46,48 Q50,44 54,48" strokeWidth="2" />
        <path d="M10,48 L0,45" opacity="0.4" />
        <path d="M90,48 L100,45" opacity="0.4" />
      </g>
    ),
    CatEye: (
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M5,42 Q25,38 43,45 L43,60 Q24,65 5,42" />
        <path d="M95,42 Q75,38 57,45 L57,60 Q76,65 95,42" />
        <path d="M43,48 L57,48" strokeWidth="2" />
      </g>
    ),
  };

  const currentEyewearShapeRaw = shapeData.recommendedFrames[result.gender === 'male' ? 'men' : 'women'][0] || 'Rectangle';
  const currentEyewearShape = currentEyewearShapeRaw.replace(/[-\s]+/g, ''); 
  const eyewearOverlay = eyewearModels[currentEyewearShape] || eyewearModels['Rectangle'];

  const driveImages: Record<string, string> = {
    Heart: '1NEPp-IzklAIK2bmeo_4o6YomVipQrrAE',
    Triangle: '1J98f-L7_Cb7gEi9NccoC0GKqROWE6ZMz',
    Diamond: '1w0M3lcFgBN3tfQlhAaz5EX_K9wxvffd1',
    Square: '1G8Ul5p74BaXcCmpkONwGg_6dyg8y9hd7',
    Oval: '1zoL26lUT9OeePgbMVn5LivfKn0fIhLi_',
    Round: '1qVJIx9XCGiRIMS6KXHvCROqh1JNnnsMT',
    Oblong: '1zoL26lUT9OeePgbMVn5LivfKn0fIhLi_',
  };

  const referenceImageSrc = driveImages[result.detectedShape] 
    ? `https://lh3.googleusercontent.com/d/${driveImages[result.detectedShape]}`
    : `/face-shapes/${result.detectedShape.toLowerCase()}.svg`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-12 items-center py-8 w-full max-w-7xl mx-auto px-6 text-white"
    >
      {/* Subject Identity Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-cyan-400/10">
        <div className="space-y-2">
          <h2 className="text-5xl font-medium text-white tracking-tighter uppercase leading-none font-display italic">Results</h2>
          <p className="text-cyan-400 font-extrabold font-mono text-[10px] uppercase tracking-[0.16em] max-w-sm md:max-w-md lg:max-w-lg leading-relaxed">
            A.I. is not perfect and might make mistakes. Please verify facial measurements and frame comfort in person.
          </p>
        </div>
        <div className="text-right space-y-2">
          <div className="text-[10px] text-white/40 uppercase font-black tracking-[0.4em]">Neural Classification</div>
          <div className="text-4xl font-black tracking-tighter uppercase text-cyan-400 leading-none font-display italic tracking-widest">{shapeData.name}</div>
        </div>
      </div>

      {/* Duel Visual Layout: Subject vs Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-stretch">
        {/* Left: Customer Subject */}
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,209,255,0.6)]"></div>
             <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">Biometric Subject Data</h3>
          </div>
          <div className="rounded-[3rem] border-2 border-white/5 overflow-hidden shadow-2xl bg-black group relative aspect-[3/4] lg:aspect-auto h-[700px]">
            {/* Clear Image with Eyewear Overlay */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative h-full aspect-[3/4] max-h-[650px] w-full">
                {image && (
                  <img 
                    src={image} 
                    alt="Customer Subject"
                    className="w-full h-full object-cover rounded-[3rem]"
                  />
                )}
                


                {/* Eyewear Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="absolute bottom-8 right-8 flex flex-col items-end gap-3"
                >
                  <div className="bg-black/60 backdrop-blur-md border border-cyan-400/30 px-6 py-2 rounded-2xl flex flex-col items-end shadow-2xl">
                    <span className="text-[7px] text-white/50 uppercase tracking-[0.2em] mb-1">A.I. suggested frame design for you</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Model: {currentEyewearShape}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* HUD Elements Removed to clarify image */}
          </div>

          {/* Percentage Analytics Overlay */}
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl space-y-5">
             <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">Morphological Match</div>
                   <div className="text-2xl font-bold text-cyan-400 font-display italic uppercase tracking-widest">{result.detectedShape}</div>
                </div>
                <div className="text-4xl font-black font-mono text-white/40">{(result.confidence * 100).toFixed(2)}%</div>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${result.confidence * 100}%` }}
                   transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                   className="h-full bg-cyan-500 shadow-[0_0_20px_rgba(0,209,255,0.6)] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </motion.div>
             </div>
             <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest text-white/20">
                <span>Signal Integrity: Optimal</span>
                <span className="font-mono">#BIOM-ID: {Math.floor(result.confidence * 100 * 1234)}</span>
             </div>
          </div>
        </div>

        {/* Right: Reference Deep Analysis Report */}
        <div className="space-y-10 flex flex-col">
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,209,255,0.6)]"></div>
               <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">Deep Analysis Report</h3>
            </div>
            <div 
               onClick={() => referenceImageSrc && setIsFullscreen(true)}
               className="rounded-[3rem] border-2 border-white/5 overflow-hidden shadow-2xl bg-black group relative aspect-[3/4] lg:aspect-auto h-[700px] cursor-zoom-in"
            >
              {/* Status Indicator */}
              <div className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-cyan-400/30">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                 <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest leading-none">Status: Analysis Verified</span>
              </div>

              {referenceImageSrc && (
                <img 
                  src={referenceImageSrc} 
                  alt={`${result.detectedShape} Analysis Reference`}
                  className="w-full h-full object-contain p-2 md:p-4 hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[3rem]"></div>
              <div className="absolute inset-0 scan-grid opacity-10 pointer-events-none"></div>

              <div className="absolute top-10 right-10 flex flex-col gap-3">
                 <div className="w-16 h-[3px] bg-cyan-400 ml-auto shadow-[0_0_15px_rgba(0,209,255,0.5)]"></div>
                 <div className="w-10 h-[3px] bg-cyan-400/40 ml-auto"></div>
              </div>

              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black rounded-full font-display font-bold uppercase tracking-widest text-xs">
                  <Maximize2 className="w-5 h-5" />
                  EXPAND
                </div>
              </div>
            </div>
          </div>

          {/* Morphology Comparison Standard (The Grid Reference) */}
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-cyan-400/40"></div>
                 <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40">Morphology Standard Reference ({result.gender})</h3>
              </div>
            </div>
            <div className="relative rounded-[2.5rem] border border-white/5 bg-white/[0.01] overflow-hidden group">
               <div className="absolute inset-0 scan-grid opacity-5"></div>
               {/* Note: User needs to provide Drive IDs for these grid images */}
               <img 
                  src={result.gender === 'male' 
                    ? 'https://lh3.googleusercontent.com/d/1_MALE_GRID_PLACEHOLDER' 
                    : 'https://lh3.googleusercontent.com/d/1_FEMALE_GRID_PLACEHOLDER'
                  }
                  alt={`${result.gender} Face Shape Guide`}
                  className="w-full h-auto object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('PLACEHOLDER')) {
                      // Silently handle placeholder if IDs are missing
                    }
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                  }}
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-[8px] uppercase tracking-widest font-bold">
                     Standard Comparison Plate
                  </div>
               </div>
            </div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed px-4">
              Cross-referencing biometric scan with industry-standard morphological classifications for the {result.gender} demographic.
            </p>
          </div>
        </div>
      </div>

      {/* Action Block */}
      <div className="w-full max-w-4xl space-y-12">
        <button 
          onClick={onReset}
          className="w-full py-12 rounded-[3.5rem] bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.5em] text-sm shadow-[0_25px_60px_-15px_rgba(0,209,255,0.4)] transition-all active:scale-[0.98] border-2 border-white/20 font-display"
        >
          Initiate New Sequence
        </button>
      </div>



      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-20"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 scan-grid opacity-10 pointer-events-none"></div>
              
              {/* Show the reference report in fullscreen */}
              {referenceImageSrc && (
                <img 
                  src={referenceImageSrc} 
                  alt="Deep Analysis Report"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(0,209,255,0.3)]"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultsView;

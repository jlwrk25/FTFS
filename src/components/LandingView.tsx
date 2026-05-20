import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingViewProps {
  onUpload: () => void;
  onStartCamera: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LandingView: React.FC<LandingViewProps> = ({ 
  onUpload, 
  onStartCamera, 
  fileInputRef, 
  onFileChange 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center space-y-16 mt-8"
    >
      <div className="space-y-6 max-w-3xl relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase font-display italic">
          FRAME <span className="text-cyan-400">TO FIT SCANNER</span>
        </h1>
        <p className="text-xs md:text-sm text-cyan-400 font-black uppercase tracking-[0.6em] flex items-center justify-center gap-4 font-display">
          <span className="w-8 h-[2px] bg-cyan-400/20"></span>
          POWERED WITH <span className="text-white">J3R SYSTEMS</span>
          <span className="w-8 h-[2px] bg-cyan-400/20"></span>
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-12 border border-white/5 flex flex-col items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-600/20 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 bg-cyan-500/5 border border-cyan-500/20 rounded-full px-8 py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.1)] group-hover:border-cyan-400/30 transition-colors duration-500">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]"></div>
            <span className="text-[12px] font-black tracking-[0.3em] text-cyan-400 uppercase font-display">Face Shape Recognizer: Active</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/70 text-xl md:text-2xl font-light max-w-md leading-relaxed tracking-tight group-hover:text-white transition-colors duration-500 italic">
              Capture or upload portrait to initiate
            </p>
            <div className="flex items-center gap-3 bg-cyan-400 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">A.I. suggested frame design for you</span>
            </div>
          </div>
        </div>

        <div className="relative w-72 h-80 rounded-[48px] bg-black/60 border-2 border-white/5 flex items-center justify-center group overflow-hidden shadow-2xl">
          <div className="absolute inset-0 scan-grid opacity-20"></div>
          
          <div className="relative w-44 h-52 text-cyan-400/40 transition-all duration-1000 group-hover:scale-110 group-hover:text-cyan-400/80">
            <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
               <path d="M50,10 C30,10 15,30 15,60 C15,95 30,110 50,110 C70,110 85,95 85,60 C85,30 70,10 50,10 Z" />
               <path d="M20,30 L80,30 L85,60 L50,105 L15,60 Z" fill="currentColor" fillOpacity="0.03" strokeWidth="0.1"/>
               <circle cx="35" cy="45" r="0.8" fill="currentColor" />
               <circle cx="65" cy="45" r="0.8" fill="currentColor" />
               <path d="M42,85 Q50,88 58,85" strokeWidth="1" />
            </svg>
            <div className="absolute inset-x-0 top-0 h-1.5 bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1)] z-10 scanning-line"></div>
          </div>

          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-[10px] uppercase font-black tracking-[0.2em] text-cyan-400 backdrop-blur-md font-display">
            Ready for Input
          </div>

          {/* Corner Decals */}
          <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-cyan-400/40"></div>
          <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-cyan-400/40"></div>
          <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-cyan-400/40"></div>
          <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-cyan-400/40"></div>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-6 relative z-10">
          <button 
            id="camera-button"
            onClick={onStartCamera}
            className="flex-1 py-10 bg-cyan-500 text-black hover:bg-cyan-400 transition-all rounded-[3rem] font-black tracking-[0.3em] text-xs shadow-[0_20px_50px_-15px_rgba(0,209,255,0.4)] active:scale-95 flex items-center justify-center gap-4 group border border-white/20 font-display"
          >
            <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            INITIATE SCAN
          </button>

          <button 
            id="upload-button"
            onClick={onUpload}
            className="flex-1 py-10 bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all rounded-[3rem] font-black tracking-[0.3em] text-xs active:scale-95 flex items-center justify-center gap-4 group font-display"
          >
            <Upload className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            LOCAL DATA
          </button>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </motion.div>
  );
};

export default LandingView;

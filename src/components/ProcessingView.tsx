import React from 'react';
import { User, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessingViewProps {
  image: string | null;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ image }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-[#08080C]/95 backdrop-blur-3xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white/[0.02] p-12 md:p-20 rounded-[5rem] shadow-2xl flex flex-col items-center text-center space-y-12 max-w-xl w-full relative overflow-hidden border border-white/5"
      >
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-900/10 rounded-full blur-[120px]"></div>
        
        <div className="relative w-72 h-80 rounded-[48px] border-2 border-white/5 bg-black/60 overflow-hidden shadow-2xl">
          {image ? (
            <img src={image} alt="Target" className="w-full h-full object-cover opacity-90" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-24 h-24 text-white/5" />
            </div>
          )}
          
          <div className="absolute inset-0 scan-grid opacity-30 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-2 bg-cyan-400 shadow-[0_0_40px_rgba(0,209,255,1)] z-10 scanning-line"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <svg viewBox="0 0 100 120" className="w-64 h-72 text-cyan-500/10 drop-shadow-[0_0_20px_rgba(0,209,255,0.1)]">
                <path d="M50,10 C30,10 15,30 15,60 C15,95 30,110 50,110 C70,110 85,95 85,60 C85,30 70,10 50,10 Z" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <path d="M20,30 L80,30 L85,60 L50,105 L15,60 Z" fill="currentColor" fillOpacity="0.02" strokeWidth="0.1"/>
             </svg>
          </div>

          {/* New technical labels for "Face Scan" feel */}
          <div className="absolute top-10 left-6 text-cyan-400/60 font-mono text-[7px] uppercase tracking-widest space-y-1">
             <div className="flex items-center gap-1"><div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div> POINT_TRACKING: TRUE</div>
             <div className="flex items-center gap-1"><div className="w-1 h-1 bg-cyan-400 rounded-full"></div> DEPTH_MAPPING: ACTV</div>
          </div>
          
          <div className="absolute top-10 right-6 text-cyan-400/60 font-mono text-[7px] uppercase tracking-widest text-right space-y-1">
             <div>AXIS: 42.129</div>
             <div>ROT: 0.000</div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-cyan-500 text-black rounded-full text-[11px] uppercase font-black tracking-[0.3em] shadow-lg shadow-cyan-500/40 animate-pulse font-display">
            Face Scanning...
          </div>
        </div>

        <div className="space-y-6 relative z-10 w-full">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white leading-tight font-display italic uppercase">
            Figuring out <br/>
            <span className="font-black not-italic text-cyan-400 relative inline-block mt-2">
              Whats the best frame for you
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400 rounded-full"></div>
            </span>
          </h2>
          <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Processing vision layers</p>
        </div>

        <div className="relative">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingView;

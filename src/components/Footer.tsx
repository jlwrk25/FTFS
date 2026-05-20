import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 mt-auto relative z-10 w-full">
      <div className="pt-8 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] font-display">
            Algorithm v4.2.0 • <span className="text-cyan-400">POWERED WITH J3R SYSTEMS</span>
          </div>
          <div className="text-[9px] text-white/20 font-bold uppercase tracking-[0.2em] font-mono">
            © 2026 J3R NEURAL NETWORKS. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,209,255,0.6)]"></div>
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors font-display">Privacy Shield: ON</span>
          </div>
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,209,255,0.6)]"></div>
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors font-display">Neural Data Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

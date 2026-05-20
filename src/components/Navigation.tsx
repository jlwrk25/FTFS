import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  view: string;
  onReset: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ view, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-[60]">
      {/* Left Axis: Menu Button + Brand */}
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-2 -ml-2 h-10 w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          <div className="absolute -inset-1 bg-cyan-500/5 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => {
            onReset();
            setIsOpen(false);
          }}
        >
          <div className="relative">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,209,255,0.6)] transition-all duration-500">
              <span className="text-black font-black text-lg group-hover:scale-110 transition-transform tracking-tight">J3R</span>
            </div>
            <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white leading-none uppercase font-display">
              FRAME <span className="text-primary italic">TO FIT SCANNER</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase mt-1">
              Biometric Systems Analysis
            </span>
          </div>
        </div>
      </div>

      {/* Right Axis: Status Indicator - Removed per user request to move it */}
      <div className="flex items-center gap-4">
      </div>

      {/* Side Menu Implementation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[70]"
            />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 left-0 h-full w-[350px] bg-black border-r border-white/5 z-[80] p-12 flex flex-col"
              >
                <div className="mt-20 space-y-16">
                  <div>
                    <h3 className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase mb-8">Navigation</h3>
                    <div className="flex flex-col gap-6">
                      {[
                        { name: 'Analysis', active: view === 'landing', action: onReset },
                        { name: 'Archive', disabled: true },
                        { name: 'Virtual Try-On', disabled: true },
                        { name: 'Neural Link', disabled: true },
                        { name: 'Settings', disabled: true }
                      ].map((item) => (
                        <button 
                          key={item.name}
                          disabled={item.disabled}
                          onClick={() => {
                            if (item.action) item.action();
                            setIsOpen(false);
                          }}
                          className={`text-5xl font-display font-medium text-left tracking-tighter transition-all duration-300 uppercase ${
                            item.active 
                              ? 'text-cyan-400 border-l-4 border-cyan-400 pl-6' 
                              : item.disabled 
                                ? 'text-white/5 cursor-not-allowed' 
                                : 'text-white/40 hover:text-white hover:pl-4 pl-0'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase">Hardware Data</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-[8px] text-white/30 font-bold uppercase mb-1">Capped GPU</div>
                        <div className="text-sm font-mono text-white/80">92%</div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-[8px] text-white/30 font-bold uppercase mb-1">Latency</div>
                        <div className="text-sm font-mono text-white/80">0.04s</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[8px] font-bold tracking-[0.4em] text-white/20 uppercase font-mono">
                    System Core: Online
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-400/40"></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-400/40"></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
              </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

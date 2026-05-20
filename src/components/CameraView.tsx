import React, { useRef, useState, useEffect } from 'react';
import { Camera, Loader2, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface CameraViewProps {
  onCapture: (image: string) => void;
  onCancel: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    setError(null);
    setIsReady(false);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user'
        }
      };
      
      // Attempt with high resolution first
      try {
        const highResConstraints = {
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        const s = await navigator.mediaDevices.getUserMedia(highResConstraints);
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e) {
        // Fallback to basic constraints
        const s = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError("Camera permission denied. Please enable camera access in your settings.");
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError("No camera found on this device.");
        } else {
          setError("Could not access the camera. Please ensure no other app is using it.");
        }
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-12 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] rounded-[60px] bg-black/60 border-2 border-white/5 overflow-hidden shadow-[0_0_100px_rgba(0,209,255,0.1)]">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            onCanPlay={() => setIsReady(true)}
            className="w-full h-full object-cover grayscale brightness-110 contrast-125"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute inset-0 scan-grid opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 border-[30px] border-black rounded-[60px] pointer-events-none"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-80 border-2 border-cyan-500/30 rounded-[120px] relative shadow-[0_0_40px_rgba(0,209,255,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 px-5 py-2 bg-cyan-500 text-black rounded-full text-[11px] uppercase font-black tracking-widest shadow-xl flex items-center gap-3 font-display">
                <Target className="w-4 h-4" /> Align Subject
              </div>
              
              {/* Corner Indicators */}
              <div className="absolute top-10 left-10 w-5 h-5 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-10 right-10 w-5 h-5 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-10 left-10 w-5 h-5 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-10 right-10 w-5 h-5 border-b-2 border-r-2 border-cyan-400"></div>
            </div>
          </div>

          {!isReady && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black space-y-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full"></div>
              </div>
              <p className="text-[11px] uppercase font-black tracking-[0.4em] text-white/40 text-center animate-pulse font-display">
                Calibrating Optics...
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-10 space-y-8">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <Target className="w-8 h-8 rotate-45" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm font-bold text-white uppercase tracking-widest font-display">Capture Error</p>
                <p className="text-xs text-white/40 leading-relaxed max-w-[200px] mx-auto">{error}</p>
              </div>
              <button 
                onClick={startCamera}
                className="px-8 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-[10px] uppercase font-black tracking-[0.3em] hover:bg-red-500/30 transition-all font-display"
              >
                Retry Auth
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-6 w-full max-w-sm">
          <button 
            onClick={onCancel}
            className="flex-1 py-8 rounded-[2.5rem] border border-white/10 text-white/40 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/5 hover:text-white transition-all font-display"
          >
            Abort
          </button>
          <button 
            onClick={handleCapture}
            disabled={!isReady || !!error}
            className="flex-[2] py-8 rounded-[2.5rem] bg-cyan-500 text-black font-black uppercase tracking-[0.4em] text-xs shadow-[0_20px_50px_-15px_rgba(0,209,255,0.4)] active:scale-95 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-4 border border-white/20 font-display"
          >
            <Camera className="w-6 h-6" /> INITIATE CAPTURE
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraView;

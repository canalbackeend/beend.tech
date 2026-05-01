import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    "INITIALIZING BEEND.TECH CORE v4.0.2...",
    "DETECTING CRT EMULATION LAYER... OK",
    "LOADING PHOSPHOR SHADERS...",
    "MOUNTING ASSETS/SYSTEM/LOGOS...",
    "ESTABLISHING SECURE CONNECTION...",
    "CALIBRATING COLOR MATRIX (AMBER)...",
    "BOOTING INTERFACE..."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLogIndex]]);
        currentLogIndex++;
        setProgress(Math.min((currentLogIndex / bootSequence.length) * 100, 100));
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-brand-bg flex flex-col items-center justify-center p-6 font-mono text-brand-primary"
    >
      <div className="w-full max-w-md space-y-8">
        {/* CRT Logo / Iconish thing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 border-2 border-brand-primary flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,176,0,0.4)]">
            <div className="w-full h-full bg-brand-primary animate-pulse" />
          </div>
        </motion.div>

        {/* Boot Logs */}
        <div className="space-y-2 h-40 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs uppercase tracking-widest"
              >
                {`> ${log}`}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter">
            <span>System Status</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-brand-primary/10 w-full relative overflow-hidden">
            <motion.div 
              className="h-full bg-brand-primary shadow-[0_0_10px_rgba(255,176,0,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[10px] text-center uppercase tracking-[0.4em] opacity-40 font-bold"
        >
          Please stand by
        </motion.p>
      </div>
      
      {/* Visual Glitch Overlays for Preloader only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary/30 animate-[scanline_8s_linear_infinite]" />
      </div>
    </motion.div>
  );
}

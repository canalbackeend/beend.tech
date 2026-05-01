import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../constants';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const phrases = t.heroPhrases;
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [cycleCount, setCycleCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Reset when language changes
  useEffect(() => {
    setDisplayText('');
    setCurrentPhraseIndex(0);
    setIsDeleting(false);
    setCycleCount(0);
    setIsFinished(false);
  }, [lang]);

  useEffect(() => {
    if (isFinished) return;

    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === currentPhrase) {
          // Stop after the first time the last phrase is fully typed (cycleCount is 0)
          if (currentPhraseIndex === phrases.length - 1 && cycleCount >= 0) {
            setTimeout(() => setIsFinished(true), 1500);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === '') {
          setIsDeleting(false);
          const nextIndex = (currentPhraseIndex + 1) % phrases.length;
          setCurrentPhraseIndex(nextIndex);
          if (nextIndex === 0) {
            setCycleCount(prev => prev + 1);
          }
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex, phrases, typingSpeed, isFinished, cycleCount]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="relative">
          <div className="min-h-[35vw] flex items-center py-12">
            {!isFinished ? (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[clamp(3.5rem,15vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase mb-12 text-brand-primary font-mono"
              >
                {displayText}
                <span className="animate-pulse ml-2">_</span>
              </motion.h1>
            ) : (
              <div className="flex flex-col gap-2">
                {phrases.map((phrase, i) => (
                  <motion.h1
                    key={phrase + i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] font-black tracking-tighter uppercase text-brand-primary font-mono last:text-brand-primary/80"
                  >
                    {phrase}
                  </motion.h1>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-brand-border pt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md"
            >
              <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 font-bold">{t.hero.discipline}</p>
              <p className="text-2xl font-light italic text-brand-primary/90 font-serif whitespace-pre-line">
                {t.hero.role}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-12 items-center"
            >
              <div className="text-right">
                <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-2 font-bold">{t.hero.location}</p>
                <p className="text-xs uppercase font-semibold tracking-widest">{t.hero.city}</p>
              </div>
              <a 
                href="#projects" 
                className="w-16 h-16 border border-brand-border/40 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all cursor-pointer group"
              >
                <ArrowRight className="h-6 w-6 rotate-[-45deg] group-hover:rotate-0 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-5 h-8 border border-brand-primary/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-1.5 bg-brand-primary rounded-full shadow-[0_0_5px_rgba(255,176,0,0.5)]"
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-30">Scroll</span>
      </motion.div>
    </section>
  );
}

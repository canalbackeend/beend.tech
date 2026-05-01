import { motion } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Language, translations } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-bg/90 backdrop-blur-sm border-b border-brand-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <a href="#" className="text-xs font-black tracking-[0.4em] uppercase text-brand-primary hover:opacity-70 transition-opacity">
              BEEND.TECH &copy; {new Date().getFullYear()}
            </a>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[10px] tracking-[0.4em] uppercase text-brand-primary/60 hover:text-brand-primary transition-colors font-bold"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="h-4 w-px bg-brand-border mx-2"></div>

              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] font-bold uppercase">
                <button 
                  onClick={() => setLang('pt')}
                  className={`transition-colors ${lang === 'pt' ? 'text-brand-primary' : 'text-brand-primary/30 hover:text-brand-primary/60'}`}
                >
                  PT
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`transition-colors ${lang === 'en' ? 'text-brand-primary' : 'text-brand-primary/30 hover:text-brand-primary/60'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="p-2 text-brand-primary/60 hover:text-brand-primary"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-primary/60 hover:text-brand-primary transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-bg border-b border-brand-border"
        >
          <div className="px-6 py-10 space-y-8 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[10px] tracking-[0.4em] uppercase text-brand-primary/60 hover:text-brand-primary font-bold"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-8 pt-4 border-t border-brand-border w-full justify-center">
                <button 
                  onClick={() => { setLang('pt'); setIsOpen(false); }}
                  className={`text-[10px] tracking-[0.2em] font-bold uppercase transition-colors ${lang === 'pt' ? 'text-brand-primary' : 'text-brand-primary/30'}`}
                >
                  Português
                </button>
                <button 
                  onClick={() => { setLang('en'); setIsOpen(false); }}
                  className={`text-[10px] tracking-[0.2em] font-bold uppercase transition-colors ${lang === 'en' ? 'text-brand-primary' : 'text-brand-primary/30'}`}
                >
                  English
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

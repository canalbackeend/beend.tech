import { Language, translations } from '../constants';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  return (
    <footer className="py-12 bg-brand-bg border-t border-brand-border uppercase tracking-widest text-[10px] font-bold opacity-60 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-primary">
        <div>
          BEEND.TECH &copy; {new Date().getFullYear()}
        </div>
        
        <div className="flex gap-12">
          <a href="#about" className="hover:opacity-100 transition-opacity">{t.nav.about}</a>
          <a href="#projects" className="hover:opacity-100 transition-opacity">{t.nav.projects}</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">{t.nav.contact}</a>
        </div>
      </div>
    </footer>
  );
}

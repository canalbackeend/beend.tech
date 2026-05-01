import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, translations } from '../constants';
import { supabase, Profile } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-brand-bg flex items-center justify-center">
        <Loader2 className="animate-spin opacity-20" size={30} />
      </div>
    );
  }

  const name = profile?.name || 'STUDIO BEEND';
  const role = lang === 'pt' ? profile?.role_pt : profile?.role_en;
  const description = lang === 'pt' ? profile?.description_pt : profile?.description_en;
  const projectsCount = profile?.projects_count || '50+';
  const experienceYears = profile?.experience_years || '15+';
  const imageUrl = profile?.image_url || 'https://picsum.photos/seed/setup/800/1000';

  // Helper to get heading lines
  const getHeading = () => {
    if (profile) {
      return (
        <>
          {name}. <br /> 
          <span className="font-serif italic font-normal text-brand-primary/50 lowercase">{role}</span>
        </>
      );
    }
    // Fallback to original static translations
    const [line1, line2, line3] = t.about.heading.split('\n');
    return (
      <>
        {line1} <br /> 
        {line2} <br /> 
        <span className="font-serif italic font-normal text-brand-primary/50 lowercase">{line3}</span>
      </>
    );
  };

  return (
    <section id="about" className="py-24 bg-brand-bg border-t border-brand-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="aspect-[4/5] bg-brand-primary/5 border border-brand-border overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-8 font-bold">{t.about.title}</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-brand-primary mb-10 leading-[0.9] whitespace-pre-line">
              {getHeading()}
            </h2>
            <div className="space-y-8 text-lg font-light text-brand-primary/60 leading-relaxed">
              <p>
                {description || t.about.description}
              </p>
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-brand-border">
                <div>
                  <h4 className="text-4xl font-black text-brand-primary tracking-tighter">{projectsCount}</h4>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold mt-2 uppercase">{t.about.stats.projects}</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-brand-primary tracking-tighter">{experienceYears}</h4>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold mt-2 uppercase">{t.about.stats.experience}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

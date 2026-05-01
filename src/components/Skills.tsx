import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Database, Smartphone, Loader2 } from 'lucide-react';
import { Language, translations } from '../constants';
import { supabase, Profile } from '../lib/supabase';

interface SkillsProps {
  lang: Language;
}

const skillIcons = [
  <Layout className="h-6 w-6" />,
  <Server className="h-6 w-6" />,
  <Database className="h-6 w-6" />,
  <Smartphone className="h-6 w-6" />,
];

export default function Skills({ lang }: SkillsProps) {
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

  const title = lang === 'pt' ? profile?.skills_title_pt : profile?.skills_title_en;
  const description = lang === 'pt' ? profile?.skills_description_pt : profile?.skills_description_en;
  const categories = profile?.skills_json || [
    { name: 'FRONTEND', skills: ['Html5', 'CSS3', 'React JS', 'JavaScript', 'Tailwind'] },
    { name: 'BACKEND', skills: ['Php', 'Laravel', 'Node.js'] },
    { name: 'BANCO DE DADOS', skills: ['PostgreSQL', 'MySQL', 'DBMaria', 'PhpMyAdmin'] },
    { name: 'PLATAFORMAS', skills: ['AWS', 'Docker', 'Vercel', 'Coolify'] }
  ];

  return (
    <section id="skills" className="py-24 bg-brand-bg border-t border-brand-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-6 font-bold">{t.skills.label}</p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black uppercase tracking-tighter text-brand-primary mb-8 whitespace-pre-line"
            >
              {title || t.skills.title}
            </motion.h2>
            <p className="text-lg leading-relaxed font-light text-brand-primary/50">
              {description || t.skills.description}
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-border border border-brand-border">
            {categories.map((category: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-brand-bg group hover:bg-brand-primary transition-colors duration-500"
              >
                <div className="text-brand-primary/20 group-hover:text-black mb-8 transition-colors">
                  {skillIcons[i] || <Layout className="h-6 w-6" />}
                </div>
                <h3 className="text-xs tracking-[0.4em] uppercase font-bold text-brand-primary group-hover:text-black mb-6 transition-colors">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {category.skills.map((skill: string) => (
                    <span key={skill} className="text-sm font-light text-brand-primary/50 group-hover:text-black/70 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

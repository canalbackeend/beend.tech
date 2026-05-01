import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, ChevronRight, Loader2 } from 'lucide-react';
import { translations, Language } from '../constants';
import { supabase, Project } from '../lib/supabase';

interface ProjectDetailProps {
  lang: Language;
}

export default function ProjectDetail({ lang }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const t = translations[lang];
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      // First try to find in DB
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setProject({
          id: data.id,
          title: lang === 'pt' ? data.title_pt : data.title_en,
          category: lang === 'pt' ? data.category_pt : data.category_en,
          description: lang === 'pt' ? data.description_pt : data.description_en,
          briefing: lang === 'pt' ? data.briefing_pt : data.briefing_en,
          stack: data.stack,
          images: data.images,
          external_url: data.external_url,
          github_url: data.github_url
        });
      } else {
        // Fallback to static constants
        const staticProject = t.projects.items.find(p => (p as any).id === id);
        setProject(staticProject);
      }
      setLoading(false);
    }
    fetchProject();
  }, [id, lang, t.projects.items]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0902] text-brand-primary flex items-center justify-center">
        <Loader2 className="animate-spin opacity-40" size={40} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0902] text-brand-primary flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black mb-8 underline decoration-white/10 underline-offset-8">PROJETO NÃO ENCONTRADO</h1>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-bold hover:opacity-100 opacity-60 transition-opacity"
        >
          <ArrowLeft size={14} /> Voltar ao Portfolio
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0d0902] text-brand-primary font-sans selection:bg-brand-primary selection:text-[#0d0902]"
    >
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-4 group"
        >
          <div className="w-10 h-10 border border-brand-primary/20 flex items-center justify-center rounded-full group-hover:bg-brand-primary group-hover:text-[#0d0902] transition-all duration-500">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            {lang === 'pt' ? 'Voltar' : 'Back'}
          </span>
        </button>

        <div className="text-xl font-black tracking-tighter">BEEND.TECH</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-[10px] tracking-[0.6em] uppercase opacity-40 font-bold mb-4">
            {project.category}
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">
            {project.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-4">Briefing</h3>
              <p className="text-lg md:text-xl leading-relaxed font-medium opacity-80">
                {project.briefing}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.external_url && (
                <a 
                  href={project.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-3 hover:translate-y-[-2px] transition-transform"
                >
                  Launch Project <ExternalLink size={14} />
                </a>
              )}
              {project.github_url && (
                <a 
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-brand-primary/20 text-brand-primary text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-3 hover:bg-brand-primary/10 transition-colors"
                >
                  Check Code <Github size={14} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-4">Tech Stack</h3>
                <ul className="space-y-2">
                  {project.stack.map((item: string) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold">
                      <ChevronRight size={14} className="text-brand-primary opacity-40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-4">Timeline</h3>
                <p className="text-sm font-bold tracking-tight">2024 / 04 Months</p>
              </div>
            </div>

            <div className="p-8 bg-brand-primary/5 border border-brand-primary/10 rounded-lg">
              <p className="text-sm italic opacity-60 leading-relaxed italic">
                "{project.description}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="px-6 md:px-20 pb-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {project.images.map((img: string, idx: number) => {
            // Determine grid span based on index for a "staggered" look
            let span = 'md:col-span-6'; // Default half width
            let height = 'h-[40vh] md:h-[60vh]';

            if (idx % 5 === 0) {
              span = 'md:col-span-12'; // Full width every 5th image
              height = 'h-[50vh] md:h-[80vh]';
            } else if (idx % 5 === 1 || idx % 5 === 2) {
              span = idx % 5 === 1 ? 'md:col-span-7' : 'md:col-span-5';
            } else {
              span = idx % 5 === 3 ? 'md:col-span-5' : 'md:col-span-7';
            }

            return (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden group ${span} ${height} border border-brand-primary/5`}
              >
                <img 
                  src={img} 
                  alt={`${project.title} - ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0d0902]/20 group-hover:bg-transparent transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-primary/10 text-center">
        <button 
          onClick={() => navigate('/')}
          className="text-[10px] tracking-[0.6em] uppercase font-black hover:text-brand-primary/60 transition-colors"
        >
          {lang === 'pt' ? 'Explorar Outros Trabalhos' : 'Explore Other Projects'}
        </button>
      </footer>
    </motion.div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Language, translations } from '../constants';
import { supabase, Project } from '../lib/supabase';

interface ProjectsProps {
  lang: Language;
}

export default function Projects({ lang }: ProjectsProps) {
  const t = translations[lang];
  const navigate = useNavigate();
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        setDbProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Use DB projects if available, otherwise fallback to static ones
  const displayProjects = dbProjects.length > 0 
    ? dbProjects.map(p => ({
        id: p.id,
        title: lang === 'pt' ? p.title_pt : p.title_en,
        category: lang === 'pt' ? p.category_pt : p.category_en,
        description: lang === 'pt' ? p.description_pt : p.description_en,
        images: p.images
      }))
    : t.projects.items;

  return (
    <section id="projects" className="py-24 bg-brand-bg border-t border-brand-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 font-bold">{t.projects.label}</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-brand-primary">{t.projects.title}</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-light text-brand-primary/50 max-w-sm"
          >
            {t.projects.description}
          </motion.p>
        </div>

        <div className="flex flex-col border-t border-brand-border">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin opacity-20" size={30} />
            </div>
          ) : (
            displayProjects.map((project, i) => (
              <motion.div
                key={(project as any).id || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/project/${(project as any).id}`)}
                className="group bg-brand-bg border-b border-brand-border hover:bg-brand-primary transition-all duration-700 cursor-pointer overflow-hidden"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center min-h-[300px]">
                  {/* Image Section */}
                  <div className="lg:col-span-4 h-[300px] lg:h-full relative overflow-hidden order-2 lg:order-1">
                    <img 
                      src={(project as any).images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>

                  {/* Text Content Section */}
                  <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
                    <div className="flex items-start gap-6 mb-6">
                      <span className="text-[10px] font-mono opacity-40 group-hover:opacity-100 group-hover:text-black mt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 group-hover:text-black mb-2 block font-bold leading-none">
                          {project.category}
                        </span>
                        <h3 className="text-3xl lg:text-6xl font-black uppercase tracking-tighter text-brand-primary group-hover:text-black leading-none">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-brand-primary/50 text-base font-light leading-relaxed group-hover:text-black/70 max-w-2xl lg:ml-12 mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-8 lg:ml-12">
                       <span 
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary group-hover:text-black hover:opacity-100 opacity-60 transition-opacity"
                      >
                        {lang === 'pt' ? 'Ver Detalhes' : 'View Details'}
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

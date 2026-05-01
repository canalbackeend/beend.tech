import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Linkedin, Github, Loader2, Check } from 'lucide-react';
import { Language, translations } from '../constants';
import { supabase, Profile } from '../lib/supabase';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // We will send to an API endpoint that we'll create in server.ts
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: profile?.contact_email || 'beendtech@gmail.com'
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const contactEmail = profile?.contact_email || 'hello@beend.tech';

  if (loading) {
    return (
      <div className="py-24 bg-brand-bg flex items-center justify-center">
        <Loader2 className="animate-spin opacity-20" size={30} />
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-brand-bg border-t border-brand-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-8 font-bold">{t.contact.label}</p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-black uppercase tracking-tighter text-brand-primary mb-12 whitespace-pre-line"
            >
              {t.contact.title.split('\n')[0]} <br /> {t.contact.title.split('\n')[1]} <br /> <span className="font-serif italic font-normal text-brand-primary/60 lowercase">{t.contact.title.split('\n')[2]}</span>
            </motion.h2>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-bold uppercase">{t.contact.details.email}</p>
                <a href={`mailto:${contactEmail}`} className="text-2xl font-light hover:opacity-60 transition-opacity">{contactEmail}</a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-bold uppercase">{t.contact.details.social}</p>
                <div className="flex gap-8">
                  {profile?.instagram_url && (
                    <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-brand-border rounded-full hover:bg-brand-primary hover:text-black transition-all duration-300">
                      <Instagram size={20} />
                    </a>
                  )}
                  {profile?.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-brand-border rounded-full hover:bg-brand-primary hover:text-black transition-all duration-300">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {profile?.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-brand-border rounded-full hover:bg-brand-primary hover:text-black transition-all duration-300">
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary/5 p-10 border border-brand-border">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">{t.contact.form.name}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors"
                  placeholder={t.contact.form.placeholderName}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">{t.contact.form.email}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors"
                  placeholder={t.contact.form.placeholderEmail}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">{(t.contact.form as any).phone}</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors"
                  placeholder={(t.contact.form as any).placeholderPhone}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">{t.contact.form.message}</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors resize-none"
                  placeholder={t.contact.form.placeholderMessage}
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={formStatus === 'submitting'}
                className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] group disabled:opacity-50"
              >
                {formStatus === 'submitting' ? (lang === 'pt' ? 'ENVIANDO...' : 'SENDING...') : (formStatus === 'success' ? (lang === 'pt' ? 'ENVIADO!' : 'SENT!') : t.contact.form.submit)}
                <div className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all">
                  {formStatus === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : (formStatus === 'success' ? <Check size={16} /> : <Send size={16} />)}
                </div>
              </button>
              {formStatus === 'error' && (
                <p className="text-red-500 text-[10px] uppercase tracking-widest mt-4">
                  {lang === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Try again.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

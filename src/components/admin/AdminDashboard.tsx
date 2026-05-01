import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, LogOut, Loader2, Save, X, Image as ImageIcon, User, Upload } from 'lucide-react';
import { supabase, Project, Profile } from '../../lib/supabase';

interface ProjectFormProps {
  project: Partial<Project>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  setEditingProject: (p: Partial<Project> | null) => void;
  submitting: boolean;
}

const ProjectForm = ({ project, onClose, onSave, setEditingProject, submitting }: ProjectFormProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      const currentImages = project.images || [];
      setEditingProject({ ...project, images: [...currentImages, publicUrl] });
    } catch (error: any) {
      alert('Erro ao fazer upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#0d0902]/95 overflow-y-auto"
    >
      <div className="w-full max-w-4xl bg-brand-primary/5 border border-brand-primary/10 p-8 md:p-12 relative my-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black tracking-tighter mb-10 text-brand-primary uppercase">
          {project.id ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>

        <form onSubmit={onSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PT Content */}
            <div className="space-y-6 border-r border-brand-primary/5 pr-8">
              <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-2">Versão Português</div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Título (PT)</label>
                <input 
                  type="text" 
                  value={project.title_pt || ''}
                  onChange={(e) => setEditingProject({...project, title_pt: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Categoria (PT)</label>
                <input 
                  type="text" 
                  value={project.category_pt || ''}
                  onChange={(e) => setEditingProject({...project, category_pt: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Descrição Curta (PT)</label>
                <textarea 
                  value={project.description_pt || ''}
                  onChange={(e) => setEditingProject({...project, description_pt: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Briefing (PT)</label>
                <textarea 
                  value={project.briefing_pt || ''}
                  onChange={(e) => setEditingProject({...project, briefing_pt: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* EN Content */}
            <div className="space-y-6">
              <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-2">English Version</div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Title (EN)</label>
                <input 
                  type="text" 
                  value={project.title_en || ''}
                  onChange={(e) => setEditingProject({...project, title_en: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Category (EN)</label>
                <input 
                  type="text" 
                  value={project.category_en || ''}
                  onChange={(e) => setEditingProject({...project, category_en: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Description (EN)</label>
                <textarea 
                  value={project.description_en || ''}
                  onChange={(e) => setEditingProject({...project, description_en: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Briefing (EN)</label>
                <textarea 
                  value={project.briefing_en || ''}
                  onChange={(e) => setEditingProject({...project, briefing_en: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Stack (Vírgula para separar)</label>
              <input 
                type="text" 
                value={project.stack?.join(', ') || ''}
                onChange={(e) => setEditingProject({...project, stack: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                placeholder="React, Tailwind, Supabase"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Imagens</label>
              <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                {project.images?.map((img, i) => (
                  <div key={i} className="relative flex-shrink-0 w-12 h-12 border border-brand-primary/20">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setEditingProject({...project, images: project.images?.filter((_, idx) => idx !== i)})}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X size={8} />
                    </button>
                  </div>
                ))}
                <label className="flex-shrink-0 w-12 h-12 border border-dashed border-brand-primary/30 flex items-center justify-center cursor-pointer hover:bg-brand-primary/5">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                </label>
              </div>
              <input 
                type="text" 
                value={project.images?.join(', ') || ''}
                onChange={(e) => setEditingProject({...project, images: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none text-xs"
                placeholder="URLs separadas por vírgula"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Link do Projeto (Demo)</label>
              <input 
                type="url" 
                value={project.external_url || ''}
                onChange={(e) => setEditingProject({...project, external_url: e.target.value})}
                className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                placeholder="https://meu-projeto.com"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Link do GitHub</label>
              <input 
                type="url" 
                value={project.github_url || ''}
                onChange={(e) => setEditingProject({...project, github_url: e.target.value})}
                className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-black flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50"
          >
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Salvar Projeto
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'skills'>('projects');
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchProjects();
    fetchProfile();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin/login');
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single();
    
    if (!error && data) {
      setProfile(data);
    } else {
      // If no profile, set an empty object ready for creation
      setProfile({
        name: '',
        role_pt: '',
        role_en: '',
        description_pt: '',
        description_en: '',
        image_url: '',
        projects_count: '0',
        experience_years: '0',
        skills_title_pt: 'TECNOLOGIAS DOMINADAS',
        skills_title_en: 'MASTERED TECHNOLOGIES',
        skills_description_pt: 'Construindo fundações digitais por meio de código preciso, estrutura intencional e clareza intransigente.',
        skills_description_en: 'Building digital foundations through precise code, intentional structure and uncompromising clarity.',
        skills_json: [
          { name: 'FRONTEND', skills: ['Html5', 'CSS3', 'React JS', 'JavaScript', 'Tailwind'] },
          { name: 'BACKEND', skills: ['Php', 'Laravel', 'Node.js'] },
          { name: 'BANCO DE DADOS', skills: ['PostgreSQL', 'MySQL', 'DBMaria', 'PhpMyAdmin'] },
          { name: 'PLATAFORMAS', skills: ['AWS', 'Docker', 'Vercel', 'Coolify'] }
        ]
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSubmitting(true);

    const projectData = {
      ...editingProject,
      slug: editingProject.title_en?.toLowerCase().replace(/ /g, '-') || '',
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingProject.id) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert([projectData]);
      error = insertError;
    }

    if (!error) {
      setEditingProject(null);
      fetchProjects();
      alert('Projeto salvo com sucesso!');
    } else {
      console.error('Supabase Error:', error);
      alert('Erro ao salvar no banco de dados: ' + error.message + '\n\nCertifique-se de que a tabela "projects" existe e as políticas de RLS permitem inserção.');
    }
    setSubmitting(false);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSubmitting(true);

    const profileData = {
      ...profile,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (profile.id) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', profile.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([profileData]);
      error = insertError;
    }

    if (!error) {
      alert('Perfil atualizado com sucesso!');
      fetchProfile();
    } else {
      console.error('Supabase Error:', error);
      alert('Erro ao salvar perfil: ' + error.message + '\n\nCertifique-se de que a tabela "profiles" existe.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0902] text-brand-primary font-sans">
      {/* Header */}
      <header className="p-6 md:p-10 flex justify-between items-center border-b border-brand-primary/10">
        <div className="flex items-center gap-8">
          <div className="text-xl font-black tracking-tighter">BEEND.TECH</div>
          <div className="hidden md:block text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">Control Panel</div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
        >
          Logout <LogOut size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex gap-8 border-b border-brand-primary/10 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`pb-4 text-[10px] tracking-[0.4em] uppercase font-black transition-all ${activeTab === 'projects' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-primary/40 hover:text-brand-primary'}`}
            >
              Projetos
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`pb-4 text-[10px] tracking-[0.4em] uppercase font-black transition-all ${activeTab === 'profile' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-primary/40 hover:text-brand-primary'}`}
            >
              Perfil (Sobre)
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`pb-4 text-[10px] tracking-[0.4em] uppercase font-black transition-all ${activeTab === 'skills' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-primary/40 hover:text-brand-primary'}`}
            >
              Stacks
            </button>
          </div>

          {activeTab === 'projects' && (
            <button 
              onClick={() => setEditingProject({ stack: [], images: [] })}
              className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-black hover:translate-y-[-2px] transition-all"
            >
              <Plus size={16} /> Novo Projeto
            </button>
          )}
        </div>

        {activeTab === 'projects' ? (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-40">
                <Loader2 className="animate-spin opacity-40" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <motion.div 
                    key={project.id}
                    className="group bg-brand-primary/5 border border-brand-primary/10 p-6 flex flex-col md:flex-row items-center gap-8 hover:bg-brand-primary/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-full md:w-40 h-24 bg-black overflow-hidden relative border border-brand-primary/10">
                      {project.images?.[0] ? (
                        <img src={project.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={24} /></div>
                      )}
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-1">{project.category_pt}</div>
                      <h3 className="text-xl font-black uppercase tracking-tight">{project.title_pt}</h3>
                      <p className="text-xs opacity-60 line-clamp-1 mt-2">{project.description_pt}</p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setEditingProject(project)}
                        className="w-12 h-12 border border-brand-primary/10 flex items-center justify-center rounded-full hover:bg-brand-primary hover:text-[#0d0902] transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="w-12 h-12 border border-brand-primary/10 flex items-center justify-center rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {projects.length === 0 && (
                  <div className="text-center py-20 border border-dashed border-brand-primary/10 opacity-40">
                    <p className="text-[10px] tracking-[0.4em] uppercase font-bold">Nenhum projeto encontrado</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : activeTab === 'profile' ? (
          <div className="max-w-4xl">
            {profile ? (
              <form onSubmit={handleProfileSave} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* General Info */}
                  <div className="space-y-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary/40">Geral</h2>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Nome</label>
                      <input 
                        type="text" 
                        value={profile.name || ''}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Foto</label>
                      <div className="flex gap-4 items-end mb-4">
                        <div className="w-20 h-20 bg-brand-primary/5 border border-brand-primary/10 overflow-hidden">
                          {profile.image_url ? (
                            <img src={profile.image_url} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-20"><User size={30} /></div>
                          )}
                        </div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-brand-primary hover:text-black transition-all">
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setSubmitting(true);
                              try {
                                const fileExt = file.name.split('.').pop();
                                const fileName = `${Math.random()}.${fileExt}`;
                                const filePath = `profile/${fileName}`;
                                const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
                                if (uploadError) throw uploadError;
                                const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
                                setProfile({ ...profile, image_url: publicUrl });
                              } catch (err: any) {
                                alert('Erro upload: ' + err.message);
                              } finally {
                                setSubmitting(false);
                              }
                            }} 
                          />
                          <Upload size={14} /> Upload Foto
                        </label>
                      </div>
                      <input 
                        type="text" 
                        value={profile.image_url || ''}
                        onChange={(e) => setProfile({...profile, image_url: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none text-xs"
                        placeholder="Ou cole uma URL externa"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Projetos Feitos</label>
                        <input 
                          type="text" 
                          value={profile.projects_count || ''}
                          onChange={(e) => setProfile({...profile, projects_count: e.target.value})}
                          className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                          placeholder="50+"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Anos de Experiência</label>
                        <input 
                          type="text" 
                          value={profile.experience_years || ''}
                          onChange={(e) => setProfile({...profile, experience_years: e.target.value})}
                          className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                          placeholder="15+"
                        />
                      </div>
                    </div>
                    {/* Contact & Social */}
                    <div className="space-y-8 pt-4">
                      <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary/40">Contato & Redes</h2>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Email de Contato (Exibido)</label>
                        <input 
                          type="email" 
                          value={profile.contact_email || ''}
                          onChange={(e) => setProfile({...profile, contact_email: e.target.value})}
                          className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                          placeholder="hello@beend.tech"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Instagram URL</label>
                          <input 
                            type="text" 
                            value={profile.instagram_url || ''}
                            onChange={(e) => setProfile({...profile, instagram_url: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">LinkedIn URL</label>
                          <input 
                            type="text" 
                            value={profile.linkedin_url || ''}
                            onChange={(e) => setProfile({...profile, linkedin_url: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                            placeholder="https://linkedin.com/in/..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">GitHub URL</label>
                        <input 
                          type="text" 
                          value={profile.github_url || ''}
                          onChange={(e) => setProfile({...profile, github_url: e.target.value})}
                          className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Languages Sections */}
                  <div className="space-y-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary/40">Textos</h2>
                    <div className="space-y-6">
                      <div className="p-6 border border-brand-primary/5 bg-brand-primary/2">
                        <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-4">Português</div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] tracking-[0.1em] uppercase opacity-60 mb-1 block">Cargo (Ex: Desenvolvedor Senior)</label>
                            <input 
                              type="text" 
                              value={profile.role_pt || ''}
                              onChange={(e) => setProfile({...profile, role_pt: e.target.value})}
                              className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-1 focus:border-brand-primary outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] tracking-[0.1em] uppercase opacity-60 mb-1 block">Bio/Descrição</label>
                            <textarea 
                              value={profile.description_pt || ''}
                              onChange={(e) => setProfile({...profile, description_pt: e.target.value})}
                              className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-1 focus:border-brand-primary outline-none text-sm resize-none"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-brand-primary/5 bg-brand-primary/2">
                        <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold mb-4">English</div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] tracking-[0.1em] uppercase opacity-60 mb-1 block">Role (Ex: Senior Developer)</label>
                            <input 
                              type="text" 
                              value={profile.role_en || ''}
                              onChange={(e) => setProfile({...profile, role_en: e.target.value})}
                              className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-1 focus:border-brand-primary outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] tracking-[0.1em] uppercase opacity-60 mb-1 block">Bio/Description</label>
                            <textarea 
                              value={profile.description_en || ''}
                              onChange={(e) => setProfile({...profile, description_en: e.target.value})}
                              className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-1 focus:border-brand-primary outline-none text-sm resize-none"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-brand-primary/10 pt-8">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-3 px-12 py-5 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-black hover:bg-white transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Salvar Perfil
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center py-40">
                <Loader2 className="animate-spin opacity-40" size={40} />
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl">
            {profile ? (
              <form onSubmit={handleProfileSave} className="space-y-12">
                <div className="space-y-8">
                  <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary/40">Título & Descrição da Seção</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Título (PT)</label>
                      <input 
                        type="text" 
                        value={profile.skills_title_pt || ''}
                        onChange={(e) => setProfile({...profile, skills_title_pt: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Title (EN)</label>
                      <input 
                        type="text" 
                        value={profile.skills_title_en || ''}
                        onChange={(e) => setProfile({...profile, skills_title_en: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Descrição (PT)</label>
                      <textarea 
                        value={profile.skills_description_pt || ''}
                        onChange={(e) => setProfile({...profile, skills_description_pt: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-bold">Description (EN)</label>
                      <textarea 
                        value={profile.skills_description_en || ''}
                        onChange={(e) => setProfile({...profile, skills_description_en: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-primary/10 text-brand-primary pb-2 focus:border-brand-primary outline-none resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-8 pt-8">
                  <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary/40">Categorias de Stacks</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(profile.skills_json || []).map((cat: any, idx: number) => (
                      <div key={idx} className="p-6 bg-brand-primary/5 border border-brand-primary/10 space-y-4">
                        <input 
                          type="text" 
                          value={cat.name}
                          onChange={(e) => {
                            const newJson = [...profile.skills_json];
                            newJson[idx].name = e.target.value.toUpperCase();
                            setProfile({...profile, skills_json: newJson});
                          }}
                          className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-2 focus:border-brand-primary outline-none font-black tracking-widest text-xs"
                        />
                        <textarea 
                          value={cat.skills.join(', ')}
                          onChange={(e) => {
                            const newJson = [...profile.skills_json];
                            newJson[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                            setProfile({...profile, skills_json: newJson});
                          }}
                          className="w-full bg-transparent text-sm opacity-60 focus:opacity-100 outline-none resize-none"
                          rows={3}
                          placeholder="Skill 1, Skill 2, Skill 3..."
                        />
                        <p className="text-[9px] opacity-30 italic">Separe por vírgulas</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end border-t border-brand-primary/10 pt-8">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-3 px-12 py-5 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-black hover:bg-white transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Salvar Stacks
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center py-40">
                <Loader2 className="animate-spin opacity-40" size={40} />
              </div>
            )}
          </div>
        )}
      </main>

      <AnimatePresence>
        {editingProject && (
          <ProjectForm 
            project={editingProject} 
            onClose={() => setEditingProject(null)}
            onSave={handleSave}
            setEditingProject={setEditingProject}
            submitting={submitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

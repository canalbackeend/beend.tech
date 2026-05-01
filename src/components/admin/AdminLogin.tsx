import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Falha ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0902] text-brand-primary flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-primary/5 p-10 border border-brand-primary/10"
      >
        <div className="text-center mb-10">
          <div className="text-2xl font-black tracking-tighter mb-2">BEEND.TECH</div>
          <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">Admin Portal</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3 block font-bold">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-brand-primary/20 text-brand-primary pb-3 focus:border-brand-primary focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs font-bold uppercase tracking-widest pt-2">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-primary text-[#0d0902] text-[10px] tracking-[0.4em] uppercase font-black flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <LogIn size={16} />}
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Admin features will not work until configured in Settings.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export type Project = {
  id: string;
  slug: string;
  title_pt: string;
  title_en: string;
  category_pt: string;
  category_en: string;
  description_pt: string;
  description_en: string;
  briefing_pt: string;
  briefing_en: string;
  stack: string[];
  images: string[];
  external_url?: string;
  github_url?: string;
  created_at: string;
};

export type Profile = {
  id: string;
  name: string;
  role_pt: string;
  role_en: string;
  description_pt: string;
  description_en: string;
  image_url: string;
  projects_count: string;
  experience_years: string;
  skills_title_pt?: string;
  skills_title_en?: string;
  skills_description_pt?: string;
  skills_description_en?: string;
  skills_json?: any; // To store categories and their technologies
  contact_email?: string;
  instagram_url?: string;
  linkedin_url?: string;
  github_url?: string;
  updated_at?: string;
};

import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured=Boolean(url&&key&&url.startsWith('https://')&&!url.includes('your-supabase-project')&&key!=='your-anon-key-here');
export const supabase=isSupabaseConfigured?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { CURATED_AVATARS } from '../api/mockData.js';
import { validateUsername, checkUsernameCooldown } from '../utils/usernameValidation.js';
import { useToast } from './ToastContext.jsx';
const AuthContext=createContext(null); const USER_KEY='anistra_user_session'; const NAMES_KEY='anistra_registered_usernames';
export function AuthProvider({children}) {
 const {showToast}=useToast(); const [user,setUser]=useState(null); const [loading,setLoading]=useState(true); const [needsOnboarding,setNeedsOnboarding]=useState(false); const [googleLoginOpen,setGoogleLoginOpen]=useState(false);
 const persist=useCallback((next)=>{setUser(next);try{if(next)localStorage.setItem(USER_KEY,JSON.stringify(next));else localStorage.removeItem(USER_KEY);}catch{}},[]);
 useEffect(()=>{try{if(!localStorage.getItem(NAMES_KEY))localStorage.setItem(NAMES_KEY,'[]');const local=localStorage.getItem(USER_KEY);if(local&&!isSupabaseConfigured)persist(JSON.parse(local));}catch{};
 if(!supabase){setLoading(false);return;}
 let active=true;
 supabase.auth.getSession().then(({data})=>{if(!active)return;const sessionUser=data.session?.user;if(sessionUser){const avatar=sessionUser.user_metadata?.avatar_url||sessionUser.user_metadata?.picture||CURATED_AVATARS[1].url;persist({id:sessionUser.id,email:sessionUser.email,username:(sessionUser.user_metadata?.full_name||sessionUser.email?.split('@')[0]||'animefan').toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,20),avatar_url:avatar,google_avatar:avatar,created_at:sessionUser.created_at,profile_completed:true});}else if(isSupabaseConfigured)persist(null);setLoading(false);}).catch(()=>{if(active)setLoading(false);});
 const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{if(!active)return;const u=session?.user;if(u){const avatar=u.user_metadata?.avatar_url||u.user_metadata?.picture||CURATED_AVATARS[1].url;persist({id:u.id,email:u.email,username:(u.user_metadata?.full_name||u.email?.split('@')[0]||'animefan').toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,20),avatar_url:avatar,google_avatar:avatar,created_at:u.created_at,profile_completed:true});}else persist(null);});
 return ()=>{active=false;subscription.unsubscribe();};
 },[persist]);
 const signInWithGoogle=useCallback(async()=>{if(!supabase){setGoogleLoginOpen(true);showToast('Configure Supabase to enable Google sign-in.','warning');return;}const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin}});if(error)showToast(error.message,'error');},[showToast]);
 const signOut=useCallback(async()=>{if(supabase&&isSupabaseConfigured)await supabase.auth.signOut();persist(null);setNeedsOnboarding(false);},[persist]);
 const updateProfile=useCallback(async(updates)=>{const next={...user,...updates};persist(next);if(supabase&&isSupabaseConfigured&&user?.id){const {error}=await supabase.from('profiles').upsert({id:user.id,username:next.username,avatar_url:next.avatar_url,updated_at:new Date().toISOString()});if(error)showToast(error.message,'error');}return next;},[persist,showToast,user]);
 const value={user,loading,needsOnboarding,setNeedsOnboarding,googleLoginOpen,setGoogleLoginOpen,signInWithGoogle,signOut,updateProfile,validateUsername,checkUsernameCooldown,showToast};
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){const context=useContext(AuthContext);if(!context)throw new Error('useAuth must be used within AuthProvider');return context;}

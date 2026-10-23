import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { useAuth } from './AuthContext.jsx';
import { useToast } from './ToastContext.jsx';
const ReviewsContext=createContext(null); const KEY='anistra_reviews_local';
export function ReviewsProvider({children}) {
 const {user}=useAuth();const {showToast}=useToast();const [reviews,setReviews]=useState([]);const [loading,setLoading]=useState(false);
 useEffect(()=>{let active=true;async function load(){setLoading(true);try{if(supabase&&isSupabaseConfigured){const {data,error}=await supabase.from('reviews').select('*').order('created_at',{ascending:false}).limit(100);if(error)throw error;if(active)setReviews(data||[]);}else{const local=JSON.parse(localStorage.getItem(KEY)||'[]');if(active)setReviews(local);}}catch(e){showToast(e.message||'Could not load reviews.','error');}finally{if(active)setLoading(false);}}load();return()=>{active=false;};},[showToast,user?.id]);
 const persist=useCallback(async(next)=>{setReviews(next);if(!supabase||!isSupabaseConfigured){localStorage.setItem(KEY,JSON.stringify(next));}},[]);
 const getAnimeReviews=useCallback((id)=>reviews.filter(r=>String(r.anime_id)===String(id)),[reviews]);
 const addReview=useCallback(async(review)=>{const row={...review,user_id:user?.id||null,username:user?.username||'Anime fan',created_at:new Date().toISOString()};if(supabase&&isSupabaseConfigured){const {data,error}=await supabase.from('reviews').insert(row).select().single();if(error)throw error;setReviews(prev=>[data,...prev]);}else await persist([row,...reviews]);return row;},[persist,reviews,user]);
 const deleteReview=useCallback(async(id)=>{if(supabase&&isSupabaseConfigured){const {error}=await supabase.from('reviews').delete().eq('id',id).eq('user_id',user?.id);if(error)throw error;}await persist(reviews.filter(r=>String(r.id)!==String(id)));},[persist,reviews,user]);
 return <ReviewsContext.Provider value={{reviews,loading,getAnimeReviews,addReview,deleteReview}}>{children}</ReviewsContext.Provider>;
}
export function useReviews(){const context=useContext(ReviewsContext);if(!context)throw new Error('useReviews must be used within ReviewsProvider');return context;}

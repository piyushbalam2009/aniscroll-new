import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
const ToastContext=createContext(null);
export function ToastProvider({children}) {
 const [toasts,setToasts]=useState([]); const timers=useRef(new Map());
 const removeToast=useCallback((id)=>{const timer=timers.current.get(id);if(timer)clearTimeout(timer);timers.current.delete(id);setToasts(prev=>prev.filter(t=>t.id!==id));},[]);
 const showToast=useCallback((message,type='info',duration=3500)=>{const id=`${Date.now()}-${Math.random().toString(36).slice(2,8)}`;setToasts(prev=>[...prev,{id,message,type}]);if(duration>0)timers.current.set(id,setTimeout(()=>removeToast(id),duration));},[removeToast]);
 useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
 return <ToastContext.Provider value={{showToast,removeToast}}>{children}<div className="toast-container" role="region" aria-live="polite"><AnimatePresence mode="popLayout">{toasts.map(t=>{const Icon=t.type==='success'?CheckCircle2:t.type==='error'?AlertCircle:t.type==='warning'?AlertTriangle:Info;return <motion.div key={t.id} className={`toast toast--${t.type}`} initial={{opacity:0,y:-14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><Icon size={19}/><p>{t.message}</p><button onClick={()=>removeToast(t.id)} aria-label="Dismiss toast"><X size={16}/></button></motion.div>;})}</AnimatePresence></div></ToastContext.Provider>;
}
export function useToast(){const value=useContext(ToastContext);if(!value)throw new Error('useToast must be used within ToastProvider');return value;}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, RotateCcw, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { CURATED_AVATARS } from '../api/mockData.js';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export default function AvatarPickerModal({ isOpen, onClose, onSelectAvatar, currentAvatar }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const defaultAvatar = user?.google_avatar || CURATED_AVATARS[1]?.url;
  const [selectedUrl, setSelectedUrl] = useState(currentAvatar || defaultAvatar);
  const [uploading, setUploading] = useState(false);
  if (!isOpen) return null;
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please upload an image file.', 'warning'); return; }
    if (file.size > 4 * 1024 * 1024) { showToast('Image size must be under 4MB.', 'warning'); return; }
    setUploading(true);
    try {
      if (isSupabaseConfigured && supabase && user?.id) {
        const ext = file.name.split('.').pop() || 'png';
        const filePath = `${user.id}/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
        if (error) throw error;
        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        setSelectedUrl(data.publicUrl);
      } else {
        setSelectedUrl(await new Promise((resolve, reject) => {
          const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file);
        }));
      }
    } catch (error) { showToast(error.message || 'Could not upload avatar.', 'error'); }
    finally { setUploading(false); }
  };
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><motion.section className="avatar-modal" role="dialog" aria-modal="true" aria-label="Choose avatar" onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><header><h2>Choose your avatar</h2><button onClick={onClose} aria-label="Close"><X /></button></header><div className="avatar-grid">{CURATED_AVATARS.map((avatar) => <button key={avatar.id} className={selectedUrl === avatar.url ? 'selected' : ''} onClick={() => setSelectedUrl(avatar.url)} aria-label={avatar.name}><img src={avatar.url} alt="" />{selectedUrl === avatar.url && <Check />}</button>)}</div><label className="upload-button"><Upload size={16} /> {uploading ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} hidden /></label><footer><button onClick={() => setSelectedUrl(defaultAvatar)}><RotateCcw size={15} /> Reset</button><button onClick={() => { onSelectAvatar?.(selectedUrl); onClose?.(); }}>Use avatar</button></footer></motion.section></div>;
}

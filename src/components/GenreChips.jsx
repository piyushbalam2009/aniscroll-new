import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
export const GENRE_TILES=[{name:'Action',color:'#ef4444'},{name:'Adventure',color:'#f59e0b'},{name:'Comedy',color:'#facc15'},{name:'Drama',color:'#a78bfa'},{name:'Fantasy',color:'#34d399'},{name:'Horror',color:'#fb7185'},{name:'Mystery',color:'#60a5fa'},{name:'Romance',color:'#f472b6'},{name:'Sci-Fi',color:'#22d3ee'},{name:'Slice of Life',color:'#86efac'},{name:'Sports',color:'#fb923c'},{name:'Supernatural',color:'#c084fc'}];
export default function GenreChips(){return <section className="genre-chips"><h2><Sparkles size={17}/> Browse by genre</h2><div>{GENRE_TILES.map(g=><Link key={g.name} to={`/search?genre=${encodeURIComponent(g.name)}`} style={{'--genre-color':g.color}}>{g.name}</Link>)}</div></section>;}

import { Link } from 'react-router-dom';
import { Search,Sparkles } from 'lucide-react';
export default function MobileTopHeader(){return <header className="mobile-top-header"><Link to="/" className="brand-mark"><Sparkles size={19}/> ANISTRA</Link><Link to="/search" aria-label="Search anime"><Search size={20}/></Link></header>;}

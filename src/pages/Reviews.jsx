import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
export default function Reviews() { return <main className="simple-page"><MessageSquare size={36} /><h1>Community Reviews</h1><p>Explore reviews from anime fans on individual anime pages.</p><Link to="/search">Discover anime</Link></main>; }

import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame,Sparkles,TrendingUp } from 'lucide-react';
import { getTrendingAnime,getPopularAnime,getTopRatedAnime } from '../api/anilist.js';
import { MOCK_ANIME } from '../api/mockData.js';
import AnimeCarousel from '../components/AnimeCarousel.jsx';
import ContinueTrackingSection from '../components/ContinueTrackingSection.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
export default function Home(){const [trending,setTrending]=useState([]);const [popular,setPopular]=useState([]);const [top,setTop]=useState([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{let active=true;Promise.all([getTrendingAnime(12),getPopularAnime(18),getTopRatedAnime(18)]).then(([a,b,c])=>{if(active){setTrending(a);setPopular(b);setTop(c);}}).catch(()=>{if(active){setTrending(MOCK_ANIME);setPopular(MOCK_ANIME);setTop(MOCK_ANIME);}}).finally(()=>active&&setLoading(false));return()=>{active=false;};},[]);
 return <><ScrollToTop/><Navbar/><main className="home-page"><section className="home-hero"><div><p className="eyebrow"><Sparkles size={14}/> YOUR NEXT OBSESSION STARTS HERE</p><h1>Find your next <span>favourite</span> anime.</h1><p>Discover stories, track every episode, and share your anime journey.</p><div className="hero-actions"><Link to="/search">Explore anime</Link><Link to="/my-list">My watchlist</Link></div></div><div className="home-hero__art"><img src="/anistra-logo.png" alt="Anistra anime discovery" onError={e=>{e.currentTarget.style.display='none';}}/><span>YOUR ANIME UNIVERSE</span></div></section>{loading&&<p className="loading-state">Loading anime…</p>}<ContinueTrackingSection/><AnimeCarousel title="Trending now" subtitle="What anime fans are watching" items={trending} showRank viewAllLink="/search"/><AnimeCarousel title="Popular anime" subtitle="Fan-favourite series" items={popular} viewAllLink="/search"/><AnimeCarousel title="Top rated" subtitle="Highly rated stories" items={top} viewAllLink="/search"/></main><Footer/></>;}

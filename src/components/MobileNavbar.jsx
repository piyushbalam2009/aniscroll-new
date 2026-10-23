import { NavLink } from 'react-router-dom';
import { Home,Search,Bookmark,User } from 'lucide-react';
export default function MobileNavbar(){return <nav className="mobile-navbar"><NavLink to="/"><Home size={19}/><span>Home</span></NavLink><NavLink to="/search"><Search size={19}/><span>Discover</span></NavLink><NavLink to="/my-list"><Bookmark size={19}/><span>My List</span></NavLink><NavLink to="/profile"><User size={19}/><span>Profile</span></NavLink></nav>;}

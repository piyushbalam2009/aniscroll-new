import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimeCard from './AnimeCard.jsx';

export default function AnimeCarousel({ title, subtitle, items = [], showRank = false, viewAllLink = '/search', onOpenEpisodeTracker }) {
  const scrollRef = useRef(null);
  const scroll = (direction) => scrollRef.current?.scrollBy({ left: direction === 'left' ? -650 : 650, behavior: 'smooth' });
  if (!items?.length) return null;
  return (
    <section className="anime-section">
      <div className="anime-section__header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div className="anime-section__actions">{viewAllLink && <Link to={viewAllLink}>View all <ArrowRight size={15} /></Link>}<button aria-label="Scroll left" onClick={() => scroll('left')}><ChevronLeft size={18} /></button><button aria-label="Scroll right" onClick={() => scroll('right')}><ChevronRight size={18} /></button></div></div>
      <div className="anime-carousel" ref={scrollRef}>{items.map((anime, index) => <div className="anime-carousel__item" key={anime.id}>{<AnimeCard anime={anime} rank={showRank ? index + 1 : undefined} onOpenEpisodeTracker={onOpenEpisodeTracker} />}</div>)}</div>
    </section>
  );
}

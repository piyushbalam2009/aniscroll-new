import { Link } from 'react-router-dom';
import { Star, Bookmark, Check, Layers } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { getBaseFranchiseTitle } from '../utils/animeGrouping.js';

export default function AnimeCard({ anime, rank, onOpenEpisodeTracker }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  if (!anime) return null;
  const id = String(anime.id);
  const watchItem = watchlist.find((item) => String(item.anime_id) === id);
  const isInList = Boolean(watchItem);
  const rawTitle = anime.title?.english || anime.title?.romaji || 'Unknown Title';
  const title = getBaseFranchiseTitle(rawTitle);
  const cover = typeof anime.coverImage === 'string' ? anime.coverImage : (anime.coverImage?.extraLarge || anime.coverImage?.large || '');
  const score = anime.rating || (anime.averageScore ? (anime.averageScore / 20).toFixed(1) : null);
  const year = anime.seasonYear || anime.year;
  const handleBookmark = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isInList ? removeFromWatchlist(anime.id) : addToWatchlist(anime, 'Watching');
  };
  const handleTrack = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onOpenEpisodeTracker?.(anime);
  };
  return (
    <article className="anime-card">
      <Link to={`/anime/${anime.id}`} className="anime-card__link" aria-label={`View ${title}`}>
        <div className="anime-card__poster-wrap">
          {cover ? <img className="anime-card__poster" src={cover} alt={`${title} poster`} loading="lazy" /> : <div className="anime-card__poster anime-card__poster--empty">No image</div>}
          {rank != null && <span className="anime-card__rank">{String(rank).padStart(2, '0')}</span>}
          <button type="button" className="anime-card__bookmark" onClick={handleBookmark} aria-label={isInList ? 'Remove from list' : 'Add to list'} title={isInList ? 'Remove from list' : 'Add to list'}>{isInList ? <Check size={17} /> : <Bookmark size={17} />}</button>
          <div className="anime-card__overlay"><span><Layers size={14} /> {anime.format || 'ANIME'}</span>{onOpenEpisodeTracker && <button type="button" onClick={handleTrack}>Track episodes</button>}</div>
        </div>
        <h3 className="anime-card__title">{title.length > 35 ? `${title.slice(0, 32)}…` : title}</h3>
        <div className="anime-card__meta">{score && <span><Star size={13} fill="currentColor" /> {score}</span>}{year && <span>{year}</span>}{anime.episodes && <span>{anime.episodes} eps</span>}</div>
      </Link>
    </article>
  );
}

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Bookmark, Check, Calendar, Clock } from 'lucide-react';
import { getAnimeById } from '../api/anilist.js';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function AnimeDetails() {
  const { id } = useParams();
  const { watchlist, addToWatchlist, removeFromWatchlist, getWatchedCount } = useWatchlist();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getAnimeById(id)
      .then(value => { if (active) setAnime(value); })
      .catch(err => { if (active) setError(err.message || 'Unable to load this anime.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <main className="detail-page"><p>Loading anime…</p></main>;
  if (error || !anime) return <main className="detail-page"><p>{error || 'Anime not found.'}</p><Link to="/search">Browse anime</Link></main>;

  const title = anime.title?.english || anime.title?.romaji || 'Anime';
  const image = anime.bannerImage || anime.coverImage?.extraLarge || anime.coverImage?.large;
  const item = watchlist.find(entry => String(entry.anime_id) === String(anime.id));
  const watched = getWatchedCount(anime.id);

  return (
    <main className="detail-page">
      <Link className="back-link" to="/search"><ArrowLeft size={16} /> Back to explore</Link>
      <section className="detail-hero">
        {image && <img src={image} alt={title} />}
        <div>
          <p className="eyebrow">{anime.format || 'ANIME'}{anime.seasonYear ? ` · ${anime.seasonYear}` : ''}</p>
          <h1>{title}</h1>
          <div className="detail-stats">
            {anime.averageScore && <span><Star size={15} /> {(anime.averageScore / 10).toFixed(1)}/10</span>}
            {anime.episodes && <span>{anime.episodes} episodes</span>}
            {anime.duration && <span><Clock size={15} /> {anime.duration} min</span>}
            {anime.startDate?.year && <span><Calendar size={15} /> {anime.startDate.year}</span>}
          </div>
          <div className="detail-actions"><button onClick={() => item ? removeFromWatchlist(anime.id) : addToWatchlist(anime, 'Watching')}>{item ? <Check size={17} /> : <Bookmark size={17} />} {item ? 'In your list' : 'Add to list'}</button></div>
          <p>{(anime.description || 'No synopsis available.').replace(/<[^>]+>/g, ' ')}</p>
          {anime.genres?.length > 0 && <div className="genre-list">{anime.genres.map(value => <span key={value}>{value}</span>)}</div>}
        </div>
      </section>
      <section className="detail-subsection"><h2>Progress</h2><p>{watched} of {anime.episodes || '?'} episodes watched</p><div className="progress-track"><span style={{ width: `${Math.min(100, watched / (anime.episodes || 1) * 100)}%` }} /></div></section>
    </main>
  );
}

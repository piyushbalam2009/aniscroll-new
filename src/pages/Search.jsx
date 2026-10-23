import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import AnimeCard from '../components/AnimeCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { searchAnime } from '../api/anilist.js';
import { MOCK_ANIME } from '../api/mockData.js';
import { GENRE_TILES } from '../components/GenreChips.jsx';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [genre, setGenre] = useState(params.get('genre') || 'All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    searchAnime(query, { page, perPage: 24 })
      .then(data => {
        if (!active) return;
        const filtered = genre === 'All' ? data : data.filter(a => a.genres?.includes(genre));
        setItems(filtered.length ? filtered : (!query ? MOCK_ANIME.filter(a => genre === 'All' || a.genres?.includes(genre)) : []));
      })
      .catch(() => {
        if (active) setItems(MOCK_ANIME.filter(a =>
          (!query || (a.title?.english || a.title?.romaji || '').toLowerCase().includes(query.toLowerCase())) &&
          (genre === 'All' || a.genres?.includes(genre))
        ));
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query, genre, page]);

  useEffect(() => {
    setParams(current => {
      if (query) current.set('q', query); else current.delete('q');
      if (genre !== 'All') current.set('genre', genre); else current.delete('genre');
      return current;
    }, { replace: true });
  }, [query, genre, setParams]);

  const reset = () => { setQuery(''); setGenre('All'); setPage(1); };

  return (
    <main className="search-page">
      <header><p className="eyebrow">UNIVERSAL SEARCH</p><h1>Explore anime</h1><p>Find your next favourite series.</p></header>
      <div className="search-controls">
        <label><SearchIcon size={18} /><input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search anime…" /><button onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button></label>
        <button onClick={() => setFilters(value => !value)}><SlidersHorizontal size={16} /> Genres</button>
      </div>
      {filters && <div className="genre-filter"><button className={genre === 'All' ? 'active' : ''} onClick={() => setGenre('All')}>All</button>{GENRE_TILES.map(g => <button key={g.name} className={genre === g.name ? 'active' : ''} onClick={() => setGenre(g.name)}>{g.name}</button>)}</div>}
      {loading ? <p className="loading-state">Loading anime…</p> : items.length ? <div className="anime-grid">{items.map((anime, i) => <AnimeCard key={anime.id} anime={anime} rank={(page - 1) * 24 + i + 1} />)}</div> : <EmptyState type="search" title="No anime found" description="Try another title or genre." actionText="Reset filters" onAction={reset} />}
      <div className="pagination"><button disabled={page === 1} onClick={() => setPage(value => value - 1)}>Previous</button><span>Page {page}</span><button disabled={items.length < 24} onClick={() => setPage(value => value + 1)}>Next</button></div>
    </main>
  );
}

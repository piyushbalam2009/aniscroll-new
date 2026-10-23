import { Link, useParams } from 'react-router-dom';
export default function AnimeReviews() { const { id } = useParams(); return <main className="simple-page"><h1>Anime Reviews</h1><p>Reviews for this title are available on the anime details page.</p><Link to={`/anime/${id}`}>Back to anime</Link></main>; }

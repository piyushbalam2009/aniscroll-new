import { Link,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getAnimeById } from '../api/anilist.jsx';
import { useReviews } from '../context/ReviewsContext.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
export default function AnimeReviews(){const {id}=useParams();const {getAnimeReviews}=useReviews();const [anime,setAnime]=useState(null);useEffect(()=>{let active=true;getAnimeById(id).then(a=>active&&setAnime(a)).catch(()=>{});return()=>{active=false}},[id]);const reviews=getAnimeReviews(id);return <main className="reviews-page"><Link to={`/anime/${id}`}>← Back to anime</Link><h1>{anime?.title?.english||anime?.title?.romaji||'Anime'} reviews</h1>{reviews.length?reviews.map(r=><ReviewCard key={r.id} review={r}/>):<p>No reviews yet for this anime.</p>}</main>;}
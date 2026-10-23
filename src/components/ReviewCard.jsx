import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  const title = review.anime_title || review.animeTitle || 'Anime review';
  const author = review.username || review.user?.username || 'Anime fan';
  const score = review.score ?? review.rating;
  const body = review.content || review.review || review.text || '';
  return (
    <article className="review-card">
      <div className="review-card__header">
        <div><h3>{title}</h3><p className="muted">Review by {author}</p></div>
        {score != null && <span className="review-score"><Star size={14} /> {score}/10</span>}
      </div>
      {review.title && review.title !== title && <h4>{review.title}</h4>}
      {body && <p>{body}</p>}
      {review.created_at && <time dateTime={review.created_at}>{new Date(review.created_at).toLocaleDateString()}</time>}
    </article>
  );
}

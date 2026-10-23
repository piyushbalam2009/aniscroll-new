import { Link } from 'react-router-dom';
import { Bookmark, MessageSquare, Search, Compass } from 'lucide-react';

export default function EmptyState({ type = 'list', title, description, actionText, actionLink = '/search', onAction }) {
  const icons = { reviews: MessageSquare, search: Search, list: Bookmark, discover: Compass };
  const Icon = icons[type] || Bookmark;
  const defaults = {
    list: ['Your list is empty', 'Start discovering anime and build your personal collection.', 'Explore Anime'],
    reviews: ['No reviews yet', 'Share your thoughts about the anime you love.', 'Discover Anime'],
    search: ['No anime found', 'Try another title or keyword.', 'Clear Filters'],
    discover: ['Nothing to show yet', 'Explore anime to get started.', 'Explore Anime'],
  };
  const [defaultTitle, defaultDescription, defaultAction] = defaults[type] || defaults.list;
  return <div className="empty-state"><Icon size={42} strokeWidth={1.5} /><h2>{title || defaultTitle}</h2><p>{description || defaultDescription}</p>{(actionText || defaultAction) && (onAction ? <button onClick={onAction}>{actionText || defaultAction}</button> : <Link to={actionLink}>{actionText || defaultAction}</Link>)}</div>;
}

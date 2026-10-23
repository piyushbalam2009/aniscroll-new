import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { user, loading, signInWithGoogle } = useAuth();
  return (
    <main className="auth-page">
      <Link to="/" className="brand-mark">ANISTRA</Link>
      <section>
        <h1>{user ? 'You are signed in.' : 'Welcome back, anime fan.'}</h1>
        <p>Sign in to sync your watchlist and reviews.</p>
        {!user && !loading && <button onClick={signInWithGoogle}>Continue with Google</button>}
        <p className="muted">You can browse anime without signing in.</p>
        <Link to="/">Continue to Anistra</Link>
      </section>
    </main>
  );
}

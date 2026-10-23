import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { WatchlistProvider } from './context/WatchlistContext.jsx';
import { ReviewsProvider } from './context/ReviewsContext.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import AnimeDetails from './pages/AnimeDetails.jsx';
import Login from './pages/Login.jsx';
import MyList from './pages/MyList.jsx';
import Profile from './pages/Profile.jsx';
import Reviews from './pages/Reviews.jsx';
import AnimeReviews from './pages/AnimeReviews.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import './App.css';

function NotFound() {
  return <main className="not-found"><h1>Page not found</h1><a href="/">Return home</a></main>;
}

function App() {
  useEffect(() => { document.title = 'Anistra — Anime Discovery & Tracking'; }, []);
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WatchlistProvider>
            <ReviewsProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/anime/:id" element={<AnimeDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="/profile/:username?" element={<Profile />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/anime/:id/reviews" element={<AnimeReviews />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ReviewsProvider>
          </WatchlistProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

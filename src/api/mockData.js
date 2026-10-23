export const CURATED_AVATARS = [
  { id: 'avatar-1', name: 'Shadow Blade', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-2', name: 'Sakura Knight', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-3', name: 'Cyber Ronin', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-4', name: 'Mystic Mage', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-5', name: 'Crimson Hunter', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-6', name: 'Celestial Valkyrie', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-7', name: 'Neon Shinobi', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80' },
  { id: 'avatar-8', name: 'Abyssal Guardian', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=80' },
];

const makeAnime = (id, title, score, episodes, year, genres, image) => ({
  id: String(id), malId: null, title: { english: title, romaji: title },
  description: `${title} is featured in this demo catalogue. Open AniList-powered search for current metadata.`,
  coverImage: { large: image, extraLarge: image }, bannerImage: image,
  genres, averageScore: Math.round(score * 20), rating: score,
  episodes, seasonYear: year, year, format: 'TV', status: 'FINISHED',
});

export const MOCK_ANIME = [
  makeAnime(16498, 'Attack on Titan', 9.0, 25, 2013, ['Action', 'Drama'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498.jpg'),
  makeAnime(21, 'One Piece', 8.7, 1100, 1999, ['Action', 'Adventure'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21.jpg'),
  makeAnime(1, 'Cowboy Bebop', 8.8, 26, 1998, ['Action', 'Sci-Fi'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1.jpg'),
  makeAnime(20, 'Naruto', 8.0, 220, 2002, ['Action', 'Adventure'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20.jpg'),
  makeAnime(5114, 'Fullmetal Alchemist: Brotherhood', 9.1, 64, 2009, ['Action', 'Adventure'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114.jpg'),
  makeAnime(11061, 'Hunter x Hunter', 9.0, 148, 2011, ['Action', 'Adventure'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061.jpg'),
  makeAnime(101922, 'Demon Slayer: Kimetsu no Yaiba', 8.5, 26, 2019, ['Action', 'Supernatural'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922.jpg'),
  makeAnime(113415, 'Jujutsu Kaisen', 8.6, 24, 2020, ['Action', 'Supernatural'], 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415.jpg'),
];

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gamepad2, 
  TrendingUp, 
  Search, 
  Play, 
  Star, 
  Clock, 
  ChevronLeft, 
  LayoutGrid, 
  Flame, 
  Globe,
  Info,
  Heart
} from 'lucide-react';

// Sample Game Data
const GAMES_DATA = [
  {
    id: 'agario',
    title: 'Agar.io',
    category: 'IO Games',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
    rating: 4.5,
    plays: '1.2M',
    url: 'https://agar.io/',
    description: 'The smash hit game! Control your cell and eat other players to grow larger.'
  },
  {
    id: 'krunker',
    title: 'Krunker.io',
    category: 'IO Games',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop',
    rating: 4.8,
    plays: '800K',
    url: 'https://krunker.io/',
    description: 'A fast-paced pixelated first-person shooter.'
  },
  {
    id: 'shellshockers',
    title: 'Shell Shockers',
    category: 'IO Games',
    thumbnail: 'https://images.unsplash.com/photo-1552824730-ce71accbb2d4?w=400&h=250&fit=crop',
    rating: 4.7,
    plays: '500K',
    url: 'https://shellshock.io/',
    description: 'The world\'s most advanced egg-based multiplayer shooter.'
  },
  {
    id: 'slither',
    title: 'Slither.io',
    category: 'IO Games',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=250&fit=crop',
    rating: 4.6,
    plays: '2.5M',
    url: 'https://slither.io/',
    description: 'Grow your snake by eating glowing orbs and outsmarting others.'
  },
  {
    id: 'subway',
    title: 'Subway Surfers',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=250&fit=crop',
    rating: 4.9,
    plays: '5M+',
    url: 'https://www.crazygames.com/embed/subway-surfers',
    description: 'Dash as fast as you can through the subway tracks.'
  },
  {
    id: 'minecraft-classic',
    title: 'Minecraft Classic',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1587573089734-09cb99c7a0b4?w=400&h=250&fit=crop',
    rating: 4.9,
    plays: '10M+',
    url: 'https://classic.minecraft.net/',
    description: 'The classic block-building game in your browser.'
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop',
    rating: 4.4,
    plays: '1.1M',
    url: 'https://www.crazygames.com/embed/crossy-road',
    description: 'Why did the chicken cross the road?'
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = ['All', 'IO Games', 'Trending', 'New'];

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesTab = activeTab === 'All' || game.category === activeTab;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const toggleFavorite = (e, gameId) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const GameCard = ({ game }) => (
    <div 
      onClick={() => setSelectedGame(game)}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-video">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Game+Thumbnail'; }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-indigo-600 p-3 rounded-full shadow-lg">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        <button 
          onClick={(e) => toggleFavorite(e, game.id)}
          className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
        >
          <Heart className={`w-4 h-4 ${favorites.includes(game.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate">{game.title}</h3>
          <span className="flex items-center text-xs text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 fill-current mr-1" /> {game.rating}
          </span>
        </div>
        <div className="flex items-center text-xs text-zinc-400 gap-3">
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {game.plays}</span>
          <span className="bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">{game.category}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setSelectedGame(null); setActiveTab('All'); }}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">TPMath</span>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search trending games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-medium hover:text-white transition-colors">Discord</button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {!selectedGame ? (
          <>
            {/* Hero Section */}
            <section className="mb-12 relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=400&fit=crop" 
                className="w-full h-80 object-cover" 
                alt="Featured Game"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase animate-pulse">Live Now</span>
                  <span className="text-zinc-400 text-sm">Most Played this week</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase italic">Battle Royale IO</h1>
                <p className="text-zinc-400 max-w-md mb-6 line-clamp-2">Experience intense multiplayer action in the definitive browser battle royale. No downloads required, just jump in and play!</p>
                <button 
                  onClick={() => setSelectedGame(GAMES_DATA[0])}
                  className="bg-white text-black hover:bg-zinc-200 w-fit px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all group"
                >
                  <Play className="w-5 h-5 fill-current" /> Play Free Now
                </button>
              </div>
            </section>

            {/* Categories & Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                      activeTab === cat 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {cat === 'All' && <LayoutGrid className="inline-block w-4 h-4 mr-2" />}
                    {cat === 'IO Games' && <Globe className="inline-block w-4 h-4 mr-2" />}
                    {cat === 'Trending' && <Flame className="inline-block w-4 h-4 mr-2" />}
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {filteredGames.length} Games found</span>
              </div>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-400">No games found</h3>
                <p className="text-zinc-600">Try adjusting your search or category filter</p>
              </div>
            )}
          </>
        ) : (
          /* Game Player View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setSelectedGame(null)}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Games
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <div className="aspect-video bg-black relative">
                    <iframe 
                      src={selectedGame.url} 
                      className="w-full h-full border-none"
                      title={selectedGame.title}
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">{selectedGame.title}</h2>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-sm font-bold">
                          <Star className="w-4 h-4 fill-current mr-1.5" /> {selectedGame.rating}
                        </span>
                        <span className="text-zinc-500 text-sm flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {selectedGame.plays} plays
                        </span>
                        <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {selectedGame.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={(e) => toggleFavorite(e, selectedGame.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
                          favorites.includes(selectedGame.id) 
                            ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(selectedGame.id) ? 'fill-current' : ''}`} />
                        Favorite
                      </button>
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                        Full Screen
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-500" /> About the Game
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {selectedGame.description || "Enjoy this amazing title directly in your browser. No downloads, no installs, just pure gaming fun. Join thousands of other players worldwide!"}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                      <div className="text-zinc-500 mb-1">Developer</div>
                      <div className="text-white font-medium">TPMath Studios</div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                      <div className="text-zinc-500 mb-1">Released</div>
                      <div className="text-white font-medium">2024</div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                      <div className="text-zinc-500 mb-1">Genre</div>
                      <div className="text-white font-medium">{selectedGame.category}</div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                      <div className="text-zinc-500 mb-1">Platform</div>
                      <div className="text-white font-medium">Browser (HTML5)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar / Related Games */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2 px-1">
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> Hot Right Now
                  </h4>
                </div>
                {GAMES_DATA.filter(g => g.id !== selectedGame.id).slice(0, 5).map(game => (
                  <div 
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="flex gap-4 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 cursor-pointer group transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={game.thumbnail} className="w-full h-full object-cover" alt={game.title} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h5 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors truncate">{game.title}</h5>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{game.category}</span>
                      <div className="flex items-center text-[10px] text-yellow-500 mt-1 font-bold">
                        <Star className="w-3 h-3 fill-current mr-1" /> {game.rating}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-6 rounded-3xl bg-indigo-600 shadow-xl shadow-indigo-600/10 text-center space-y-4">
                  <Gamepad2 className="w-10 h-10 text-white mx-auto opacity-50" />
                  <h4 className="text-white font-black uppercase italic">Join Our Discord</h4>
                  <p className="text-indigo-100 text-xs">Stay updated with the latest releases and join the community tournaments!</p>
                  <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-full text-xs">Join Server</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 mt-20 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-800 p-1 rounded-lg">
              <Gamepad2 className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">TPMath</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Submit Game</a>
          </div>
          <div className="text-xs text-zinc-600">
            © 2025 TPMath. No downloads. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

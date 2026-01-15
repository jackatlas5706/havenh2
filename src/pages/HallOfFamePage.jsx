import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, Crown, Swords, Coins, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HallOfFamePage = () => {
  const [activeRanking, setActiveRanking] = useState('level');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock leaderboard data
  const generatePlayers = (count, type) => {
    const names = ['DragonSlayer', 'ShadowKnight', 'MysticSage', 'IronFist', 'SwiftBlade', 'DarkMage', 'GoldenWarrior', 'SilentAssassin', 'StormBringer', 'FireLord'];
    const factions = ['Knights of Dawn', 'Shadow Syndicate', 'Arcane Collective', 'Iron Brotherhood', 'Merchant Guild', 'Forest Keepers', 'Dragon Clan', 'Silver Circle'];
    
    return Array.from({ length: count }, (_, i) => ({
      rank: i + 1,
      name: `${names[i % names.length]}${Math.floor(Math.random() * 1000)}`,
      level: type === 'level' ? 50 - i : Math.floor(Math.random() * 50) + 1,
      faction: factions[i % factions.length],
      wealth: type === 'wealth' ? 100000 - (i * 1000) : Math.floor(Math.random() * 50000),
      pvpWins: type === 'pvp' ? 500 - (i * 5) : Math.floor(Math.random() * 200),
      glory: type === 'glory' ? 1000 - (i * 10) : Math.floor(Math.random() * 500),
      achievements: Math.floor(Math.random() * 50) + 10
    }));
  };

  const rankings = {
    level: generatePlayers(50, 'level'),
    wealth: generatePlayers(50, 'wealth'),
    pvp: generatePlayers(50, 'pvp'),
    glory: generatePlayers(50, 'glory')
  };

  const rankingTypes = [
    { id: 'level', label: 'Level', icon: Star, color: 'purple' },
    { id: 'wealth', label: 'Wealth', icon: Coins, color: 'gold' },
    { id: 'pvp', label: 'PvP', icon: Swords, color: 'crimson' },
    { id: 'glory', label: 'Glory', icon: Trophy, color: 'blue' }
  ];

  const filteredPlayers = rankings[activeRanking].filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-slate-400';
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) return <Crown className="w-5 h-5" />;
    return <span className="font-bold">#{rank}</span>;
  };

  return (
    <>
      <Helmet>
        <title>Hall of Fame - Realm of Legends</title>
        <meta name="description" content="View top players and rankings" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Hall of Fame</h1>
          <p className="text-slate-400">The most legendary adventurers</p>
        </div>

        {/* Ranking Type Selector */}
        <div className="flex flex-wrap gap-2">
          {rankingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveRanking(type.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeRanking === type.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-slate-100 shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-100 border-2 border-slate-700'
              }`}
            >
              <type.icon className="w-5 h-5" />
              {type.label} Rankings
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-slate-900 border-b border-slate-700 text-slate-400 text-sm font-semibold">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-3">Faction</div>
            <div className="col-span-2">Level</div>
            <div className="col-span-2">
              {activeRanking === 'level' && 'Level'}
              {activeRanking === 'wealth' && 'Gold'}
              {activeRanking === 'pvp' && 'Wins'}
              {activeRanking === 'glory' && 'Glory'}
            </div>
          </div>

          <div className="divide-y divide-slate-700">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-700/50 transition-colors items-center"
              >
                <div className={`col-span-1 flex items-center ${getRankColor(player.rank)}`}>
                  {getRankIcon(player.rank)}
                </div>
                
                <div className="col-span-4">
                  <p className="text-slate-100 font-semibold">{player.name}</p>
                  <p className="text-slate-400 text-xs">{player.achievements} achievements</p>
                </div>
                
                <div className="col-span-3 text-slate-300 text-sm">{player.faction}</div>
                
                <div className="col-span-2 text-slate-100 font-semibold">
                  {player.level}
                </div>
                
                <div className="col-span-2 text-slate-100 font-bold">
                  {activeRanking === 'level' && player.level}
                  {activeRanking === 'wealth' && `${player.wealth.toLocaleString()}g`}
                  {activeRanking === 'pvp' && player.pvpWins}
                  {activeRanking === 'glory' && player.glory}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HallOfFamePage;

import React from 'react';
import { Scroll, CheckCircle, MapPin, Coins, Star } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';

const QuestsPage = () => {
  const { gameState } = useGame();

  const difficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-green-400 border-green-900/30 bg-green-900/10';
      case 'Medium': return 'text-amber-400 border-amber-900/30 bg-amber-900/10';
      case 'Hard': return 'text-red-400 border-red-900/30 bg-red-900/10';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif flex items-center gap-3">
            <Scroll className="text-amber-500"/> Quest Journal
          </h1>
          <p className="text-slate-400 mt-1">Accept tasks to earn Gold, Renown, and Experience.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-bold text-slate-400 uppercase">Available: {gameState.quests.available.length}</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-bold text-slate-400 uppercase">Active: 0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {gameState.quests.available.map((quest, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={quest.id} 
            className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-all relative overflow-hidden group"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-5 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-xl text-slate-200 font-serif group-hover:text-amber-400 transition-colors">{quest.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${difficultyColor(quest.difficulty)}`}>{quest.difficulty}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-2xl">{quest.description}</p>
                
                <div className="flex gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12}/> Aethermoor</span>
                  <span className="flex items-center gap-1 text-slate-400 uppercase tracking-wide border px-1 rounded border-slate-700">{quest.type}</span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 min-w-[150px] border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <div className="text-right">
                  <div className="text-amber-400 font-bold flex items-center justify-end gap-1"><Coins size={14}/> {quest.reward}g</div>
                  <div className="text-purple-400 font-bold text-sm flex items-center justify-end gap-1"><Star size={12}/> {quest.xp} XP</div>
                </div>
                <button className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold rounded shadow-lg shadow-amber-900/20 transition-all active:scale-95 w-full md:w-auto">
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default QuestsPage;

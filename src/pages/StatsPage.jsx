import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

const StatsPage = () => {
  const { gameState } = useGame();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-400 font-serif flex items-center gap-3"><BarChart2/> Legend Records</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(gameState.stats).map(([k,v]) => {
           if(k.startsWith('max')) return null;
           return (
            <div key={k} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
               <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{k}</div>
               <div className="text-2xl font-bold text-slate-200 font-mono">{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StatsPage;

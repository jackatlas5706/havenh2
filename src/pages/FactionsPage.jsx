import React from 'react';
import { Flag, Shield, Skull, Scroll, Zap, Hammer, Music, Leaf } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

const FactionsPage = () => {
  const { gameState } = useGame();

  const getIcon = (id) => {
    switch(id) {
      case 'silver_dawn': return Shield;
      case 'shadow_syndicate': return Skull;
      case 'draconic_covenant': return Zap;
      case 'elven_circle': return Leaf;
      case 'dwarven_stronghold': return Hammer;
      case 'necro_cabal': return Skull;
      case 'druidic_conclave': return Leaf;
      case 'bards_collective': return Music;
      default: return Flag;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 font-serif mb-4 flex items-center justify-center gap-3">
          <Flag size={32}/> Factions of the Realm
        </h1>
        <p className="text-slate-400">
          Align yourself with the powers of Aethermoor. Gain reputation, unlock exclusive quests, and earn unique rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameState.factions.map(faction => {
          const Icon = getIcon(faction.id);
          return (
            <div key={faction.id} className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 group-hover:border-purple-500/50 transition-colors">
                    <Icon className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 font-serif">{faction.name}</h2>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Neutral</span>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 h-10">{faction.desc}</p>
                
                <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Reputation</span>
                    <span>0 / 1000</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-purple-600"></div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 text-sm font-bold transition-colors">
                    View Quests
                  </button>
                  <button className="px-4 py-2 bg-purple-900/20 text-purple-400 hover:bg-purple-900/40 rounded border border-purple-900/50 text-sm font-bold transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FactionsPage;

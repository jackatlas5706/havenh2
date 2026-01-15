import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Skull, AlertTriangle, EyeOff } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';

const NervePage = () => {
  const { gameState, commitCrime } = useGame();

  const crimes = [
    { name: 'Pickpocket Merchant', cost: 2, diff: 15, reward: 25, desc: 'Steal a purse from a distracted trader.' },
    { name: 'Raid Supply Caravan', cost: 5, diff: 40, reward: 120, desc: 'Ambush a wagon carrying goods to the capital.' },
    { name: 'Infiltrate Noble Estate', cost: 10, diff: 65, reward: 400, desc: 'Bypass guards to loot the treasury.' },
    { name: 'Assassinate Target', cost: 15, diff: 85, reward: 1500, desc: 'Eliminate a high-profile mark for the Syndicate.' },
  ];

  return (
    <div className="space-y-8">
      <div className="relative p-6 rounded-xl border border-red-900/30 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-red-500 font-serif flex items-center gap-3 mb-2">
              <Skull size={28}/> Shadow Operations
            </h1>
            <p className="text-slate-400 max-w-xl">
              High-risk ventures for those with the nerve to take what isn't theirs. Failure may result in imprisonment.
            </p>
          </div>
          <div className="w-full md:w-64">
            <StatBar value={gameState.stats.adrenaline} max={gameState.stats.maxAdrenaline} color="orange" label="Adrenaline" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crimes.map((crime, i) => (
          <div key={i} className="bg-slate-900 p-5 rounded-lg border border-slate-700 hover:border-red-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-slate-800 rounded-bl text-[10px] text-slate-500 border-l border-b border-slate-700">
               Tier {i + 1}
            </div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-lg text-slate-200 font-serif mb-1 group-hover:text-red-400 transition-colors">{crime.name}</h3>
              <p className="text-xs text-slate-500 mb-4 h-8">{crime.desc}</p>
              
              <div className="flex justify-between text-sm text-slate-400 bg-slate-950/50 p-2 rounded mb-4">
                <span className="text-orange-400 font-bold">-{crime.cost} Adrenaline</span>
                <span className="text-yellow-500 font-bold">{crime.reward}g</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-xs">
                <span className="text-slate-500">Success Chance:</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${100 - crime.diff}%` }}></div>
                </div>
                <span className="text-red-400 font-bold">{100 - crime.diff}%</span>
              </div>

              <button 
                onClick={() => commitCrime(crime.cost, crime.diff, crime.reward)}
                className="w-full bg-red-900/10 text-red-400 border border-red-900/40 py-2.5 rounded hover:bg-red-900/20 hover:border-red-500/50 transition-all font-bold flex items-center justify-center gap-2"
              >
                <EyeOff size={16}/> Execute
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NervePage;

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Map, Compass } from 'lucide-react';

const TravelPage = () => {
  const { gameState } = useGame();

  const locations = [
    { name: 'Kingdom of Aethermoor', desc: 'The shining capital of the human realms.', cost: 0, danger: 'None' },
    { name: 'The Crimson Griffin', desc: 'A lawless tavern on the borderlands.', cost: 10, danger: 'Low' },
    { name: 'Forge of Drakenheart', desc: 'Ancient dwarven city deep within the mountain.', cost: 25, danger: 'Medium' },
    { name: 'Shadowfell Swamp', desc: 'A cursed land where the dead do not sleep.', cost: 50, danger: 'High' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-500 font-serif flex items-center gap-3"><Map/> World Map</h1>
      
      {gameState.status.traveling ? (
         <div className="text-center p-20 bg-slate-900 rounded-lg animate-pulse border border-slate-700">
           <Compass className="mx-auto text-green-500 mb-6 animate-spin" size={64} />
           <h2 className="text-2xl font-bold font-serif text-slate-200">Journeying to {gameState.status.destination}...</h2>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map(loc => (
            <div key={loc.name} className={`bg-slate-900 p-6 rounded-xl border-2 transition-all ${gameState.character.location === loc.name ? 'border-green-500 bg-green-900/10' : 'border-slate-700 hover:border-slate-500'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold font-serif text-slate-200">{loc.name}</h3>
                {gameState.character.location === loc.name && <span className="text-green-500 text-xs font-bold uppercase border border-green-500 px-2 py-0.5 rounded">Current</span>}
              </div>
              <p className="text-slate-400 mb-4 h-10 text-sm">{loc.desc}</p>
              
              <div className="flex justify-between items-center text-xs text-slate-500 mb-4 bg-slate-950 p-2 rounded">
                 <span>Cost: {loc.cost} Mana</span>
                 <span>Danger: <span className={loc.danger === 'High' ? 'text-red-400' : 'text-slate-400'}>{loc.danger}</span></span>
              </div>

              {gameState.character.location !== loc.name ? (
                <button 
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded border border-slate-600 font-bold transition-colors"
                >
                  Travel
                </button>
              ) : (
                <button disabled className="w-full bg-green-900/20 text-green-500 py-2 rounded border border-green-900/50 font-bold cursor-default">
                  You are here
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelPage;

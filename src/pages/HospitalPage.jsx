import React from 'react';
import { Heart, Plus } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';
import { useGame } from '@/contexts/GameContext';

const HospitalPage = () => {
  const { gameState, addLog } = useGame();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-400 font-serif flex items-center gap-3"><Heart className="text-pink-500"/> The Sanctuary</h1>
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-pink-500/30">
          <Plus size={40} className="text-pink-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-200 font-serif mb-2">Rest & Recovery</h2>
        <p className="text-slate-400 mb-8">Even the mightiest heroes need tending to. Restore your Vitality here.</p>
        
        <div className="max-w-md mx-auto mb-8">
          <StatBar value={gameState.stats.vitality} max={gameState.stats.maxVitality} color="red" label="Current Vitality" className="h-8" />
        </div>
        
        <div className="flex justify-center gap-4">
          <div className="text-left bg-slate-950 p-4 rounded border border-slate-800">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Full Heal</div>
            <div className="text-xl font-bold text-yellow-500">100 Gold</div>
          </div>
          <button 
            className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-pink-900/20 transition-all active:scale-95 flex items-center" 
            onClick={() => addLog('Your wounds have been tended to.', 'success')}
          >
            Heal Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default HospitalPage;

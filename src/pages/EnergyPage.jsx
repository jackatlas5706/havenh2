import React from 'react';
import { Zap } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';
import { useGame } from '@/contexts/GameContext';

const EnergyPage = () => {
  const { gameState } = useGame();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-400 font-serif flex items-center gap-3"><Zap/> Arcane Mana Well</h1>
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 text-center">
        <p className="text-slate-400 mb-6">Mana is the source of all magic and exertion in the realm. It regenerates over time.</p>
        <div className="max-w-md mx-auto">
          <StatBar label="Mana Pool" value={gameState.stats.mana} max={gameState.stats.maxMana} color="blue" className="h-8" />
        </div>
      </div>
    </div>
  );
};
export default EnergyPage;

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Dumbbell, BookOpen, Target, Sword } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';

const TrainingPage = () => {
  const { gameState, updateStat, consumeResource } = useGame();

  const skills = [
    { id: 'strength', name: 'Swordsmanship', desc: 'Increases physical damage.', icon: Sword, color: 'red' },
    { id: 'defense', name: 'Fortitude', desc: 'Reduces incoming damage.', icon: Dumbbell, color: 'blue' },
    { id: 'dexterity', name: 'Archery', desc: 'Increases critical chance and speed.', icon: Target, color: 'green' },
    { id: 'intelligence', name: 'Spellcraft', desc: 'Enhances magical abilities.', icon: BookOpen, color: 'purple' },
  ];

  const train = (stat) => {
    if(consumeResource('mana', 5)) {
      updateStat(stat, 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative p-8 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        <h1 className="relative text-3xl font-bold text-blue-400 font-serif flex items-center gap-3 z-10">
          <BookOpen className="text-blue-500"/> Academy of Heroes
        </h1>
        <p className="relative text-slate-400 mt-2 z-10 max-w-2xl">
          Hone your skills and master the arts of war and magic. Training consumes Mana but grants permanent strength.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-200 font-serif">{skill.name}</h3>
              <skill.icon className={`text-${skill.color}-500 group-hover:scale-110 transition-transform`} />
            </div>
            
            <p className="text-xs text-slate-500 mb-6 h-8">{skill.desc}</p>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Level</span>
                <span className="text-white font-bold">{gameState.stats[skill.id]}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${skill.color}-600`} 
                  style={{ width: `${Math.min(100, gameState.stats[skill.id])}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={() => train(skill.id)}
              className={`w-full bg-${skill.color}-900/30 text-${skill.color}-400 py-3 rounded-lg font-bold border border-${skill.color}-500/30 hover:bg-${skill.color}-900/50 hover:border-${skill.color}-500 transition-all flex items-center justify-center gap-2`}
            >
              <span>Train</span>
              <span className="text-xs bg-slate-950 px-2 py-0.5 rounded text-slate-400">-5 Mana</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Sword, Shield, Skull, Zap } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';
import { motion } from 'framer-motion';

const CombatPage = () => {
  const { gameState, consumeResource, addLog } = useGame();
  const [inCombat, setInCombat] = useState(false);
  const [enemy, setEnemy] = useState(null);
  const [combatLog, setCombatLog] = useState([]);

  const enemies = [
    { name: 'Goblin Scavenger', hp: 40, maxHp: 40, dmg: 4, xp: 15, gold: 10, type: 'Humanoid', desc: 'A wretched creature picking through refuse.' },
    { name: 'Shadow Wraith', hp: 80, maxHp: 80, dmg: 10, xp: 50, gold: 35, type: 'Undead', desc: 'A spectral form chilling the air around it.' },
    { name: 'Orc Warlord', hp: 150, maxHp: 150, dmg: 18, xp: 120, gold: 80, type: 'Humanoid', desc: 'A towering brute clad in iron armor.' },
    { name: 'Young Drake', hp: 300, maxHp: 300, dmg: 35, xp: 500, gold: 250, type: 'Beast', desc: 'A winged terror breathing fire.' },
  ];

  const startFight = (target) => {
    if (!consumeResource('mana', 5)) return;
    setEnemy({ ...target });
    setInCombat(true);
    setCombatLog([{ msg: `You draw your weapon against the ${target.name}!`, type: 'info' }]);
  };

  const playerAttack = (type = 'normal') => {
    if (!enemy) return;
    
    let dmg = 0;
    let cost = 0;

    if (type === 'normal') {
      dmg = Math.floor(gameState.stats.strength * 1.2) + Math.floor(Math.random() * 5);
      cost = 1; // Stamina/Mana cost handled simply here
    } else if (type === 'heavy') {
      if (!consumeResource('adrenaline', 2)) return;
      dmg = Math.floor(gameState.stats.strength * 2.5);
      cost = 2;
    }

    const newHp = Math.max(0, enemy.hp - dmg);
    
    setCombatLog(prev => [...prev, { msg: `You struck the ${enemy.name} for ${dmg} damage!`, type: 'success' }]);
    
    if (newHp <= 0) {
      addLog(`Victory! Defeated ${enemy.name}. Gained ${enemy.xp} XP and ${enemy.gold} Gold.`, 'success');
      setInCombat(false);
      setEnemy(null);
    } else {
      setEnemy(prev => ({ ...prev, hp: newHp }));
      setTimeout(enemyTurn, 600);
    }
  };

  const enemyTurn = () => {
    if (!enemy) return;
    const defense = Math.floor(gameState.stats.fortitude / 2);
    const rawDmg = enemy.dmg + Math.floor(Math.random() * 4);
    const dmg = Math.max(1, rawDmg - defense);
    
    setCombatLog(prev => [...prev, { msg: `The ${enemy.name} attacks! You take ${dmg} damage.`, type: 'error' }]);
    // In a full implementation, update player HP here via context
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-red-500 font-serif flex items-center gap-3"><Sword size={32}/> The Battlefield</h1>
        {!inCombat && <div className="text-slate-400 italic">Select your opponent wisely...</div>}
      </div>
      
      {!inCombat ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enemies.map((e, i) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={i} 
              className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-red-500/50 cursor-pointer shadow-lg group relative overflow-hidden" 
              onClick={() => startFight(e)}
            >
              <div className="absolute top-0 right-0 p-2 bg-slate-800 rounded-bl-lg text-xs font-bold text-slate-400 border-l border-b border-slate-700">
                Lvl {Math.floor(e.xp / 10)}
              </div>
              <h3 className="font-bold text-lg text-slate-200 mb-1 font-serif">{e.name}</h3>
              <p className="text-xs text-slate-500 mb-4 italic">{e.desc}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Vitality</span>
                  <span>{e.hp}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-full"></div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-amber-500 font-bold mt-4 pt-4 border-t border-slate-800">
                <span>XP: {e.xp}</span>
                <span>Gold: {e.gold}</span>
              </div>
              
              <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Battle Arena */}
          <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-red-900/30 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50"></div>
            <div className="relative p-8 z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-red-400 font-serif mb-2">{enemy.name}</h2>
                  <div className="w-64">
                    <StatBar value={enemy.hp} max={enemy.maxHp} color="red" label="Vitality" />
                  </div>
                </div>
                <Skull size={64} className="text-red-900/50 animate-pulse" />
              </div>

              <div className="flex gap-4 mt-12">
                <button onClick={() => playerAttack('normal')} className="flex-1 bg-gradient-to-t from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg border border-red-500 transition-all active:scale-95 flex flex-col items-center justify-center gap-1">
                  <span>Strike</span>
                  <span className="text-xs font-normal opacity-70">Normal Attack</span>
                </button>
                <button onClick={() => playerAttack('heavy')} className="flex-1 bg-gradient-to-t from-orange-900 to-orange-700 hover:from-orange-800 hover:to-orange-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg border border-orange-500 transition-all active:scale-95 flex flex-col items-center justify-center gap-1">
                  <span>Power Blow</span>
                  <span className="text-xs font-normal opacity-70">2 Adrenaline</span>
                </button>
                <button onClick={() => setInCombat(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-lg font-bold border border-slate-600 transition-all">
                  Retreat
                </button>
              </div>
            </div>
          </div>

          {/* Combat Log */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 h-[400px] overflow-y-auto font-mono text-sm shadow-inner scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            <h3 className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">Combat Log</h3>
            <div className="flex flex-col-reverse gap-2">
              {combatLog.map((log, i) => (
                <div key={i} className={`p-2 rounded border-l-2 ${
                  log.type === 'success' ? 'border-green-500 bg-green-900/10 text-green-400' : 
                  log.type === 'error' ? 'border-red-500 bg-red-900/10 text-red-400' : 
                  'border-blue-500 bg-blue-900/10 text-blue-300'
                }`}>
                  {log.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatPage;

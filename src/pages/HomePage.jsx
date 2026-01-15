import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Shield, Zap, Map, Activity, Clock, Skull, Coins, Sword } from 'lucide-react';
import StatBar from '@/components/ui/StatBar';
import { motion } from 'framer-motion';

const HomePage = ({ onNavigate }) => {
  const { gameState } = useGame();

  const Widget = ({ title, children, icon: Icon, onClick, className = '' }) => (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`bg-slate-900/90 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h3 className="font-bold text-slate-100 font-serif tracking-wide">{title}</h3>
        {Icon && <Icon className="text-amber-500" size={20} />}
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16" 
          alt="Fantasy Landscape" 
          className="w-full h-48 md:h-64 object-cover opacity-50"
        />
        <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-2 drop-shadow-lg">
              Hail, {gameState.character.name}
            </h1>
            <p className="text-amber-400 text-lg md:text-xl font-serif italic mb-4">
              {gameState.character.title} of {gameState.character.location}
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-slate-950/60 rounded border border-slate-700 text-amber-300 font-bold flex items-center gap-2 backdrop-blur-md">
                <Coins size={16} /> {gameState.character.gold} Gold
              </span>
              <span className="px-4 py-2 bg-slate-950/60 rounded border border-slate-700 text-purple-300 font-bold flex items-center gap-2 backdrop-blur-md">
                Level {gameState.character.level}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Widget title="Vitality Status" icon={Shield} onClick={() => onNavigate('hospital')}>
          <StatBar value={gameState.stats.vitality} max={gameState.stats.maxVitality} color="red" label="Hit Points" />
          <p className="text-xs text-slate-400 mt-3 font-serif italic">
            {gameState.status.inSanctuary ? `Recovering in Sanctuary...` : 'Your body is hale and hearty.'}
          </p>
        </Widget>
        
        <Widget title="Arcane Mana" icon={Zap} onClick={() => onNavigate('energy')}>
          <StatBar value={gameState.stats.mana} max={gameState.stats.maxMana} color="blue" label="Mana Points" />
          <p className="text-xs text-slate-400 mt-3 font-serif italic">
            Magical essence flows through you.
          </p>
        </Widget>

        <Widget title="Adrenaline" icon={Activity} onClick={() => onNavigate('nerve')}>
          <StatBar value={gameState.stats.adrenaline} max={gameState.stats.maxAdrenaline} color="orange" label="Adrenaline" />
          <p className="text-xs text-slate-400 mt-3 font-serif italic">
            Ready for high-stakes ventures.
          </p>
        </Widget>

        <Widget title="Current Region" icon={Map} onClick={() => onNavigate('travel')}>
          <div className="text-center py-2">
            <span className="text-xl font-bold text-amber-500 font-serif block mb-1">{gameState.character.location}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Safe Zone</span>
          </div>
        </Widget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-700 rounded-lg p-6 shadow-xl backdrop-blur-sm">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2 font-serif text-slate-100">
            <Clock size={24} className="text-amber-500"/> Chronicle of Events
          </h3>
          <div className="space-y-4">
            {gameState.logs.length > 0 ? gameState.logs.slice(0, 6).map(log => (
              <div key={log.id} className="flex items-start gap-4 p-3 bg-slate-950/50 rounded border border-slate-800 hover:border-slate-700 transition-colors">
                <span className="text-slate-500 text-xs font-mono whitespace-nowrap mt-1">{log.time}</span>
                <p className={`text-sm ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>
                  {log.msg}
                </p>
              </div>
            )) : (
              <div className="text-center text-slate-500 py-8 italic">The chronicles are yet to be written...</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-6 shadow-xl backdrop-blur-sm">
           <h3 className="font-bold text-xl mb-6 font-serif text-slate-100">Destiny Awaits</h3>
           <div className="grid grid-cols-1 gap-4">
             <button onClick={() => onNavigate('combat')} className="flex items-center justify-center gap-3 p-4 bg-red-950/50 text-red-400 rounded-lg hover:bg-red-900/50 transition border border-red-900/30 group">
               <Sword className="group-hover:scale-110 transition-transform" /> 
               <span className="font-bold">Enter the Arena</span>
             </button>
             <button onClick={() => onNavigate('nerve')} className="flex items-center justify-center gap-3 p-4 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-800 transition border border-slate-700 group">
               <Skull className="group-hover:scale-110 transition-transform text-slate-400" />
               <span className="font-bold">Shadow Operations</span>
             </button>
             <button onClick={() => onNavigate('quests')} className="flex items-center justify-center gap-3 p-4 bg-amber-950/30 text-amber-400 rounded-lg hover:bg-amber-900/40 transition border border-amber-900/30 group">
               <Map className="group-hover:scale-110 transition-transform" />
               <span className="font-bold">Check Quest Log</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

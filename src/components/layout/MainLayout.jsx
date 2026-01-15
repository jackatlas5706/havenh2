import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Castle, Sword, Coins, Flag, Scroll, Hammer, Map, Users, Heart, Lock, 
  Target, GraduationCap, BarChart2, Zap, Skull, Briefcase, Package, 
  Trophy, EyeOff, Settings, Menu, X, ChevronDown, ChevronRight 
} from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import StatBar from '@/components/ui/StatBar';

const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { gameState } = useGame();
  const [expandedGroups, setExpandedGroups] = useState({
    core: true, adventure: true, kingdom: true, underground: true, lore: true
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const menuGroups = [
    {
      id: 'core', label: 'Realm Core', items: [
        { id: 'home', label: 'Throne Room', icon: Castle },
        { id: 'inventory', label: 'Satchel', icon: Package },
        { id: 'travel', label: 'World Map', icon: Map },
        { id: 'settings', label: 'Options', icon: Settings },
      ]
    },
    {
      id: 'adventure', label: 'Adventure', items: [
        { id: 'combat', label: 'Battlefield', icon: Sword },
        { id: 'training', label: 'Training Grounds', icon: Target },
        { id: 'quests', label: 'Quest Log', icon: Scroll },
        { id: 'hospital', label: 'Sanctuary', icon: Heart },
      ]
    },
    {
      id: 'kingdom', label: 'Kingdom', items: [
        { id: 'economy', label: 'Market & Trade', icon: Coins },
        { id: 'factions', label: 'Factions', icon: Flag },
        { id: 'npcs', label: 'Citizens', icon: Users },
        { id: 'crafting', label: 'The Forge', icon: Hammer },
        { id: 'education', label: 'Library', icon: GraduationCap },
      ]
    },
    {
      id: 'underground', label: 'Underworld', items: [
        { id: 'nerve', label: 'Shadow Ops', icon: Skull },
        { id: 'jail', label: 'Dungeon', icon: Lock },
        { id: 'bounties', label: 'Bounty Board', icon: Target },
        { id: 'blackmarket', label: 'Black Market', icon: EyeOff },
        { id: 'crew', label: 'Guild', icon: Briefcase },
      ]
    },
    {
      id: 'lore', label: 'Chronicles', items: [
        { id: 'rankings', label: 'Hall of Legends', icon: Trophy },
        { id: 'stats', label: 'Records', icon: BarChart2 },
        { id: 'energy', label: 'Mana Well', icon: Zap },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-serif">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">Aethermoor</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-300">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed md:sticky top-0 h-screen w-72 bg-slate-900 border-r border-slate-700 z-50 overflow-y-auto ${!sidebarOpen && 'hidden md:block'} shadow-[4px_0_24px_rgba(0,0,0,0.5)]`}
          >
            <div className="p-6 border-b border-slate-700 bg-slate-900">
              <h2 className="text-2xl font-bold text-center text-amber-500 font-serif tracking-wide drop-shadow-md">
                Aethermoor
              </h2>
              <div className="mt-6 space-y-3">
                 <StatBar label="Vitality" value={gameState.stats.vitality} max={gameState.stats.maxVitality} color="red" />
                 <StatBar label="Mana" value={gameState.stats.mana} max={gameState.stats.maxMana} color="blue" />
                 <StatBar label="Adrenaline" value={gameState.stats.adrenaline} max={gameState.stats.maxAdrenaline} color="orange" />
              </div>
            </div>

            <nav className="p-4 space-y-4">
              {menuGroups.map(group => (
                <div key={group.id} className="space-y-1">
                  <button 
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-amber-500 transition-colors"
                  >
                    {group.label}
                    {expandedGroups[group.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <AnimatePresence>
                    {expandedGroups[group.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 border-l border-slate-800"
                      >
                        {group.items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => { onTabChange(item.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                              activeTab === item.id 
                                ? 'bg-gradient-to-r from-amber-900/40 to-transparent text-amber-400 border-l-2 border-amber-500' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                          >
                            <item.icon size={18} className={activeTab === item.id ? 'text-amber-500' : 'text-slate-500'} />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-fixed">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

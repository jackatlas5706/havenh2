import React from 'react';
import { Users, MessageCircle, Heart } from 'lucide-react';

const NPCPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-yellow-100 font-serif flex items-center gap-3 mb-6">
      <Users className="text-yellow-500"/> Citizens of Aethermoor
    </h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Aldric the Wise', role: 'Arcane Scholar', desc: 'An ancient mage who trades in forgotten scrolls.', loc: 'Mage Tower' },
        { name: 'Theron Ironarm', role: 'Master Blacksmith', desc: 'Forges the finest steel in the kingdom.', loc: 'The Great Forge' },
        { name: 'Elara Moonwhisper', role: 'High Priestess', desc: 'Heals the wounded and comforts the weary.', loc: 'Sanctuary' },
        { name: 'Garrett the Shadow', role: 'Rogue Trainer', desc: 'Teaches the art of unseen movement.', loc: 'The Underbelly' },
      ].map((npc, i) => (
        <div key={i} className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-yellow-500/30 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-slate-800 rounded-full border-2 border-slate-600 group-hover:border-yellow-500 transition-colors overflow-hidden">
               <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-200 font-serif">{npc.name}</h3>
              <p className="text-xs text-yellow-500 uppercase tracking-wide">{npc.role}</p>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm italic mb-4 border-l-2 border-slate-800 pl-3">
            "{npc.desc}"
          </p>

          <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
             <span>Location: {npc.loc}</span>
             <span className="flex items-center gap-1 text-pink-400"><Heart size={10}/> Neutral</span>
          </div>

          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            <MessageCircle size={14}/> Talk
          </button>
        </div>
      ))}
    </div>
  </div>
);
export default NPCPage;

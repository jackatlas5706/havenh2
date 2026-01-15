import React from 'react';
import { Target } from 'lucide-react';

const BountyPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-red-500 font-serif flex items-center gap-3"><Target/> Wanted Posters</h1>
    <div className="grid grid-cols-1 gap-4">
      {[1,2].map(i => (
        <div key={i} className="bg-[url('https://www.transparenttextures.com/patterns/paper.png')] bg-slate-200 p-6 rounded shadow-lg flex justify-between items-center transform rotate-1 hover:rotate-0 transition-transform duration-300">
           <div className="text-slate-900">
             <h3 className="font-bold font-serif text-2xl uppercase tracking-widest mb-1">Wanted</h3>
             <p className="font-serif font-bold text-lg">The Bandit King</p>
             <p className="text-sm font-mono mt-2">Reward: 500 Gold Coins - Dead or Alive</p>
           </div>
           <button className="bg-red-800 text-white px-6 py-2 rounded font-bold font-serif border-2 border-red-950 shadow-md">Accept Contract</button>
        </div>
      ))}
    </div>
  </div>
);
export default BountyPage;

import React from 'react';
import { Hammer } from 'lucide-react';

const CraftingPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-orange-500 font-serif flex items-center gap-3"><Hammer/> The Iron Forge</h1>
    <div className="bg-slate-900 p-12 rounded-lg border border-slate-700 text-center">
       <p className="text-slate-400 text-lg mb-4">The fires are lit, but you have no materials to work with.</p>
       <button className="px-6 py-2 bg-slate-800 text-slate-300 rounded border border-slate-600 font-bold hover:bg-slate-700 transition">View Recipes</button>
    </div>
  </div>
);
export default CraftingPage;

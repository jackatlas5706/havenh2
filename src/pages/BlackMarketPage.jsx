import React from 'react';
import { EyeOff } from 'lucide-react';

const BlackMarketPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-slate-400 font-serif flex items-center gap-3"><EyeOff/> Smuggler's Den</h1>
    <div className="bg-red-950/30 border border-red-900/50 p-6 rounded text-red-400 text-center shadow-inner">
      <h3 className="font-bold mb-2">Restricted Access</h3>
      <p className="text-sm">The guards patrol this area heavily. Transactions here carry the risk of imprisonment.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none select-none grayscale">
       <div className="bg-slate-900 p-6 border border-slate-800 rounded-lg">
         <h3 className="font-bold text-slate-200">Forbidden Grimoire</h3>
         <p className="text-sm text-slate-500">??? Gold</p>
       </div>
    </div>
    <p className="text-center text-slate-600 mt-8 italic">You must gain the trust of the Shadow Syndicate to trade here.</p>
  </div>
);
export default BlackMarketPage;

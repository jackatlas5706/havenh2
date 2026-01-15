import React from 'react';
import { Trophy } from 'lucide-react';

const RankingsPage = () => (
  <div className="space-y-6">
     <h1 className="text-3xl font-bold text-yellow-500 font-serif flex items-center gap-3"><Trophy/> Hall of Legends</h1>
     <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
       <table className="w-full text-left">
         <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
           <tr>
             <th className="p-4 font-serif">Rank</th>
             <th className="p-4 font-serif">Hero</th>
             <th className="p-4 font-serif">Level</th>
             <th className="p-4 font-serif">Renown</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-800">
           {[1,2,3,4,5].map(i => (
             <tr key={i} className="text-slate-300 hover:bg-slate-800/50 transition-colors">
               <td className="p-4 font-bold text-amber-500">#{i}</td>
               <td className="p-4">Legendary Hero {i}</td>
               <td className="p-4">{100-i}</td>
               <td className="p-4 text-purple-400">{(50000/i).toFixed(0)}</td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
  </div>
);
export default RankingsPage;

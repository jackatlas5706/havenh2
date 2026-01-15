import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Coins, TrendingUp, Building, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EconomyPage = () => {
  const { gameState, addLog } = useGame();
  
  // Mock data for the chart
  const data = [
    { name: 'Day 1', ATC: 40, DMM: 100 },
    { name: 'Day 2', ATC: 30, DMM: 110 },
    { name: 'Day 3', ATC: 50, DMM: 90 },
    { name: 'Day 4', ATC: 45, DMM: 120 },
    { name: 'Day 5', ATC: 60, DMM: 115 },
    { name: 'Current', ATC: 45, DMM: 120 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-amber-500 font-serif flex items-center gap-3">
             <Coins className="text-amber-400"/> Royal Treasury
           </h1>
           <p className="text-slate-400 mt-1">Manage your wealth and investments in the Kingdom.</p>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-lg border border-amber-900/50 text-amber-400 font-bold font-mono text-xl shadow-lg">
          {gameState.character.gold} Gold Coins
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Trends */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold text-slate-200 mb-6 font-serif flex items-center gap-2">
            <TrendingUp size={20} className="text-green-500"/> Market Trends
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} prefix="$" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Line type="monotone" dataKey="ATC" stroke="#fbbf24" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="DMM" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investments List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-200 font-serif">Trade Opportunities</h2>
          {gameState.economy.investments.map((stock) => (
             <div key={stock.symbol} className="bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-amber-500/30 transition-all">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="font-bold text-slate-200">{stock.name}</h3>
                   <span className="text-xs font-mono text-slate-500">{stock.symbol}</span>
                 </div>
                 <div className={`flex items-center text-sm font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                   {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                   {stock.change}%
                 </div>
               </div>
               
               <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                 <span className="text-lg font-mono text-amber-500">{stock.price}g</span>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 bg-green-900/20 text-green-400 rounded hover:bg-green-900/40 border border-green-900/50 text-sm font-bold transition-colors">Buy</button>
                   <button className="px-3 py-1 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 border border-red-900/50 text-sm font-bold transition-colors">Sell</button>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 text-center">
         <Building className="mx-auto text-slate-600 mb-4" size={48} />
         <h2 className="text-2xl font-bold text-slate-300 font-serif mb-2">Real Estate</h2>
         <p className="text-slate-500 mb-6">Invest in property to generate passive income for your lineage.</p>
         <button className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition font-bold border border-slate-600">
           View Properties
         </button>
      </div>
    </div>
  );
};

export default EconomyPage;

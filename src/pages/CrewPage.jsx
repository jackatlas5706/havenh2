import React from 'react';
import { Briefcase } from 'lucide-react';

const CrewPage = () => (
  <div className="p-12 text-center bg-slate-900 rounded-xl border border-slate-700 mt-6">
    <Briefcase size={64} className="mx-auto text-slate-600 mb-6"/>
    <h1 className="text-2xl font-bold text-slate-300 font-serif">Adventurer's Guild</h1>
    <p className="text-slate-500 mt-2 mb-8">Form a party to tackle greater threats.</p>
    <button className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded text-white font-bold border border-purple-400 shadow-lg">Register Guild</button>
  </div>
);
export default CrewPage;

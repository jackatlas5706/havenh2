import React from 'react';
import { Lock } from 'lucide-react';

const JailPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-950 rounded-xl border border-slate-800">
    <Lock size={80} className="text-slate-700 mb-6"/>
    <h1 className="text-4xl font-bold text-slate-300 font-serif mb-2">The Dungeon</h1>
    <p className="text-slate-500 max-w-md mx-auto text-lg">
      You breathe the stale air of freedom. The cells are empty... for now.
    </p>
    <div className="mt-8 p-4 bg-slate-900 rounded border border-slate-800 text-sm text-slate-400">
      Criminal Record: Clean
    </div>
  </div>
);
export default JailPage;

import React from 'react';
import { Settings, Save } from 'lucide-react';

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-slate-400 font-serif flex items-center gap-3"><Settings/> Options</h1>
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
      <h3 className="font-bold text-slate-200 mb-6 border-b border-slate-800 pb-2">Data Management</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300 font-bold">Reset Progress</p>
          <p className="text-xs text-slate-500">Permanently delete your character and start over.</p>
        </div>
        <button 
          onClick={() => { if(confirm('Are you sure?')) { localStorage.removeItem('torn_game_v2'); window.location.reload(); } }}
          className="bg-red-900/20 text-red-400 border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/30 transition-colors text-sm font-bold"
        >
          Reset Data
        </button>
      </div>
    </div>
  </div>
);
export default SettingsPage;

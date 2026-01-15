import React from 'react';
import { GraduationCap, Book } from 'lucide-react';

const EducationPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-blue-300 font-serif flex items-center gap-3"><GraduationCap/> Royal Library</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['Ancient History', 'Beastiary Studies', 'Economic Theory', 'Tactical Warfare'].map(course => (
        <div key={course} className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-blue-500/30 transition-all flex gap-4">
          <div className="bg-slate-800 p-3 rounded h-fit">
            <Book className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-200 font-serif">{course}</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">Study ancient texts to improve your Intelligence.</p>
            <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm font-bold border border-slate-600 transition-colors">Begin Study</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default EducationPage;

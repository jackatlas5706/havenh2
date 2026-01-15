import React from 'react';
import { motion } from 'framer-motion';

const StatBar = ({ label, value, max, color = 'blue', showValue = true, className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colors = {
    red: 'bg-red-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    cyan: 'bg-cyan-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs mb-1 font-medium text-slate-300">
        <span>{label}</span>
        {showValue && <span>{Math.floor(value)} / {max}</span>}
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${colors[color]} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
        />
      </div>
    </div>
  );
};

export default StatBar;

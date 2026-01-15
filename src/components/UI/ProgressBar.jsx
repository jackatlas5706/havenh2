import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, max, label, showPercentage = true, color = 'purple', className = '' }) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    purple: 'from-purple-600 to-purple-400',
    gold: 'from-yellow-600 to-yellow-400',
    crimson: 'from-red-600 to-red-400',
    blue: 'from-blue-600 to-blue-400',
    green: 'from-green-600 to-green-400'
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-slate-300 text-sm font-medium">{label}</span>
          {showPercentage && (
            <span className="text-slate-400 text-sm">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} shadow-lg`}
        />
      </div>
      {!label && showPercentage && (
        <div className="flex justify-between mt-1">
          <span className="text-slate-400 text-xs">{value}</span>
          <span className="text-slate-400 text-xs">{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

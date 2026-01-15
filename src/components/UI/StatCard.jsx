import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, maxValue, icon: Icon, color = 'purple', showBar = true, className = '' }) => {
  const percentage = maxValue ? (value / maxValue) * 100 : 0;
  
  const colorClasses = {
    purple: 'from-purple-600 to-purple-800 border-purple-500',
    gold: 'from-yellow-600 to-yellow-800 border-yellow-500',
    crimson: 'from-red-600 to-red-800 border-red-500',
    blue: 'from-blue-600 to-blue-800 border-blue-500',
    green: 'from-green-600 to-green-800 border-green-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border-2 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-slate-100" />}
          <span className="text-slate-100 font-semibold">{label}</span>
        </div>
        <span className="text-slate-100 font-bold">
          {maxValue ? `${value}/${maxValue}` : value}
        </span>
      </div>
      
      {showBar && maxValue && (
        <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-slate-100 to-white rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;

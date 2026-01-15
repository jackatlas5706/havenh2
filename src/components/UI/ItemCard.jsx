import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Droplet, Scroll, Home, Star } from 'lucide-react';
import { Button } from './button';

const ItemCard = ({ item, onUse, onEquip, onSell, onDrop, compact = false }) => {
  const rarityColors = {
    common: 'border-slate-500 bg-slate-800',
    uncommon: 'border-green-500 bg-green-900/20',
    rare: 'border-blue-500 bg-blue-900/20',
    epic: 'border-purple-500 bg-purple-900/20',
    legendary: 'border-yellow-500 bg-yellow-900/20'
  };

  const rarityGlow = {
    common: 'shadow-slate-500/20',
    uncommon: 'shadow-green-500/30',
    rare: 'shadow-blue-500/30',
    epic: 'shadow-purple-500/40',
    legendary: 'shadow-yellow-500/50'
  };

  const typeIcons = {
    weapon: Sword,
    armor: Shield,
    consumable: Droplet,
    quest: Scroll,
    property: Home
  };

  const Icon = typeIcons[item.type] || Star;

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${rarityColors[item.rarity]} ${rarityGlow[item.rarity]} border-2 rounded-lg p-3 cursor-pointer shadow-lg`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-slate-100" />
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-100 font-semibold truncate">{item.name}</h3>
            <p className="text-slate-400 text-sm">x{item.quantity}</p>
          </div>
          {item.equipped && (
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Equipped</span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${rarityColors[item.rarity]} ${rarityGlow[item.rarity]} border-2 rounded-lg p-4 shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/50 p-3 rounded-lg">
            <Icon className="w-8 h-8 text-slate-100" />
          </div>
          <div>
            <h3 className="text-slate-100 font-bold text-lg">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold uppercase ${rarityColors[item.rarity]} px-2 py-1 rounded`}>
                {item.rarity}
              </span>
              <span className="text-slate-400 text-sm capitalize">{item.type}</span>
            </div>
          </div>
        </div>
        <span className="text-slate-100 font-semibold">x{item.quantity}</span>
      </div>

      <p className="text-slate-300 text-sm mb-3">{item.description}</p>

      {item.stats && (
        <div className="bg-slate-900/30 rounded p-2 mb-3">
          <p className="text-slate-400 text-xs mb-1">Stats:</p>
          {Object.entries(item.stats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between text-sm">
              <span className="text-slate-300 capitalize">{stat}:</span>
              <span className="text-green-400 font-semibold">+{value}</span>
            </div>
          ))}
        </div>
      )}

      {item.income && (
        <div className="bg-yellow-900/20 rounded p-2 mb-3 border border-yellow-600">
          <p className="text-yellow-400 text-sm">Income: {item.income} gold/day</p>
        </div>
      )}

      {item.equipped && (
        <div className="bg-green-900/30 rounded p-2 mb-3 border border-green-600">
          <p className="text-green-400 text-sm font-semibold">Currently Equipped</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {item.type === 'consumable' && onUse && (
          <Button onClick={() => onUse(item.id)} size="sm" className="flex-1">
            Use
          </Button>
        )}
        {(item.type === 'weapon' || item.type === 'armor') && onEquip && !item.equipped && (
          <Button onClick={() => onEquip(item.id)} size="sm" variant="secondary" className="flex-1">
            Equip
          </Button>
        )}
        {onSell && item.type !== 'quest' && (
          <Button onClick={() => onSell(item.id)} size="sm" variant="outline" className="flex-1">
            Sell
          </Button>
        )}
        {onDrop && (
          <Button onClick={() => onDrop(item.id)} size="sm" variant="destructive" className="flex-1">
            Drop
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ItemCard;

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Package, Sword, Shield, Droplet } from 'lucide-react';
import ItemCard from '@/components/ui/ItemCard';

const InventoryPage = () => {
  const { gameState, equipItem } = useGame();

  // Helper to inject fantasy flavor into categories
  const getCategoryIcon = (type) => {
    switch(type) {
      case 'weapon': return Sword;
      case 'armor': return Shield;
      case 'consumable': return Droplet;
      default: return Package;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-400 font-serif flex items-center gap-3">
            <Package className="text-blue-500"/> Adventurer's Satchel
          </h1>
          <p className="text-slate-400 mt-1">Manage your equipment and supplies.</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded border border-slate-700 text-sm text-slate-400">
          Capacity: {gameState.inventory.length} / 20 Slots
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameState.inventory.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onEquip={equipItem}
              onUse={() => console.log('Used item')} // Implement use logic
              onSell={() => console.log('Sold item')} // Implement sell logic
            />
          ))}
          {/* Empty slots for visual consistency */}
          {[...Array(Math.max(0, 6 - gameState.inventory.length))].map((_, i) => (
            <div key={`empty-${i}`} className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-lg p-4 flex items-center justify-center min-h-[140px]">
              <span className="text-slate-700 text-sm font-serif italic">Empty Slot</span>
            </div>
          ))}
        </div>

        {/* Character Paper Doll (Simplified) */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl h-fit">
          <h2 className="text-xl font-bold text-slate-200 font-serif mb-6 text-center border-b border-slate-800 pb-4">Equipped Gear</h2>
          
          <div className="relative h-[400px] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] rounded-lg border border-slate-800 mb-6 opacity-80">
            {/* Silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <Shield size={180} />
            </div>

            {/* Slots Overlay */}
            <div className="grid grid-cols-2 gap-x-20 gap-y-8 z-10 w-full max-w-xs px-4">
              <EquipmentSlot label="Head" item={gameState.equipment.head} />
              <EquipmentSlot label="Chest" item={gameState.equipment.chest} />
              <EquipmentSlot label="Main Hand" item={gameState.equipment.mainHand} />
              <EquipmentSlot label="Off Hand" item={gameState.equipment.offHand} />
              <EquipmentSlot label="Legs" item={gameState.equipment.legs} />
              <EquipmentSlot label="Feet" item={gameState.equipment.feet} />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Total Attack</span>
              <span className="text-red-400 font-bold">12</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Total Defense</span>
              <span className="text-blue-400 font-bold">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EquipmentSlot = ({ label, item }) => (
  <div className="flex flex-col items-center">
    <div className={`w-12 h-12 rounded border-2 flex items-center justify-center mb-1 bg-slate-950 ${item ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-slate-800'}`}>
      {item ? <div className="w-8 h-8 bg-purple-900/50 rounded-full" /> : <div className="w-2 h-2 bg-slate-800 rounded-full" />}
    </div>
    <span className={`text-[10px] uppercase tracking-wider font-bold ${item ? 'text-purple-300' : 'text-slate-600'}`}>
      {item ? (item.name.length > 10 ? item.name.substring(0,8)+'...' : item.name) : label}
    </span>
  </div>
);

export default InventoryPage;

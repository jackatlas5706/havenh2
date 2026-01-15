import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Store, Beer, Hammer, Building, Swords, Users } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';

const CityPage = () => {
  const { gameState, addItem, updateStat } = useGame();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const marketItems = [
    { id: 101, name: 'Iron Sword', type: 'weapon', rarity: 'common', price: 100, stats: { strength: 5 }, description: 'A basic iron sword.' },
    { id: 102, name: 'Steel Armor', type: 'armor', rarity: 'uncommon', price: 250, stats: { defense: 10 }, description: 'Sturdy steel protection.' },
    { id: 103, name: 'Health Potion', type: 'consumable', rarity: 'common', price: 50, stats: { hp: 50 }, description: 'Restores 50 HP.', quantity: 1 },
    { id: 104, name: 'Mana Potion', type: 'consumable', rarity: 'uncommon', price: 75, stats: { energy: 30 }, description: 'Restores 30 Energy.', quantity: 1 },
    { id: 105, name: 'Mystic Staff', type: 'weapon', rarity: 'rare', price: 500, stats: { magic: 15 }, description: 'A staff humming with power.' },
    { id: 106, name: 'Dragon Scale Shield', type: 'armor', rarity: 'epic', price: 1000, stats: { defense: 25 }, description: 'Made from dragon scales.' },
    { id: 107, name: 'Elixir of Strength', type: 'consumable', rarity: 'rare', price: 200, stats: { strength: 5 }, description: 'Permanently increases strength.', quantity: 1 },
    { id: 108, name: 'Shadow Cloak', type: 'armor', rarity: 'rare', price: 600, stats: { agility: 12 }, description: 'Blend into shadows.' },
    { id: 109, name: 'Phoenix Feather', type: 'consumable', rarity: 'legendary', price: 2000, stats: { hp: 200 }, description: 'Full health restoration.', quantity: 1 },
    { id: 110, name: 'Legendary Blade', type: 'weapon', rarity: 'legendary', price: 5000, stats: { strength: 50 }, description: 'A weapon of legends.' },
    { id: 111, name: 'Agility Boots', type: 'armor', rarity: 'uncommon', price: 150, stats: { agility: 7 }, description: 'Lightweight and swift.' },
    { id: 112, name: 'Magic Ring', type: 'armor', rarity: 'rare', price: 400, stats: { magic: 10 }, description: 'Enhances magical abilities.' },
    { id: 113, name: 'Stamina Potion', type: 'consumable', rarity: 'common', price: 60, stats: { energy: 25 }, description: 'Restores 25 Energy.', quantity: 1 },
    { id: 114, name: 'War Hammer', type: 'weapon', rarity: 'uncommon', price: 300, stats: { strength: 10 }, description: 'A heavy war hammer.' },
    { id: 115, name: 'Plate Armor', type: 'armor', rarity: 'epic', price: 800, stats: { defense: 20 }, description: 'Full plate protection.' },
    { id: 116, name: 'Arcane Scroll', type: 'consumable', rarity: 'rare', price: 250, stats: { magic: 3 }, description: 'Teaches a spell.', quantity: 1 },
    { id: 117, name: 'Dagger of Shadows', type: 'weapon', rarity: 'rare', price: 450, stats: { agility: 15 }, description: 'Silent and deadly.' },
    { id: 118, name: 'Crystal Pendant', type: 'armor', rarity: 'epic', price: 900, stats: { magic: 18 }, description: 'Channels pure energy.' },
    { id: 119, name: 'Full Restore Potion', type: 'consumable', rarity: 'epic', price: 500, stats: { hp: 150, energy: 50 }, description: 'Restores HP and Energy.', quantity: 1 },
    { id: 120, name: 'Ancient Artifact', type: 'quest', rarity: 'legendary', price: 10000, description: 'A mysterious ancient relic.', quantity: 1 }
  ];

  const locations = [
    {
      id: 'market',
      name: 'Market',
      icon: Store,
      description: 'Buy and sell items with merchants',
      color: 'from-green-600 to-green-800',
      image: 'https://images.unsplash.com/photo-1688807795069-9a775f9bb896'
    },
    {
      id: 'tavern',
      name: 'Tavern',
      icon: Beer,
      description: 'Social hub and faction recruitment',
      color: 'from-yellow-600 to-yellow-800',
      image: 'https://images.unsplash.com/photo-1688807795069-9a775f9bb896'
    },
    {
      id: 'blacksmith',
      name: 'Blacksmith',
      icon: Hammer,
      description: 'Upgrade and repair your equipment',
      color: 'from-red-600 to-red-800',
      image: 'https://images.unsplash.com/photo-1549500379-1938ee1fc6a8'
    },
    {
      id: 'treasury',
      name: 'Treasury',
      icon: Building,
      description: 'Manage properties and wealth',
      color: 'from-purple-600 to-purple-800',
      image: 'https://images.unsplash.com/photo-1549500379-1938ee1fc6a8'
    },
    {
      id: 'arena',
      name: 'Arena',
      icon: Swords,
      description: 'Test your skills in PvP combat',
      color: 'from-red-600 to-red-800',
      image: 'https://images.unsplash.com/photo-1572431784280-99e1b025b535'
    },
    {
      id: 'guild',
      name: 'Guild Hall',
      icon: Users,
      description: 'Manage your faction',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1572431784280-99e1b025b535'
    }
  ];

  const handleBuyItem = (item) => {
    if (gameState.stats.gold < item.price) {
      toast({
        title: 'Insufficient Gold',
        description: `You need ${item.price} gold to purchase this item.`,
        variant: 'destructive'
      });
      return;
    }

    updateStat('gold', -item.price);
    addItem({ ...item, quantity: item.quantity || 1 });
    toast({
      title: 'Item Purchased!',
      description: `You bought ${item.name} for ${item.price} gold.`,
      variant: 'default'
    });
  };

  return (
    <>
      <Helmet>
        <title>City - Realm of Legends</title>
        <meta name="description" content="Explore the city and visit various locations" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">City Hub</h1>
          <p className="text-slate-400">Explore various locations and services</p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedLocation(location)}
              className={`bg-gradient-to-br ${location.color} rounded-lg p-6 border-2 border-slate-700 cursor-pointer shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <location.icon className="w-8 h-8 text-slate-100" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{location.name}</h3>
                </div>
              </div>
              <p className="text-slate-200">{location.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Location Modal */}
      <Modal
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        title={selectedLocation?.name || ''}
      >
        {selectedLocation?.id === 'market' && (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Browse items available for purchase:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {marketItems.map((item) => (
                <div key={item.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <h4 className="text-slate-100 font-bold mb-1">{item.name}</h4>
                  <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">{item.price} gold</span>
                    <Button size="sm" onClick={() => handleBuyItem(item)}>
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedLocation?.id === 'tavern' && (
          <div>
            <p className="text-slate-300 mb-4">Welcome to the tavern! Meet other adventurers and join factions.</p>
            <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
              View Factions
            </Button>
          </div>
        )}

        {selectedLocation?.id === 'blacksmith' && (
          <div>
            <p className="text-slate-300 mb-4">Upgrade and repair your equipment here.</p>
            <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
              Upgrade Items
            </Button>
          </div>
        )}

        {selectedLocation?.id === 'treasury' && (
          <div>
            <p className="text-slate-300 mb-4">Manage your properties and investments.</p>
            <div className="bg-slate-900/50 rounded p-4 mb-4">
              <h4 className="text-slate-100 font-bold mb-2">Your Wealth</h4>
              <p className="text-yellow-400 text-2xl font-bold">{gameState.stats.gold.toLocaleString()} gold</p>
            </div>
            <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
              View Properties
            </Button>
          </div>
        )}

        {selectedLocation?.id === 'arena' && (
          <div>
            <p className="text-slate-300 mb-4">Challenge other players in PvP combat!</p>
            <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
              Enter Arena
            </Button>
          </div>
        )}

        {selectedLocation?.id === 'guild' && (
          <div>
            <p className="text-slate-300 mb-4">Manage your faction and coordinate with members.</p>
            <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
              View Guild
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CityPage;

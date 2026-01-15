import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

const INITIAL_STATE = {
  character: {
    name: 'Aldric the Awakened',
    title: 'Wandering Soul',
    level: 1,
    exp: 0,
    expToNext: 1000,
    class: 'Novice',
    faction: null,
    rank: 'Commoner',
    location: 'Kingdom of Aethermoor',
    avatar: 'https://images.unsplash.com/photo-1572431784280-99e1b025b535',
    gold: 500
  },
  stats: {
    vitality: 100, maxVitality: 100, // HP
    mana: 100, maxMana: 100, // Energy
    adrenaline: 15, maxAdrenaline: 15, // Nerve
    renown: 0, // Glory/Reputation
    fortitude: 10, // Defense
    strength: 10, 
    dexterity: 10, 
    intelligence: 10,
    wisdom: 10
  },
  inventory: [
    { id: 1, name: 'Blade of the Fallen Knight', type: 'weapon', slot: 'mainHand', damage: 8, value: 50, rarity: 'uncommon', description: 'A rusted blade that has seen better days.' },
    { id: 2, name: 'Tunic of the Peasant', type: 'armor', slot: 'chest', defense: 3, value: 10, rarity: 'common', description: 'Simple cloth protection.' },
    { id: 3, name: 'Elixir of Vitality', type: 'consumable', effect: 'vitality', value: 20, quantity: 3, rarity: 'common', description: 'Restores a small amount of health.' }
  ],
  equipment: {
    head: null, chest: null, legs: null, feet: null, hands: null, mainHand: null, offHand: null
  },
  status: {
    inDungeon: false, dungeonTime: 0, // Jail
    inSanctuary: false, sanctuaryTime: 0, // Hospital
    traveling: false, travelTime: 0, destination: null
  },
  factions: [
    { id: 'silver_dawn', name: 'Order of the Silver Dawn', desc: 'Protectors of the realm and upholders of justice.', reputation: 0 },
    { id: 'shadow_syndicate', name: 'Shadow Syndicate', desc: 'A network of spies, thieves, and assassins.', reputation: 0 },
    { id: 'draconic_covenant', name: 'Draconic Covenant', desc: 'Worshippers of the ancient dragons.', reputation: 0 },
    { id: 'elven_circle', name: 'Elven Circle', desc: 'Guardians of the mystic forests.', reputation: 0 },
    { id: 'dwarven_stronghold', name: 'Dwarven Stronghold', desc: 'Masters of the forge and stone.', reputation: 0 },
    { id: 'necro_cabal', name: 'Necromancer\'s Cabal', desc: 'Seekers of forbidden knowledge.', reputation: 0 },
    { id: 'druidic_conclave', name: 'Druidic Conclave', desc: 'Keepers of the natural balance.', reputation: 0 },
    { id: 'bards_collective', name: 'Bard\'s Collective', desc: 'Chroniclers of history and song.', reputation: 0 }
  ],
  quests: {
    active: [],
    completed: [],
    available: [
      { id: 1, title: 'The Lost Heirloom', description: 'Retrieve the stolen locket from the goblin camp.', difficulty: 'Easy', reward: 100, xp: 50, type: 'Combat' },
      { id: 2, title: 'Herbal Remedies', description: 'Gather 5 Moonleaf herbs for the local healer.', difficulty: 'Easy', reward: 50, xp: 25, type: 'Collection' },
      { id: 3, title: 'Rat Infestation', description: 'Clear out the giant rats in the tavern cellar.', difficulty: 'Medium', reward: 150, xp: 75, type: 'Combat' }
    ]
  },
  economy: {
    investments: [
      { name: 'Aethermoor Trading Co.', symbol: 'ATC', price: 45, change: 2.5 },
      { name: 'Dwarven Mithril Mines', symbol: 'DMM', price: 120, change: -1.2 },
      { name: 'Elven Silk Weavers', symbol: 'ESW', price: 85, change: 5.0 },
      { name: 'Dragonfire Forge', symbol: 'DFF', price: 210, change: 0.8 }
    ],
    properties: []
  },
  logs: []
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('torn_game_v2');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('torn_game_v2', JSON.stringify(gameState));
  }, [gameState]);

  const addLog = (msg, type = 'neutral') => {
    setGameState(prev => ({
      ...prev,
      logs: [{ id: Date.now(), msg, type, time: new Date().toLocaleTimeString() }, ...prev.logs.slice(0, 49)]
    }));
  };

  const updateStat = (key, val) => {
    setGameState(prev => {
      const maxKey = 'max' + key.charAt(0).toUpperCase() + key.slice(1);
      const max = prev.stats[maxKey] || 999999;
      const current = prev.stats[key];
      const newVal = Math.max(0, Math.min(max, current + val));
      return {
        ...prev,
        stats: { ...prev.stats, [key]: newVal }
      };
    });
  };

  const consumeResource = (resource, amount) => {
    if (gameState.stats[resource] >= amount) {
      updateStat(resource, -amount);
      return true;
    }
    const resourceName = resource === 'mana' ? 'Mana' : resource === 'adrenaline' ? 'Adrenaline' : 'Resource';
    addLog(`Not enough ${resourceName}!`, 'error');
    return false;
  };

  const equipItem = (item) => {
    if (!item.slot) return;
    setGameState(prev => {
      const currentEquipped = prev.equipment[item.slot];
      const newInventory = prev.inventory.filter(i => i.id !== item.id);
      if (currentEquipped) newInventory.push({ ...currentEquipped, equipped: false });
      
      return {
        ...prev,
        equipment: { ...prev.equipment, [item.slot]: { ...item, equipped: true } },
        inventory: newInventory
      };
    });
    addLog(`Equipped ${item.name}`, 'success');
  };

  const addToInventory = (item) => {
     setGameState(prev => ({
       ...prev,
       inventory: [...prev.inventory, { ...item, id: Date.now() }]
     }));
     addLog(`Acquired: ${item.name}`, 'success');
  };

  return (
    <GameContext.Provider value={{
      gameState,
      setGameState,
      addLog,
      updateStat,
      consumeResource,
      equipItem,
      addToInventory
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Crown, Star, TrendingUp, Shield } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FellowshipsPage = () => {
  const { toast } = useToast();
  const [selectedFaction, setSelectedFaction] = useState(null);

  const factions = [
    {
      id: 1,
      name: 'Knights of Dawn',
      leader: 'Sir Galahad',
      members: 156,
      level: 25,
      description: 'Noble warriors dedicated to justice and honor',
      theme: 'gold',
      treasury: 50000,
      requirements: { level: 5, glory: 50 }
    },
    {
      id: 2,
      name: 'Shadow Syndicate',
      leader: 'Nightshade',
      members: 89,
      level: 18,
      description: 'Masters of stealth and subterfuge',
      theme: 'purple',
      treasury: 35000,
      requirements: { level: 3, haste: 50 }
    },
    {
      id: 3,
      name: 'Arcane Collective',
      leader: 'Arch-Mage Elara',
      members: 124,
      level: 22,
      description: 'Scholars and practitioners of magical arts',
      theme: 'blue',
      treasury: 45000,
      requirements: { level: 4, magic: 20 }
    },
    {
      id: 4,
      name: 'Iron Brotherhood',
      leader: 'Warlord Ragnar',
      members: 203,
      level: 28,
      description: 'Fierce warriors who value strength above all',
      theme: 'red',
      treasury: 60000,
      requirements: { level: 6, strength: 25 }
    },
    {
      id: 5,
      name: 'Merchant Guild',
      leader: 'Goldhand',
      members: 178,
      level: 20,
      description: 'Masters of trade and commerce',
      theme: 'green',
      treasury: 100000,
      requirements: { gold: 1000 }
    },
    {
      id: 6,
      name: 'Forest Keepers',
      leader: 'Sylvan',
      members: 95,
      level: 15,
      description: 'Protectors of nature and wildlife',
      theme: 'green',
      treasury: 25000,
      requirements: { level: 2, agility: 15 }
    },
    {
      id: 7,
      name: 'Dragon Clan',
      leader: 'Dragonlord Kaelthas',
      members: 67,
      level: 30,
      description: 'Elite warriors who have slain dragons',
      theme: 'crimson',
      treasury: 80000,
      requirements: { level: 10, strength: 40 }
    },
    {
      id: 8,
      name: 'Silver Circle',
      leader: 'High Priestess Luna',
      members: 112,
      level: 19,
      description: 'Healers and servants of the divine',
      theme: 'purple',
      treasury: 40000,
      requirements: { level: 3, magic: 15 }
    }
  ];

  const themeColors = {
    gold: 'from-yellow-600 to-yellow-800 border-yellow-500',
    purple: 'from-purple-600 to-purple-800 border-purple-500',
    blue: 'from-blue-600 to-blue-800 border-blue-500',
    red: 'from-red-600 to-red-800 border-red-500',
    green: 'from-green-600 to-green-800 border-green-500',
    crimson: 'from-red-700 to-red-900 border-red-600'
  };

  const handleJoinFaction = (factionId) => {
    toast({
      title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀'
    });
  };

  return (
    <>
      <Helmet>
        <title>Fellowships - Realm of Legends</title>
        <meta name="description" content="Join and manage factions" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Fellowships</h1>
            <p className="text-slate-400">Join a faction and rise through the ranks</p>
          </div>
          <Button onClick={() => toast({ title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })}>
            Create Faction
          </Button>
        </div>

        {/* Factions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factions.map((faction, index) => (
            <motion.div
              key={faction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedFaction(faction)}
              className={`bg-gradient-to-br ${themeColors[faction.theme]} rounded-lg p-6 border-2 cursor-pointer shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <Shield className="w-8 h-8 text-slate-100" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">{faction.name}</h3>
                    <p className="text-slate-200 text-sm">Led by {faction.leader}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 px-3 py-1 rounded-full">
                  <span className="text-slate-100 font-bold">Lv.{faction.level}</span>
                </div>
              </div>

              <p className="text-slate-200 mb-4">{faction.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-900/30 rounded p-2 text-center">
                  <Users className="w-5 h-5 text-slate-100 mx-auto mb-1" />
                  <p className="text-slate-100 font-bold text-sm">{faction.members}</p>
                  <p className="text-slate-300 text-xs">Members</p>
                </div>
                <div className="bg-slate-900/30 rounded p-2 text-center">
                  <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-slate-100 font-bold text-sm">{faction.level}</p>
                  <p className="text-slate-300 text-xs">Level</p>
                </div>
                <div className="bg-slate-900/30 rounded p-2 text-center">
                  <Crown className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-slate-100 font-bold text-sm">{(faction.treasury / 1000).toFixed(0)}k</p>
                  <p className="text-slate-300 text-xs">Treasury</p>
                </div>
              </div>

              <Button className="w-full" variant="secondary">
                View Details
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Faction Detail Modal */}
      <Modal
        isOpen={!!selectedFaction}
        onClose={() => setSelectedFaction(null)}
        title={selectedFaction?.name || ''}
        footer={
          <Button onClick={() => handleJoinFaction(selectedFaction?.id)}>
            Join Faction
          </Button>
        }
      >
        {selectedFaction && (
          <div className="space-y-4">
            <p className="text-slate-300">{selectedFaction.description}</p>

            <div className="bg-slate-900/50 rounded p-4">
              <h4 className="text-slate-100 font-semibold mb-2">Faction Stats:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-sm">Leader:</span>
                  <p className="text-slate-100 font-semibold">{selectedFaction.leader}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Members:</span>
                  <p className="text-slate-100 font-semibold">{selectedFaction.members}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Level:</span>
                  <p className="text-slate-100 font-semibold">{selectedFaction.level}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Treasury:</span>
                  <p className="text-yellow-400 font-semibold">{selectedFaction.treasury.toLocaleString()}g</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded p-4">
              <h4 className="text-slate-100 font-semibold mb-2">Requirements:</h4>
              <div className="space-y-1 text-sm">
                {selectedFaction.requirements.level && (
                  <p className="text-slate-300">• Level {selectedFaction.requirements.level}+</p>
                )}
                {selectedFaction.requirements.glory && (
                  <p className="text-slate-300">• Glory {selectedFaction.requirements.glory}+</p>
                )}
                {selectedFaction.requirements.strength && (
                  <p className="text-slate-300">• Strength {selectedFaction.requirements.strength}+</p>
                )}
                {selectedFaction.requirements.magic && (
                  <p className="text-slate-300">• Magic {selectedFaction.requirements.magic}+</p>
                )}
                {selectedFaction.requirements.agility && (
                  <p className="text-slate-300">• Agility {selectedFaction.requirements.agility}+</p>
                )}
                {selectedFaction.requirements.haste && (
                  <p className="text-slate-300">• Haste {selectedFaction.requirements.haste}+</p>
                )}
                {selectedFaction.requirements.gold && (
                  <p className="text-slate-300">• {selectedFaction.requirements.gold} Gold</p>
                )}
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Benefits:</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Access to faction-exclusive quests</li>
                <li>• Shared faction resources and treasury</li>
                <li>• Group bonuses in combat</li>
                <li>• Faction chat and coordination</li>
                <li>• Rank progression and rewards</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FellowshipsPage;

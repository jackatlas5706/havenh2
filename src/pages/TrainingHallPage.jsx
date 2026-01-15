import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Swords, TrendingUp, Award, Shield, Zap, AlertCircle } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import StatCard from '@/components/ui/StatCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TrainingHallPage = () => {
  const { gameState, trainStat } = useGame();
  const { toast } = useToast();
  const [selectedStat, setSelectedStat] = useState(null);
  const [trainingSessions, setTrainingSessions] = useState(1);

  const stats = [
    { 
      id: 'strength', 
      label: 'Strength', 
      icon: Swords, 
      color: 'crimson',
      description: 'Increases physical damage and carrying capacity',
      currentLevel: gameState.stats.strength,
      energyCost: 10
    },
    { 
      id: 'agility', 
      label: 'Agility', 
      icon: TrendingUp, 
      color: 'green',
      description: 'Improves evasion, critical hit chance, and attack speed',
      currentLevel: gameState.stats.agility,
      energyCost: 10
    },
    { 
      id: 'magic', 
      label: 'Magic', 
      icon: Award, 
      color: 'purple',
      description: 'Enhances spell power and mana regeneration',
      currentLevel: gameState.stats.magic,
      energyCost: 10
    },
    { 
      id: 'defense', 
      label: 'Defense', 
      icon: Shield, 
      color: 'blue',
      description: 'Reduces incoming damage and increases HP',
      currentLevel: gameState.stats.defense,
      energyCost: 10
    }
  ];

  const handleTrain = (statId) => {
    const totalEnergyCost = trainingSessions * 10;
    
    if (gameState.stats.energy < totalEnergyCost) {
      toast({
        title: 'Insufficient Energy',
        description: `You need ${totalEnergyCost} energy to train ${trainingSessions} session(s).`,
        variant: 'destructive'
      });
      return;
    }

    const cooldown = gameState.trainingCooldowns[statId];
    if (cooldown && Date.now() < cooldown) {
      toast({
        title: 'Training Cooldown',
        description: 'You must wait before training this stat again.',
        variant: 'destructive'
      });
      return;
    }

    const success = trainStat(statId, trainingSessions);
    
    if (success) {
      toast({
        title: 'Training Complete!',
        description: `${stats.find(s => s.id === statId)?.label} increased by ${trainingSessions}!`,
        variant: 'default'
      });
      setSelectedStat(null);
      setTrainingSessions(1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Training Hall - Realm of Legends</title>
        <meta name="description" content="Train your character stats" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Training Hall</h1>
            <p className="text-slate-400">Improve your character's abilities</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-100 font-bold">
                {gameState.stats.energy}/{gameState.stats.maxEnergy} Energy
              </span>
            </div>
          </div>
        </div>

        {/* Energy Warning */}
        {gameState.stats.energy < 10 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border-2 border-red-600 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Low Energy!</h3>
                <p className="text-slate-300 text-sm">You need at least 10 energy to train. Rest or use energy potions.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Training Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-6 border-2 border-slate-700 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br from-${stat.color}-600 to-${stat.color}-800 p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-slate-100" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{stat.label}</h3>
                    <p className="text-slate-400 text-sm">Level {stat.currentLevel}</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4">{stat.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Energy Cost:</span>
                  <span className="text-yellow-400 font-semibold">{stat.energyCost} per session</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current Level:</span>
                  <span className="text-slate-100 font-semibold">{stat.currentLevel}</span>
                </div>
              </div>

              <ProgressBar
                value={stat.currentLevel % 10}
                max={10}
                label="Progress to Bonus"
                color={stat.color}
                className="mb-4"
              />

              <Button
                onClick={() => setSelectedStat(stat)}
                className="w-full"
                disabled={gameState.stats.energy < stat.energyCost}
              >
                Train {stat.label}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Training History */}
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Recent Training Sessions</h2>
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 divide-y divide-slate-700">
            {gameState.activities
              .filter(a => a.type === 'training')
              .slice(0, 10)
              .map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-100">{activity.description}</span>
                    <span className="text-slate-400 text-sm">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            {gameState.activities.filter(a => a.type === 'training').length === 0 && (
              <p className="text-slate-400 text-center py-8">No training history yet</p>
            )}
          </div>
        </div>

        {/* Training Modal */}
        {selectedStat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-lg p-6 border-2 border-purple-500 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Train {selectedStat.label}
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">
                    Training Sessions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={Math.floor(gameState.stats.energy / 10)}
                    value={trainingSessions}
                    onChange={(e) => setTrainingSessions(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="bg-slate-900/50 rounded p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Energy Cost:</span>
                    <span className="text-yellow-400 font-semibold">
                      {trainingSessions * selectedStat.energyCost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stat Increase:</span>
                    <span className="text-green-400 font-semibold">+{trainingSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience Gained:</span>
                    <span className="text-purple-400 font-semibold">+{trainingSessions * 10}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleTrain(selectedStat.id)}
                  className="flex-1"
                  disabled={gameState.stats.energy < trainingSessions * selectedStat.energyCost}
                >
                  Confirm Training
                </Button>
                <Button
                  onClick={() => setSelectedStat(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TrainingHallPage;

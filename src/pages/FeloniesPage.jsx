import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Skull, AlertTriangle, TrendingDown, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FeloniesPage = () => {
  const { gameState, commitFelony } = useGame();
  const { toast } = useToast();
  const [selectedFelony, setSelectedFelony] = useState(null);

  const felonies = [
    { id: 1, name: 'Pickpocket', description: 'Steal from unsuspecting citizens', hasteCost: 5, rewards: { gold: 50 }, gloryLoss: 2, risk: 'Low', bounty: 10, successChance: 70 },
    { id: 2, name: 'Burglary', description: 'Break into a home and steal valuables', hasteCost: 10, rewards: { gold: 150 }, gloryLoss: 5, risk: 'Medium', bounty: 50, successChance: 50 },
    { id: 3, name: 'Highway Robbery', description: 'Rob travelers on the road', hasteCost: 15, rewards: { gold: 300 }, gloryLoss: 10, risk: 'High', bounty: 100, successChance: 40 },
    { id: 4, name: 'Smuggling', description: 'Transport illegal goods across borders', hasteCost: 12, rewards: { gold: 250 }, gloryLoss: 7, risk: 'Medium', bounty: 75, successChance: 55 },
    { id: 5, name: 'Forgery', description: 'Create and sell fake documents', hasteCost: 8, rewards: { gold: 100 }, gloryLoss: 3, risk: 'Low', bounty: 25, successChance: 65 },
    { id: 6, name: 'Assassination', description: 'Eliminate a high-profile target', hasteCost: 25, rewards: { gold: 1000 }, gloryLoss: 25, risk: 'High', bounty: 500, successChance: 30 },
    { id: 7, name: 'Extortion', description: 'Threaten merchants for protection money', hasteCost: 10, rewards: { gold: 200 }, gloryLoss: 8, risk: 'Medium', bounty: 60, successChance: 50 },
    { id: 8, name: 'Prison Break', description: 'Free prisoners from the city jail', hasteCost: 20, rewards: { gold: 500 }, gloryLoss: 15, risk: 'High', bounty: 200, successChance: 35 },
    { id: 9, name: 'Counterfeiting', description: 'Produce fake currency', hasteCost: 15, rewards: { gold: 400 }, gloryLoss: 10, risk: 'High', bounty: 150, successChance: 40 },
    { id: 10, name: 'Grand Theft', description: 'Steal an extremely valuable item', hasteCost: 30, rewards: { gold: 2000 }, gloryLoss: 30, risk: 'High', bounty: 1000, successChance: 25 }
  ];

  const riskColors = {
    Low: 'text-green-400 border-green-600',
    Medium: 'text-yellow-400 border-yellow-600',
    High: 'text-red-400 border-red-600'
  };

  const handleCommitFelony = (felony) => {
    if (gameState.stats.haste < felony.hasteCost) {
      toast({
        title: 'Insufficient Haste',
        description: `You need ${felony.hasteCost} haste to commit this felony.`,
        variant: 'destructive'
      });
      return;
    }

    const result = commitFelony(felony);
    
    if (result.success) {
      toast({
        title: 'Felony Successful! 💰',
        description: result.message,
        variant: 'default'
      });
    } else {
      toast({
        title: 'Felony Failed! 🚨',
        description: result.message,
        variant: 'destructive'
      });
    }
    
    setSelectedFelony(null);
  };

  return (
    <>
      <Helmet>
        <title>Felonies - Realm of Legends</title>
        <meta name="description" content="Engage in criminal activities" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Criminal Activities</h1>
            <p className="text-slate-400">High risk, high reward</p>
          </div>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/20 border-2 border-red-600 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-red-400 font-semibold">Warning</h3>
              <p className="text-slate-300 text-sm">Criminal activities will reduce your glory and increase your wanted level. Proceed with caution!</p>
            </div>
          </div>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Skull className="w-5 h-5 text-red-400" />
              <span className="text-slate-400 text-sm">Wanted Level</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{gameState.wantedLevel}/5</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Bounty</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{gameState.bounty}g</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Glory</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">{gameState.stats.glory}</p>
          </div>
        </div>

        {/* Felonies Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Available Felonies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {felonies.map((felony, index) => (
              <motion.div
                key={felony.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFelony(felony)}
                className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700 hover:border-red-600 cursor-pointer shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-slate-100 font-bold text-lg mb-1">{felony.name}</h3>
                    <p className="text-slate-300 text-sm mb-2">{felony.description}</p>
                    <span className={`text-xs px-2 py-1 rounded border ${riskColors[felony.risk]}`}>
                      {felony.risk} RISK
                    </span>
                  </div>
                  <Skull className="w-6 h-6 text-red-400" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm pt-3 border-t border-slate-700">
                  <div>
                    <span className="text-slate-400">Haste Cost:</span>
                    <p className="text-blue-400 font-semibold">{felony.hasteCost}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Reward:</span>
                    <p className="text-yellow-400 font-semibold">{felony.rewards.gold}g</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Glory Loss:</span>
                    <p className="text-red-400 font-semibold">-{felony.gloryLoss}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Bounty:</span>
                    <p className="text-orange-400 font-semibold">+{felony.bounty}g</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Felonies */}
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Recent Activities</h2>
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 divide-y divide-slate-700">
            {gameState.activities
              .filter(a => a.type === 'felony')
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
            {gameState.activities.filter(a => a.type === 'felony').length === 0 && (
              <p className="text-slate-400 text-center py-8">No criminal record... yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Felony Confirmation Modal */}
      <Modal
        isOpen={!!selectedFelony}
        onClose={() => setSelectedFelony(null)}
        title={`Commit ${selectedFelony?.name}?`}
        footer={
          <>
            <Button variant="outline" onClick={() => setSelectedFelony(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleCommitFelony(selectedFelony)}>
              Commit Felony
            </Button>
          </>
        }
      >
        {selectedFelony && (
          <div className="space-y-4">
            <p className="text-slate-300">{selectedFelony.description}</p>

            <div className="bg-red-900/20 border border-red-600 rounded p-4">
              <h4 className="text-red-400 font-semibold mb-2">Risk Assessment:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">Success Chance:</span>
                  <span className="text-green-400 font-semibold">{selectedFelony.successChance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Risk Level:</span>
                  <span className={riskColors[selectedFelony.risk].split(' ')[0]}>
                    {selectedFelony.risk}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded p-4">
              <h4 className="text-slate-100 font-semibold mb-2">Costs & Consequences:</h4>
              <div className="space-y-1 text-sm">
                <p className="text-blue-400">• Haste Cost: {selectedFelony.hasteCost}</p>
                <p className="text-red-400">• Glory Loss: -{selectedFelony.gloryLoss}</p>
                <p className="text-orange-400">• Bounty Increase: +{selectedFelony.bounty}g</p>
                <p className="text-purple-400">• Wanted Level: +1</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded p-4">
              <h4 className="text-slate-100 font-semibold mb-2">Potential Rewards:</h4>
              <p className="text-yellow-400 text-lg font-bold">💰 {selectedFelony.rewards.gold} Gold</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FeloniesPage;

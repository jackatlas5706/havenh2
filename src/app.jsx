import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { GameProvider } from '@/contexts/GameContext';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import CombatPage from '@/pages/CombatPage';
import EconomyPage from '@/pages/EconomyPage';
import FactionsPage from '@/pages/FactionsPage';
import TrainingPage from '@/pages/TrainingPage';
import HospitalPage from '@/pages/HospitalPage';
import JailPage from '@/pages/JailPage';
import TravelPage from '@/pages/TravelPage';
import NPCPage from '@/pages/NPCPage';
import CraftingPage from '@/pages/CraftingPage';
import BountyPage from '@/pages/BountyPage';
import EducationPage from '@/pages/EducationPage';
import StatsPage from '@/pages/StatsPage';
import EnergyPage from '@/pages/EnergyPage'; // Mana
import NervePage from '@/pages/NervePage'; // Adrenaline
import CrewPage from '@/pages/CrewPage';
import InventoryPage from '@/pages/InventoryPage';
import RankingsPage from '@/pages/RankingsPage';
import QuestsPage from '@/pages/QuestsPage';
import BlackMarketPage from '@/pages/BlackMarketPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />;
      case 'combat': return <CombatPage />;
      case 'economy': return <EconomyPage />;
      case 'factions': return <FactionsPage />;
      case 'training': return <TrainingPage />;
      case 'hospital': return <HospitalPage />;
      case 'jail': return <JailPage />;
      case 'travel': return <TravelPage />;
      case 'npcs': return <NPCPage />;
      case 'crafting': return <CraftingPage />;
      case 'bounties': return <BountyPage />;
      case 'education': return <EducationPage />;
      case 'stats': return <StatsPage />;
      case 'energy': return <EnergyPage />;
      case 'nerve': return <NervePage />;
      case 'crew': return <CrewPage />;
      case 'inventory': return <InventoryPage />;
      case 'rankings': return <RankingsPage />;
      case 'quests': return <QuestsPage />;
      case 'blackmarket': return <BlackMarketPage />;
      case 'settings': return <SettingsPage />;
      default: return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <GameProvider>
      <Helmet>
        <title>Kingdom of Aethermoor | Fantasy RPG</title>
        <meta name="description" content="Immersive browser-based fantasy RPG set in the Kingdom of Aethermoor." />
      </Helmet>
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderPage()}
      </MainLayout>
      <Toaster />
    </GameProvider>
  );
}

export default App;

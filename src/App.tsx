import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';
import { LeadDetailModal } from './components/LeadDetailModal.tsx';
import { AiAssistantModal } from './components/AiAssistantModal.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { AddLeadModal } from './components/AddLeadModal.tsx';
import { BillingModal } from './components/BillingModal.tsx';

import { DashboardView } from './views/DashboardView.tsx';
import { LeadsView } from './views/LeadsView.tsx';
import { DiscoveryView } from './views/DiscoveryView.tsx';
import { PipelineView } from './views/PipelineView.tsx';
import { SettingsView } from './views/SettingsView.tsx';

const MainLayout: React.FC = () => {
  const { activeTab, isLoading, t } = useApp();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-24 sm:pb-28 md:pb-8">
        {/* Sticky Top Navbar */}
        <Navbar />

        {/* View Router */}
        <main className="flex-1 px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 max-w-7xl w-full mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-neutral-400">
              <div className="w-8 h-8 rounded-full border-2 border-orange-600 border-t-transparent animate-spin" />
              <p className="text-xs font-semibold">{t.common.loading}</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'leads' && <LeadsView />}
              {activeTab === 'search' && <DiscoveryView />}
              {activeTab === 'pipeline' && <PipelineView />}
              {activeTab === 'settings' && <SettingsView />}
            </>
          )}
        </main>
      </div>

      {/* Mobile-first Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Dialogs */}
      <LeadDetailModal />
      <AiAssistantModal />
      <OnboardingModal />
      <AddLeadModal />
      <BillingModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

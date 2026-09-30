import React, { useState, useEffect } from 'react';
import { getStoredAuth, clearStoredAuth } from './api';
import LoginView from './components/LoginView';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import OverviewSection from './components/OverviewSection';
import UploadSchemeSection from './components/UploadSchemeSection';
import SchemesDirectory from './components/SchemesDirectory';
import HeatmapPreview from './components/HeatmapPreview';
import SchemeManagement from './components/SchemeManagement';
import CitizenManagement from './components/CitizenManagement';
import RAGVectorStore from './components/RAGVectorStore';
import SystemLogs from './components/SystemLogs';
import APIIntegrations from './components/APIIntegrations';
import SettingsPage from './components/SettingsPage';
import './index.css';

const DEFAULT_DEMO_AUTH = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.NaGwKb8dJukRfPsZ6GtODVAqpQqZkvjYOSOi-jLkMZc',
  user: {
    email: 'admin@curaterra.gov.in',
    role: 'admin',
    name: 'Government Administrator',
  },
};

const PAGE_TITLES = {
  overview:          'Dashboard',
  upload:            'Upload Scheme Circular',
  schemes:           'Schemes Directory',
  heatmap:           'Geo Heat Map Analytics',
  'scheme-mgmt':     'Scheme Management',
  'citizen-mgmt':    'Citizen Management',
  'rag-store':       'RAG Vector Store',
  'system-logs':     'System Logs',
  'api-integrations':'API & Integrations',
  settings:          'Settings',
};

export default function App() {
  const [auth, setAuth] = useState(() => getStoredAuth());
  
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'overview';
  });
  
  const [preselectedScheme, setPreselectedScheme] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const current = getStoredAuth();
    if (current?.user?.role === 'admin') {
      setAuth(current);
    } else {
      setAuth(null);
    }
  }, []);

  // Sync hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash !== 'upload') setPreselectedScheme(null);
        setActiveTab(hash);
      } else {
        setActiveTab('overview');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = (data) => {
    setAuth({
      token: data.token,
      user: { email: data.email || 'admin@curaterra.gov.in', role: data.role || 'admin' },
    });
    window.location.hash = 'overview';
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
    setPreselectedScheme(null);
    window.location.hash = '';
  };

  const handleEditScheme = (scheme) => {
    setPreselectedScheme(scheme);
    window.location.hash = 'upload';
  };

  const handleSchemeUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const navigateTo = (tab) => {
    if (tab !== 'upload') setPreselectedScheme(null);
    window.location.hash = tab;
    setMobileSidebarOpen(false);
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileSidebarOpen(o => !o);
    } else {
      setSidebarCollapsed(c => !c);
    }
  };

  if (!auth) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection onNavigateTab={navigateTo} />;
      case 'upload':
        return (
          <UploadSchemeSection
            key={refreshTrigger}
            preselectedScheme={preselectedScheme}
            onSchemeUpdated={handleSchemeUpdated}
          />
        );
      case 'schemes':
        return <SchemesDirectory key={refreshTrigger} onEditScheme={handleEditScheme} />;
      case 'heatmap':
        return <HeatmapPreview />;
      case 'scheme-mgmt':
        return <SchemeManagement />;
      case 'citizen-mgmt':
        return <CitizenManagement />;
      case 'rag-store':
        return <RAGVectorStore />;
      case 'system-logs':
        return <SystemLogs />;
      case 'api-integrations':
        return <APIIntegrations />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewSection onNavigateTab={navigateTo} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="sidebar-overlay visible"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        user={auth.user}
        onLogout={handleLogout}
        className={`${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}
      />

      {/* Main content */}
      <div className={`main-area ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <TopHeader
          activeTab={activeTab}
          onToggleSidebar={toggleSidebar}
          user={auth.user}
        />

        <main className="page-content">
          {activeTab !== 'overview' && (
            <div className="page-header">
              <div className="page-header-top">
                <div>
                  <h2 className="page-title">{PAGE_TITLES[activeTab] || 'Dashboard'}</h2>
                </div>
              </div>
            </div>
          )}

          {renderPage()}
        </main>
      </div>
    </div>
  );
}

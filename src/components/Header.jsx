import React from 'react';
import { 
  Building2, 
  FileUp, 
  Layers, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Activity,
  UserCheck,
  Sparkles
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <header className="glass-header-wrapper">
      <div className="glass-card glass-navbar">
        {/* Brand Logo & Name */}
        <div className="brand-cluster">
          <div className="brand-icon-box">
            <ShieldCheck size={22} className="brand-svg" />
          </div>
          <div className="brand-naming">
            <div className="brand-title-flex">
              <span className="gradient-text brand-gradient-title">CuraTerra AI</span>
              <span className="brand-role-chip">ADMIN</span>
            </div>
            <div className="brand-subtext">
              Unified Scheme Governance & Ingestion
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="glass-nav-links">
          <button
            className={`glass-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Activity size={16} />
            <span>Dashboard</span>
            {activeTab === 'overview' && <div className="tab-glow-indicator" />}
          </button>

          <button
            className={`glass-nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <FileUp size={16} />
            <span>Upload Scheme (PDF)</span>
            <span className="feature-pill blue">Feature 1</span>
            {activeTab === 'upload' && <div className="tab-glow-indicator" />}
          </button>

          <button
            className={`glass-nav-tab ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('schemes')}
          >
            <Layers size={16} />
            <span>Schemes Directory</span>
            {activeTab === 'schemes' && <div className="tab-glow-indicator" />}
          </button>

          <button
            className={`glass-nav-tab ${activeTab === 'heatmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('heatmap')}
          >
            <MapPin size={16} />
            <span>Geo Heat Map</span>
            <span className="feature-pill purple">Phase 2</span>
            {activeTab === 'heatmap' && <div className="tab-glow-indicator" />}
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="glass-right-cluster">
          <div className="live-server-tag">
            <span className="server-dot"></span>
            <span>API 5000</span>
          </div>

          <div className="officer-pill">
            <UserCheck size={14} className="officer-svg" />
            <span className="officer-text">{user?.email || 'admin@gmail.com'}</span>
          </div>

          <button onClick={onLogout} className="glass-logout-btn" title="Sign Out">
            <LogOut size={15} />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
}

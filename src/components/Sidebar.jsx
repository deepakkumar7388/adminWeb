import React from 'react';
import {
  Home,
  FileText,
  Layers,
  MapPin,
  Settings2,
  Users,
  Database,
  ScrollText,
  Link2,
  Settings,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';
import EmblemOfIndia from './EmblemOfIndia';

const MAIN_NAV = [
  { id: 'overview',    label: 'Dashboard',          icon: Home },
  { id: 'upload',      label: 'Upload Scheme (PDF)', icon: FileText },
  { id: 'schemes',     label: 'Schemes Directory',   icon: Layers },
  { id: 'heatmap',     label: 'Geo Heat Map',        icon: MapPin },
];

const ADMIN_NAV = [
  { id: 'scheme-mgmt',  label: 'Scheme Management',  icon: Settings2 },
  { id: 'citizen-mgmt', label: 'Citizen Management', icon: Users },
  { id: 'rag-store',    label: 'RAG Vector Store',   icon: Database },
  { id: 'system-logs',  label: 'System Logs',        icon: ScrollText },
];

const SYSTEM_NAV = [
  { id: 'api-integrations', label: 'API & Integrations', icon: Link2 },
  { id: 'settings',         label: 'Settings',           icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, user, onLogout, className = '' }) {
  return (
    <aside className={`ct-sidebar ${className}`} role="navigation" aria-label="Main navigation">
      {/* Brand & Emblem Header */}
      <div className="sidebar-brand">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <EmblemOfIndia size={42} color="#F8FAFC" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
          {/* Hexagon Logo Icon */}
          <div style={{ flexShrink: 0, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ctHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <polygon
                points="17,3 30,10.5 30,23.5 17,31 4,23.5 4,10.5"
                stroke="url(#ctHexGrad)"
                strokeWidth="3.2"
                strokeLinejoin="round"
                fill="rgba(29, 78, 216, 0.15)"
              />
              <circle cx="17" cy="17" r="4.5" fill="#60a5fa" />
            </svg>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '-0.3px',
              lineHeight: 1.1,
              color: '#ffffff'
            }}>
              CuraTerra <span style={{ color: '#60a5fa' }}>AI</span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.3,
              marginTop: 2,
              fontWeight: 400
            }}>
              Unified Scheme Governance<br />&amp; Ingestion
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Main group - no header in reference */}
        <div style={{ marginBottom: 6 }}>
          {MAIN_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
            >
              <Icon size={17} className="nav-item-icon" />
              {label}
            </button>
          ))}
        </div>

        <div className="nav-group-label">ADMINISTRATION</div>
        <div style={{ marginBottom: 6 }}>
          {ADMIN_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
            >
              <Icon size={17} className="nav-item-icon" />
              {label}
            </button>
          ))}
        </div>

        <div className="nav-group-label">SYSTEM</div>
        <div>
          {SYSTEM_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
            >
              <Icon size={17} className="nav-item-icon" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Profile & Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-profile-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
            <div className="sidebar-avatar" style={{ background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={15} color="#e2e8f0" />
            </div>
            <div className="sidebar-profile-info" style={{ minWidth: 0 }}>
              <div className="sidebar-profile-email" title={user?.email || 'admin@curaterra.gov.in'} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email || 'admin@curaterra.gov.in'}
              </div>
              <div className="sidebar-profile-role">Administrator</div>
            </div>
          </div>
          <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
        </div>

        <button className="sidebar-logout-btn" onClick={onLogout}>
          <LogOut size={14} />
          Logout / Exit
        </button>
      </div>
    </aside>
  );
}

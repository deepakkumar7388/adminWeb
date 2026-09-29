import React, { useState } from 'react';
import { Menu, ChevronDown, Bell, User, Search, Shield, CheckCircle } from 'lucide-react';

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

export default function TopHeader({ activeTab, onToggleSidebar, user }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="ct-header">
      {/* Top Tricolor Accent Line */}
      <div className="header-tricolor-bar" />

      {/* Left section: Hamburger & Page Title */}
      <div className="header-left">
        <button
          className="header-hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
          title="Toggle Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="header-title-wrap">
          <div className="header-breadcrumb-tag">GOVERNMENT OF INDIA • CURATERRA AI</div>
          <h1 className="header-page-title">{PAGE_TITLES[activeTab] || 'Dashboard'}</h1>
        </div>
      </div>

      {/* Center section: Quick Search (Desktop) */}
      <div className="header-center">
        <div className="header-search-wrap">
          <Search size={14} className="header-search-icon" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search circulars, ministries, districts..."
          />
          <kbd className="header-search-kbd">Ctrl K</kbd>
        </div>
      </div>

      {/* Right section: System Status & User Actions */}
      <div className="header-right">
        {/* Live Server Beacon */}
        <div className="header-status-pill" title="Connected to National Informatics Centre (NIC) Cloud">
          <span className="api-dot" />
          <span className="status-label">NIC Cloud Live</span>
        </div>

        {/* Phase Pill */}
        <div className="header-phase-badge">Phase 2</div>

        <div className="header-divider" />

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-icon-btn"
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
            aria-label="System Notifications"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="notification-badge">3</span>
          </button>

          {notifOpen && (
            <div className="header-dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-900)' }}>
                  Administrative Alerts
                </div>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>3 New</span>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <div className="notif-dot" />
                  <div>
                    <div className="notif-title">PM-Kisan Circular v2.4 Ingested</div>
                    <div className="notif-time">10 mins ago • Vector index synced</div>
                  </div>
                </div>
                <div className="notif-item unread">
                  <div className="notif-dot" />
                  <div>
                    <div className="notif-title">Maharashtra Saturation crossed 82%</div>
                    <div className="notif-time">1 hour ago • Geo Heatmap sync</div>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot read" />
                  <div>
                    <div className="notif-title">MongoDB Citizen Roster Synchronized</div>
                    <div className="notif-time">Yesterday • 148 verified records</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-profile-btn"
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            aria-label="Profile and account menu"
          >
            <div className="header-avatar">
              <User size={15} color="var(--primary)" />
            </div>
            <div className="header-user-meta">
              <span className="header-user-name">
                {user?.name || 'Administrator'}
              </span>
              <span className="header-user-email">
                {user?.email || 'admin@curaterra.gov.in'}
              </span>
            </div>
            <ChevronDown size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
          </button>

          {profileOpen && (
            <div className="header-dropdown-menu profile-dropdown">
              <div className="dropdown-header">
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-900)' }}>
                  {user?.name || 'Government Administrator'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-400)' }}>
                  {user?.email || 'admin@curaterra.gov.in'}
                </div>
                <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }} className="badge badge-success">
                  <CheckCircle size={10} /> Certified Admin Role
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                <div style={{ padding: '8px 14px', fontSize: '0.74rem', color: 'var(--text-400)' }}>
                  Security: 2FA Enforced (Aadhaar OTP)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { Save, Globe, Bell, Palette, Database, Cpu, Settings2 } from 'lucide-react';

const SIDEBAR_TABS = [
  { id: 'general',    label: 'General',          icon: Settings2 },
  { id: 'api',        label: 'API Configuration', icon: Globe },
  { id: 'ai',         label: 'AI & LLM Settings', icon: Cpu },
  { id: 'notify',     label: 'Notifications',     icon: Bell },
  { id: 'appearance', label: 'Appearance',         icon: Palette },
  { id: 'backup',     label: 'Backup & Restore',  icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [auditLogs, setAuditLogs] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [themeMode, setThemeMode] = useState('Light');

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20 }}>
        Configure system settings, API keys and preferences.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
        {/* Settings sidebar */}
        <div className="ct-card" style={{ padding: '8px 0', alignSelf: 'start' }}>
          {SIDEBAR_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '10px 16px', width: '100%', border: 'none',
                background: activeTab === id ? 'var(--primary-light)' : 'transparent',
                color: activeTab === id ? 'var(--primary)' : 'var(--text-500)',
                fontWeight: activeTab === id ? 600 : 400,
                fontSize: '0.82rem', cursor: 'pointer',
                borderLeft: activeTab === id ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={14} style={{ opacity: 0.8 }} /> {label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="ct-card" style={{ padding: 28 }}>
          {activeTab === 'general' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                General Settings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Organization Name</label>
                  <input className="form-control" defaultValue="CuraTerra AI" />
                </div>
                <div className="form-group">
                  <label className="form-label">Admin Email</label>
                  <input className="form-control" defaultValue="admin@curaterra.gov.in" />
                </div>
                <div className="form-group">
                  <label className="form-label">Default Language</label>
                  <select className="form-control" defaultValue="en">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bi">Bilingual</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Time Zone</label>
                  <select className="form-control" defaultValue="Asia/Kolkata">
                    <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-700)', marginBottom: 14 }}>System Flags</h4>
                {[
                  { label: 'Enable Audit Logs', desc: 'Log all administrative actions for governance compliance', val: auditLogs, set: setAuditLogs },
                  { label: 'Maintenance Mode', desc: 'Restrict access to administrators only during maintenance', val: maintenance, set: setMaintenance },
                ].map(({ label, desc, val, set }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    gap: 16, padding: '14px 0', borderBottom: '1px solid #f1f5f9',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.845rem', fontWeight: 600, color: 'var(--text-700)' }}>{label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-400)', marginTop: 2 }}>{desc}</div>
                    </div>
                    <button
                      onClick={() => set(v => !v)}
                      style={{
                        width: 42, height: 22, borderRadius: 11,
                        background: val ? 'var(--primary)' : '#d1d9e0',
                        border: 'none', cursor: 'pointer', position: 'relative',
                        transition: 'background 0.2s', flexShrink: 0,
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 2, left: val ? 22 : 2,
                        width: 18, height: 18, borderRadius: '50%', background: '#fff',
                        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                API Configuration
              </h3>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { label: 'Backend API URL',   val: 'http://localhost:5000/api' },
                  { label: 'API Timeout (ms)',   val: '2500' },
                  { label: 'Max Upload Size',    val: '30' },
                  { label: 'CORS Origin',        val: 'http://localhost:5173' },
                ].map(({ label, val }) => (
                  <div className="form-group" key={label}>
                    <label className="form-label">{label}</label>
                    <input className="form-control" defaultValue={val} />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Groq API Key</label>
                  <input className="form-control" type="password" defaultValue="gsk_••••••••••••••••••••••••" />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-300)', marginTop: 4 }}>
                    Never share your API key. Stored encrypted in environment variables.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                AI & LLM Settings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">LLM Model</label>
                  <select className="form-control" defaultValue="llama-3.3-70b-versatile">
                    <option value="llama-3.3-70b-versatile">Groq LLaMA-3.3-70B</option>
                    <option value="llama-3.1-8b-instant">Groq LLaMA-3.1-8B</option>
                    <option value="mixtral-8x7b">Mixtral 8x7B</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Temperature</label>
                  <input className="form-control" type="number" defaultValue="0.2" min="0" max="1" step="0.1" />
                </div>
                <div className="form-group">
                  <label className="form-label">Vector Store Type</label>
                  <select className="form-control" defaultValue="faiss">
                    <option value="faiss">FAISS (Local)</option>
                    <option value="chroma">ChromaDB</option>
                    <option value="pinecone">Pinecone (Cloud)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Chunk Size (tokens)</label>
                  <input className="form-control" type="number" defaultValue="512" />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label className="form-label">Embedding Model</label>
                  <select className="form-control" defaultValue="all-MiniLM-L6-v2">
                    <option value="all-MiniLM-L6-v2">sentence-transformers/all-MiniLM-L6-v2</option>
                    <option value="paraphrase-multilingual">paraphrase-multilingual-MiniLM-L12-v2</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notify' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                Notification Settings
              </h3>
              {[
                { label: 'Email Notifications', desc: 'Receive email alerts for critical system events', val: emailNotify, set: setEmailNotify },
                { label: 'Upload Alerts',        desc: 'Notify on PDF ingestion success or failure', val: true,        set: () => {} },
                { label: 'Weekly Reports',       desc: 'Send weekly scheme usage summary reports',   val: false,       set: () => {} },
              ].map(({ label, desc, val, set }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  gap: 16, padding: '14px 0', borderBottom: '1px solid #f1f5f9',
                }}>
                  <div>
                    <div style={{ fontSize: '0.845rem', fontWeight: 600, color: 'var(--text-700)' }}>{label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-400)', marginTop: 2 }}>{desc}</div>
                  </div>
                  <button onClick={() => set(v => !v)} style={{
                    width: 42, height: 22, borderRadius: 11,
                    background: val ? 'var(--primary)' : '#d1d9e0',
                    border: 'none', cursor: 'pointer', position: 'relative',
                    transition: 'background 0.2s', flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', top: 2, left: val ? 22 : 2,
                      width: 18, height: 18, borderRadius: '50%', background: '#fff',
                      transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }} />
                  </button>
                </div>
              ))}
              <div className="form-group" style={{ marginTop: 20 }}>
                <label className="form-label">Notification Email</label>
                <input className="form-control" defaultValue="admin@curaterra.gov.in" />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                Appearance
              </h3>
              <div className="form-group">
                <label className="form-label">Theme Mode</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Light', 'Dark', 'System'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setThemeMode(t)}
                      className={`btn btn-sm ${themeMode === t ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {['#1d4ed8','#7c3aed','#0284c7','#059669'].map(c => (
                    <div key={c} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c,
                      cursor: 'pointer', border: c === '#1d4ed8' ? '2px solid var(--text-900)' : '2px solid transparent',
                    }} />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Font Size</label>
                <select className="form-control" style={{ width: 200 }}>
                  <option>Small (14px)</option>
                  <option selected>Default (15px)</option>
                  <option>Large (16px)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 20 }}>
                Backup & Restore
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'Last Backup', val: '29 Sep 2026, 12:00 AM', status: 'Healthy', cls: 'badge-success' },
                  { label: 'Backup Size', val: '4.2 MB',               status: 'Compressed', cls: 'badge-info' },
                  { label: 'Schedule',    val: 'Daily at 00:00 IST',    status: 'Automated', cls: 'badge-purple' },
                  { label: 'Retention',   val: '30 days',               status: 'Compliant', cls: 'badge-warning' },
                ].map(({ label, val, status, cls }) => (
                  <div key={label} style={{
                    padding: '14px 16px', background: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)',
                    display: 'flex', flexDirection: 'column', gap: 4
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
                      <span className={`badge ${cls}`} style={{ fontSize: '0.65rem' }}>{status}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-900)' }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary btn-sm">Create Backup Now</button>
                <button className="btn btn-secondary btn-sm">Download Latest Backup</button>
                <button className="btn btn-outline btn-sm">Restore from Backup</button>
              </div>
            </div>
          )}

          {/* Save button */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--card-border)' }}>
            {saved && <span style={{ fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600 }}>✓ Settings saved</span>}
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={14} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

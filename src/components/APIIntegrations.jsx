import React, { useState } from 'react';
import { RefreshCw, Wifi } from 'lucide-react';

const SERVICES = [
  {
    group: 'API Server',
    items: [
      { label: 'Flask Backend',    value: 'http://localhost:5000', status: 'connected', note: 'Port 5000 • REST API' },
      { label: 'API Version',      value: 'v1.4.2',               status: 'connected', note: 'Latest stable' },
    ]
  },
  {
    group: 'Database',
    items: [
      { label: 'MongoDB',          value: 'localhost:27017',       status: 'connected', note: 'curatera_db' },
      { label: 'Connection Pool',  value: '10 / 50 active',        status: 'connected', note: 'Healthy' },
    ]
  },
  {
    group: 'AI Services',
    items: [
      { label: 'Groq LLaMA-3.3-70B', value: 'api.groq.com',      status: 'connected', note: 'Inference API' },
      { label: 'Embedding Model',     value: 'sentence-transformers', status: 'connected', note: 'Local HuggingFace' },
    ]
  },
  {
    group: 'Vector Store',
    items: [
      { label: 'FAISS Index',      value: './data/faiss_index',    status: 'connected', note: '6 docs • 1.2M vectors' },
      { label: 'Index Status',     value: 'Synchronized',          status: 'connected', note: 'Last sync: Today 09:22' },
    ]
  },
  {
    group: 'Authentication',
    items: [
      { label: 'JWT Auth',         value: 'HS256 Algorithm',       status: 'connected', note: 'Session: 24h' },
      { label: 'Admin Guard',      value: 'Role-based Access',     status: 'connected', note: 'Admin only' },
    ]
  },
  {
    group: 'External Services',
    items: [
      { label: 'DigiLocker API',   value: 'api.digilocker.gov.in', status: 'warning',   note: 'Integration pending' },
      { label: 'UMANG Gateway',    value: 'api.umang.gov.in',      status: 'disconnected', note: 'Phase 2' },
    ]
  },
];

const StatusIcon = ({ status }) => {
  if (status === 'connected')    return <span style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'var(--success)', marginRight:5 }} />;
  if (status === 'disconnected') return <span style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'var(--danger)', marginRight:5 }} />;
  return <span style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'var(--warning)', marginRight:5 }} />;
};

const statusLabel = (s) => ({
  connected: { label: 'Connected', cls: 'badge-success' },
  disconnected: { label: 'Disconnected', cls: 'badge-danger' },
  warning: { label: 'Warning', cls: 'badge-warning' },
}[s] || { label: 'Unknown', cls: 'badge-info' });

export default function APIIntegrations() {
  const [testing, setTesting] = useState(false);

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => setTesting(false), 2000);
  };

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20, maxWidth: 560 }}>
        Monitor all API connections, database status, AI services and external integrations.
      </p>

      {/* Action bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button className="btn btn-primary btn-sm" onClick={handleTest} disabled={testing}>
          {testing
            ? <><div className="spinner" style={{ width:13,height:13,borderWidth:2,borderTopColor:'#fff',borderColor:'rgba(255,255,255,0.3)' }} /> Testing...</>
            : <><Wifi size={13} /> Test Connection</>}
        </button>
        <button className="btn btn-secondary btn-sm">
          <RefreshCw size={13} /> Refresh Status
        </button>
      </div>

      {/* Service groups */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {SERVICES.map(({ group, items }) => (
          <div key={group} className="ct-card" style={{ padding: 20 }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700,
              color: 'var(--text-900)', marginBottom: 14,
              paddingBottom: 10, borderBottom: '1px solid var(--card-border)',
            }}>
              {group}
            </h4>
            {items.map(item => {
              const st = statusLabel(item.status);
              return (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  gap: 10, marginBottom: 12, paddingBottom: 12,
                  borderBottom: '1px solid #f1f5f9',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-700)', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.77rem', color: 'var(--text-400)' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-300)', marginTop: 2 }}>
                      {item.note}
                    </div>
                  </div>
                  <span className={`badge ${st.cls}`} style={{ fontSize: '0.68rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                    <StatusIcon status={item.status} />
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="ct-card" style={{ padding: '14px 20px', marginTop: 16, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-900)' }}>System Health</div>
        {[
          { label: 'Connected', count: 8, cls: 'badge-success' },
          { label: 'Warning',   count: 1, cls: 'badge-warning' },
          { label: 'Offline',   count: 1, cls: 'badge-danger' },
        ].map(({ label, count, cls }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className={`badge ${cls}`} style={{ fontSize: '0.7rem' }}>{count}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-400)' }}>{label}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-300)' }}>
          Last checked: Just now
        </div>
      </div>
    </div>
  );
}

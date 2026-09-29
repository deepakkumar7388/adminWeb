import React, { useState } from 'react';
import { Database, RefreshCw, RotateCcw, Eye, Trash2, CheckCircle } from 'lucide-react';

const DOCS = [
  { name: 'PM-Kisan-Guidelines-2026.pdf',     chunks: 1300, embeddings: 1300, status: 'Synced' },
  { name: 'Ayushman-Bharat-Circular.pdf',     chunks: 980,  embeddings: 980,  status: 'Synced' },
  { name: 'NEP-Education-Scheme.pdf',         chunks: 1640, embeddings: 1640, status: 'Synced' },
  { name: 'Housing-Scheme-Rules.pdf',         chunks: 1100, embeddings: 1100, status: 'Processing' },
  { name: 'AI-India-Manual.pdf',              chunks: 800,  embeddings: 800,  status: 'Synced' },
  { name: 'Skill-India-Revised.pdf',          chunks: 1180, embeddings: 0,    status: 'Failed' },
];

export default function RAGVectorStore() {
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const totalChunks = DOCS.reduce((s,d) => s + d.chunks, 0);
  const totalEmbed  = DOCS.reduce((s,d) => s + d.embeddings, 0);

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20, maxWidth: 520 }}>
        Manage knowledge base, embeddings and semantic vector search infrastructure.
      </p>

      {/* Metrics */}
      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(5,1fr)', marginBottom: 20 }}>
        {[
          { label: 'Documents',  val: DOCS.length,           sub: 'Ingested', icon: '📄' },
          { label: 'Chunks',     val: `${(totalChunks/1000).toFixed(1)}K`, sub: 'Text Segments', icon: '🔢' },
          { label: 'Embeddings', val: `${(totalEmbed/1000).toFixed(1)}K`, sub: 'Vectors',       icon: '⚡' },
          { label: 'Vector Store',val: 'FAISS',               sub: 'Index Type',    icon: '🗄️' },
          { label: 'Model',      val: 'LLaMA',                sub: 'Groq 3.3-70B',  icon: '🤖' },
        ].map(({ label, val, sub }) => (
          <div key={label} className="metric-card" style={{ flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <div className="metric-label">{label}</div>
            <div className="metric-value" style={{ fontSize: '1.4rem' }}>{val}</div>
            <div className="metric-sub">{sub}</div>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={handleSync} disabled={syncing}>
          {syncing ? <><div className="spinner" style={{ width:14,height:14,borderWidth:2,borderTopColor:'#fff',borderColor:'rgba(255,255,255,0.3)' }} />Syncing...</> : <><RefreshCw size={14} />Sync Vector Store</>}
        </button>
        <button className="btn btn-secondary">
          <RotateCcw size={14} /> Rebuild Index
        </button>
        <button className="btn btn-secondary">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="ct-table-wrap">
        <table className="ct-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Document Name</th>
              <th style={{ textAlign: 'right' }}>Chunks</th>
              <th style={{ textAlign: 'right' }}>Embeddings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DOCS.map((d, i) => (
              <tr key={d.name}>
                <td style={{ color: 'var(--text-300)', fontSize: '0.78rem' }}>{i+1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Database size={13} color="var(--primary)" />
                    <span style={{ fontWeight: 500, fontSize: '0.845rem' }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-500)' }}>
                  {d.chunks.toLocaleString()}
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-500)' }}>
                  {d.embeddings.toLocaleString()}
                </td>
                <td>
                  <span className={`badge ${d.status==='Synced'?'badge-success':d.status==='Processing'?'badge-info':'badge-danger'}`}>
                    {d.status}
                  </span>
                </td>
                <td>
                  <button className="tbl-action-btn" title="View"><Eye size={13} /></button>
                  <button className="tbl-action-btn danger" title="Delete"><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-row">
          <span className="pagination-info">Showing {DOCS.length} of {DOCS.length} documents</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--success)' }}>
            <CheckCircle size={13} /> Vector store synchronized
          </div>
        </div>
      </div>
    </div>
  );
}

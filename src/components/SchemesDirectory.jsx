import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit3, Trash2, RefreshCw } from 'lucide-react';
import { api } from '../api';

const DOMAIN_MAP = {
  farming:    { label: 'Agriculture',     color: 'badge-success' },
  education:  { label: 'Education',       color: 'badge-info' },
  healthcare: { label: 'Healthcare',      color: 'badge-blue' },
  finance:    { label: 'Finance',         color: 'badge-warning' },
  housing:    { label: 'Housing',         color: 'badge-purple' },
  women:      { label: 'Women & Child',   color: 'badge-blue' },
  employment: { label: 'Employment',      color: 'badge-info' },
  general:    { label: 'General',         color: 'badge-purple' },
};

const MINISTRIES = [
  'All Ministries',
  'Ministry of Agriculture and Farmers Welfare',
  'Ministry of Health and Family Welfare',
  'Ministry of Rural Development',
  'Ministry of Finance',
  'Ministry of Education',
  'Ministry of Skill Development and Entrepreneurship',
  'Ministry of Women and Child Development',
];

const PAGE_SIZE = 6;

export default function SchemesDirectory({ onEditScheme }) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ministry, setMinistry] = useState('all');
  const [domain, setDomain] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const data = await api.getSchemes();
      setSchemes(data);
    } catch {
      // Handled in api fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSchemes(); }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteScheme(id);
      setSchemes(s => s.filter(x => x.id !== id));
      setDeleteId(null);
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  const filtered = schemes.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || (s.titleEn || '').toLowerCase().includes(q) ||
      (s.ministryEn || '').toLowerCase().includes(q) || (s.id || '').toLowerCase().includes(q);
    const matchMinistry = ministry === 'all' || (s.ministryEn || '').includes(ministry);
    const matchDomain = domain === 'all' || s.category === domain;
    return matchSearch && matchMinistry && matchDomain;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => { setSearch(''); setMinistry('all'); setDomain('all'); setStatus('all'); setPage(1); };

  const versionFor = (id) => {
    const map = { 'SCHEME-PMKISAN-01': 'v2.1', 'SCHEME-PMJAY-02': 'v1.4', 'SCHEME-PMAY-03': 'v2.0', 'SCHEME-MUDRA-04': 'v1.6', 'SCHEME-PMKVY-05': 'v2.2', 'SCHEME-BETI-06': 'v1.5' };
    return map[id] || 'v1.0';
  };

  const publishedFor = (id) => {
    const map = { 'SCHEME-PMKISAN-01': '12 Jun 2026', 'SCHEME-PMJAY-02': '04 Mar 2025', 'SCHEME-PMAY-03': '19 Feb 2026', 'SCHEME-MUDRA-04': '10 Jan 2026', 'SCHEME-PMKVY-05': '22 Dec 2024', 'SCHEME-BETI-06': '15 Nov 2024' };
    return map[id] || '01 Jan 2025';
  };

  return (
    <div>
      {/* Page header action row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', maxWidth: 480 }}>
          Browse, search and manage all ingested government schemes and circulars.
        </p>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Add New Scheme
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar-wrap" style={{ flex: '1 1 200px', minWidth: 180, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-300)', pointerEvents: 'none' }} />
          <input
            className="form-control"
            placeholder="Search schemes..."
            style={{ paddingLeft: 32, fontSize: '0.83rem' }}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select className="form-control" style={{ flex: '0 0 160px', fontSize: '0.83rem' }}
          value={ministry} onChange={e => { setMinistry(e.target.value); setPage(1); }}>
          <option value="all">All Ministries</option>
          {MINISTRIES.slice(1).map(m => <option key={m} value={m}>{m.replace('Ministry of ', 'Min. of ')}</option>)}
        </select>
        <select className="form-control" style={{ flex: '0 0 140px', fontSize: '0.83rem' }}
          value={domain} onChange={e => { setDomain(e.target.value); setPage(1); }}>
          <option value="all">All Domains</option>
          {Object.entries(DOMAIN_MAP).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select className="form-control" style={{ flex: '0 0 120px', fontSize: '0.83rem' }}
          value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-secondary btn-sm" onClick={reset}>
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      {/* Table */}
      <div className="ct-table-wrap">
        {loading ? (
          <div className="loading-state"><div className="spinner" /><span>Loading schemes...</span></div>
        ) : paged.length === 0 ? (
          <div className="empty-state">
            <h3>No schemes found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <table className="ct-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Scheme Name</th>
                <th>Ministry / Department</th>
                <th>Domain</th>
                <th>Version</th>
                <th>Published On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((s, i) => {
                const dm = DOMAIN_MAP[s.category] || { label: 'General', color: 'badge-purple' };
                return (
                  <tr key={s.id}>
                    <td style={{ color: 'var(--text-300)', fontSize: '0.78rem' }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-900)', fontSize: '0.845rem', maxWidth: 220 }}>
                        {s.titleEn || s.titleHi}
                      </div>
                      {s.titleHi && <div style={{ fontSize: '0.72rem', color: 'var(--text-400)' }}>{s.id}</div>}
                    </td>
                    <td style={{ color: 'var(--text-500)', fontSize: '0.8rem', maxWidth: 180 }}>
                      {(s.ministryEn || '').replace('Ministry of ', 'Min. of ')}
                    </td>
                    <td><span className={`badge ${dm.color}`} style={{ fontSize: '0.7rem' }}>{dm.label}</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-500)' }}>{versionFor(s.id)}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-400)' }}>{publishedFor(s.id)}</td>
                    <td><span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Active</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 3 }}>
                        <button className="tbl-action-btn" title="View"><Eye size={13} /></button>
                        <button className="tbl-action-btn" title="Edit" onClick={() => onEditScheme && onEditScheme(s)}><Edit3 size={13} /></button>
                        {deleteId === s.id ? (
                          <>
                            <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }} onClick={() => handleDelete(s.id)}>Confirm</button>
                            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }} onClick={() => setDeleteId(null)}>Cancel</button>
                          </>
                        ) : (
                          <button className="tbl-action-btn danger" title="Delete" onClick={() => setDeleteId(s.id)}><Trash2 size={13} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="pagination-row">
            <span className="pagination-info">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} schemes
            </span>
            <div className="pagination-btns">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} className={`page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

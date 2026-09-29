import React, { useState } from 'react';
import { Search, Eye, Edit3, UserX, UserCheck, RefreshCw } from 'lucide-react';

const CITIZENS = [
  { id: 1, name: 'Amit Kumar',    mobile: '98531-24016', state: 'Uttar Pradesh', date: '29 Sep 2026', status: 'Active' },
  { id: 2, name: 'Priya Sharma',  mobile: '76201-89334', state: 'Maharashtra',   date: '28 Sep 2026', status: 'Active' },
  { id: 3, name: 'Rohan Singh',   mobile: '88077-15503', state: 'Bihar',         date: '28 Sep 2026', status: 'Inactive' },
  { id: 4, name: 'Sunita Devi',   mobile: '99140-78822', state: 'Rajasthan',     date: '27 Sep 2026', status: 'Active' },
  { id: 5, name: 'Suresh Yadav',  mobile: '88090-12234', state: 'Rajasthan',     date: '22 Sep 2026', status: 'Active' },
  { id: 6, name: 'Kavita Nair',   mobile: '97554-36621', state: 'Kerala',        date: '21 Sep 2026', status: 'Pending' },
  { id: 7, name: 'Deepak Patel',  mobile: '90012-55344', state: 'Gujarat',       date: '20 Sep 2026', status: 'Active' },
  { id: 8, name: 'Anita Joshi',   mobile: '91234-67890', state: 'Maharashtra',   date: '18 Sep 2026', status: 'Inactive' },
];

const STATES = ['All States','Uttar Pradesh','Maharashtra','Bihar','Rajasthan','Kerala','Gujarat'];
const STATUS_LIST = ['All Status','Active','Inactive','Pending'];
const PAGE_SIZE = 6;

export default function CitizenManagement() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = CITIZENS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.mobile.includes(q);
    const matchState  = state === 'all'  || c.state === state;
    const matchStatus = status === 'all' || c.status === status;
    return matchSearch && matchState && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusBadge = (s) => {
    if (s === 'Active')   return 'badge-success';
    if (s === 'Inactive') return 'badge-danger';
    return 'badge-warning';
  };

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20, maxWidth: 520 }}>
        View and manage registered citizens and their scheme engagement profile.
      </p>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-300)', pointerEvents: 'none' }} />
          <input className="form-control" placeholder="Search name or mobile..." style={{ paddingLeft: 32, fontSize: '0.83rem' }}
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-control" style={{ flex: '0 0 150px', fontSize: '0.83rem' }}
          value={state} onChange={e => { setState(e.target.value); setPage(1); }}>
          {STATES.map(s => <option key={s} value={s === 'All States' ? 'all' : s}>{s}</option>)}
        </select>
        <select className="form-control" style={{ flex: '0 0 130px', fontSize: '0.83rem' }}
          value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          {STATUS_LIST.map(s => <option key={s} value={s === 'All Status' ? 'all' : s}>{s}</option>)}
        </select>
        <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setState('all'); setStatus('all'); setPage(1); }}>
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      {/* Stats summary */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Total', val: CITIZENS.length, color: 'var(--text-900)' },
          { label: 'Active', val: CITIZENS.filter(c => c.status === 'Active').length, color: 'var(--success)' },
          { label: 'Inactive', val: CITIZENS.filter(c => c.status === 'Inactive').length, color: 'var(--danger)' },
          { label: 'Pending', val: CITIZENS.filter(c => c.status === 'Pending').length, color: 'var(--warning)' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            background: '#fff', border: '1px solid var(--card-border)', borderRadius: 8,
            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-xs)',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-400)', fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color }}>{val}</span>
          </div>
        ))}
      </div>

      <div className="ct-table-wrap">
        <table className="ct-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>State</th>
              <th>Registered On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: 'var(--text-300)', fontSize: '0.78rem' }}>{(page-1)*PAGE_SIZE+i+1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: 'var(--primary-light)', color: 'var(--primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                    }}>
                      {c.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <span style={{ fontWeight: 500, color: 'var(--text-900)' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-500)', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  {/* Mask middle digits */}
                  {c.mobile.replace(/(\d{5})-(\d{2})(\d{3})/, '$1-**$3')}
                </td>
                <td style={{ color: 'var(--text-500)', fontSize: '0.82rem' }}>{c.state}</td>
                <td style={{ color: 'var(--text-400)', fontSize: '0.8rem' }}>{c.date}</td>
                <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                <td>
                  <button className="tbl-action-btn" title="View"><Eye size={13} /></button>
                  <button className="tbl-action-btn" title="Edit"><Edit3 size={13} /></button>
                  <button className={`tbl-action-btn ${c.status === 'Active' ? 'danger' : ''}`}
                    title={c.status === 'Active' ? 'Disable' : 'Enable'}>
                    {c.status === 'Active' ? <UserX size={13} /> : <UserCheck size={13} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="pagination-row">
            <span className="pagination-info">
              Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length} citizens
            </span>
            <div className="pagination-btns">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}>‹</button>
              {Array.from({length: totalPages},(_,i)=>i+1).map(n => (
                <button key={n} className={`page-btn ${page===n?'active':''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Eye, Search, RefreshCw } from 'lucide-react';

const LOGS = [
  { ts: '29 Sep 2026, 10:14:22', user: 'admin@curaterra.gov.in', module: 'Upload PDF',    action: 'Scheme Extracted',   status: 'Success', ip: '192.168.1.101', detail: 'PM-Kisan-Guidelines-2026.pdf extracted successfully' },
  { ts: '29 Sep 2026, 09:58:11', user: 'admin@curaterra.gov.in', module: 'Auth',           action: 'Login',              status: 'Success', ip: '192.168.1.101', detail: 'Admin login successful' },
  { ts: '29 Sep 2026, 09:22:33', user: 'admin@curaterra.gov.in', module: 'RAG Store',      action: 'Vector Sync',        status: 'Success', ip: '192.168.1.101', detail: 'FAISS index rebuilt with 6 documents' },
  { ts: '28 Sep 2026, 17:43:09', user: 'admin@curaterra.gov.in', module: 'Schemes',        action: 'Scheme Deleted',     status: 'Warning', ip: '192.168.1.102', detail: 'SCHEME-OLD-07 removed from repository' },
  { ts: '28 Sep 2026, 16:31:44', user: 'admin@curaterra.gov.in', module: 'Upload PDF',    action: 'Extraction Failed',  status: 'Failed',  ip: '192.168.1.101', detail: 'Skill-India-Revised.pdf - corrupted file' },
  { ts: '28 Sep 2026, 15:12:08', user: 'admin@curaterra.gov.in', module: 'Citizens',      action: 'Citizen Updated',    status: 'Success', ip: '192.168.1.101', detail: 'Citizen ID #3 profile updated' },
  { ts: '28 Sep 2026, 12:00:01', user: 'system',                 module: 'System',        action: 'Backup Completed',   status: 'Success', ip: 'localhost',     detail: 'Daily backup completed at 12:00 UTC' },
  { ts: '27 Sep 2026, 11:44:19', user: 'admin@curaterra.gov.in', module: 'Settings',      action: 'Config Updated',     status: 'Success', ip: '192.168.1.101', detail: 'API timeout setting changed to 2500ms' },
];

const PAGE_SIZE = 7;

export default function SystemLogs() {
  const [search, setSearch] = useState('');
  const [module, setModule] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const modules = ['all','Upload PDF','Auth','RAG Store','Schemes','Citizens','System','Settings'];
  const statuses = ['all','Success','Warning','Failed'];

  const filtered = LOGS.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !q || l.action.toLowerCase().includes(q) || l.user.toLowerCase().includes(q) || l.module.toLowerCase().includes(q);
    const matchM = module==='all' || l.module===module;
    const matchS = status==='all' || l.status===status;
    return matchQ && matchM && matchS;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20, maxWidth: 520 }}>
        Audit trail and system event logs for administrative governance and compliance.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top:'50%', transform:'translateY(-50%)', color:'var(--text-300)', pointerEvents:'none' }} />
          <input className="form-control" placeholder="Search logs..." style={{ paddingLeft: 32, fontSize: '0.83rem' }}
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-control" style={{ flex: '0 0 140px', fontSize: '0.83rem' }}
          value={module} onChange={e => { setModule(e.target.value); setPage(1); }}>
          {modules.map(m => <option key={m} value={m}>{m==='all'?'All Modules':m}</option>)}
        </select>
        <select className="form-control" style={{ flex: '0 0 130px', fontSize: '0.83rem' }}
          value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          {statuses.map(s => <option key={s} value={s}>{s==='all'?'All Status':s}</option>)}
        </select>
        <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setModule('all'); setStatus('all'); setPage(1); }}>
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      <div className="ct-table-wrap">
        <table className="ct-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Module</th>
              <th>Action</th>
              <th>Status</th>
              <th>IP / Source</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((l, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.77rem', color: 'var(--text-400)', whiteSpace: 'nowrap' }}>{l.ts}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-500)' }}>{l.user}</td>
                <td>
                  <span style={{
                    background: 'var(--bg-main)', border: '1px solid var(--card-border)',
                    borderRadius: 4, padding: '1px 7px', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-500)',
                  }}>{l.module}</span>
                </td>
                <td style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-700)' }}>{l.action}</td>
                <td>
                  <span className={`badge ${l.status==='Success'?'badge-success':l.status==='Warning'?'badge-warning':'badge-danger'}`}>
                    {l.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.77rem', color: 'var(--text-400)' }}>{l.ip}</td>
                <td>
                  <button className="tbl-action-btn" title={l.detail}><Eye size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > PAGE_SIZE && (
          <div className="pagination-row">
            <span className="pagination-info">Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length} entries</span>
            <div className="pagination-btns">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}>‹</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                <button key={n} className={`page-btn ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

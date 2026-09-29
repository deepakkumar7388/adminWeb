import React, { useState } from 'react';
import { Save, X, Upload } from 'lucide-react';

const CATEGORIES = [
  { id: 'farming',    label: 'Agriculture & Farming' },
  { id: 'education',  label: 'Education & Scholarship' },
  { id: 'healthcare', label: 'Healthcare & Medical' },
  { id: 'finance',    label: 'Financial & Subsidies' },
  { id: 'housing',    label: 'Housing & Shelter' },
  { id: 'women',      label: 'Women & Child Welfare' },
  { id: 'employment', label: 'Skills & Employment' },
  { id: 'general',    label: 'General Welfare' },
];

const TABS = ['Basic Details','Eligibility Criteria','Benefits','Documents','Timeline','Target Audience'];

export default function SchemeManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [schemeType, setSchemeType] = useState('new');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'PM-Kisan Samman Nidhi',
    ministry: 'Ministry of Agriculture',
    domain: 'farming',
    description: 'Income support scheme for small and marginal farmers to provide financial assistance.',
    eligibility: 'Small and marginal farmer families with cultivable landholding up to 2 hectares.',
    benefits: '₹6,000 per year in 3 equal installments of ₹2,000 each directly to bank accounts.',
    targetAudience: 'Farmers with valid Aadhaar, land records, and bank account linkage.',
    timeline: 'Launched February 2019 | Current cycle: 2024-2027',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20 }}>
        Create, edit and manage scheme metadata, eligibility, benefits and documents.
      </p>

      <div className="ct-card" style={{ overflow: 'hidden' }}>
        {/* Tabs */}
        <div className="ct-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`ct-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>

        <div style={{ padding: 28 }}>
          {/* Tab 0: Basic Details */}
          {activeTab === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group">
                <label className="form-label">Scheme Name <span className="required">*</span></label>
                <input className="form-control" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Enter scheme name" />
              </div>
              <div className="form-group">
                <label className="form-label">Ministry / Department <span className="required">*</span></label>
                <input className="form-control" value={form.ministry} onChange={e => set('ministry', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Domain / Category</label>
                <select className="form-control" value={form.domain} onChange={e => set('domain', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Scheme Type</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {[{v:'new',l:'New Scheme'},{v:'revised',l:'Revised / Amendment'}].map(({v,l}) => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.845rem', color: 'var(--text-700)' }}>
                      <input type="radio" name="schemeType" value={v} checked={schemeType === v} onChange={() => setSchemeType(v)} style={{ accentColor: 'var(--primary)' }} />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={4} value={form.description} onChange={e => set('description', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Scheme Logo</label>
                <div style={{
                  border: '2px dashed var(--card-border)', borderRadius: 'var(--radius-md)',
                  padding: '20px', textAlign: 'center', cursor: 'pointer', background: '#fafbfc',
                }}>
                  <Upload size={20} color="var(--text-300)" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-400)' }}>
                    PNG, JPG, SVG (Max 2MB)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Eligibility */}
          {activeTab === 1 && (
            <div className="form-group">
              <label className="form-label">Eligibility Criteria</label>
              <textarea className="form-control" rows={8} value={form.eligibility} onChange={e => set('eligibility', e.target.value)} />
            </div>
          )}

          {/* Tab 2: Benefits */}
          {activeTab === 2 && (
            <div className="form-group">
              <label className="form-label">Benefits Description</label>
              <textarea className="form-control" rows={8} value={form.benefits} onChange={e => set('benefits', e.target.value)} />
            </div>
          )}

          {/* Tab 3: Documents */}
          {activeTab === 3 && (
            <div>
              <label className="form-label" style={{ marginBottom: 12 }}>Required Documents</label>
              {['Aadhaar Card', 'Land Ownership Record (Khatauni)', 'Bank Passbook', 'Mobile linked to Aadhaar'].map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <input className="form-control" defaultValue={doc} style={{ flex: 1 }} />
                  <button className="btn btn-danger btn-sm"><X size={13} /></button>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 4 }}>+ Add Document</button>
            </div>
          )}

          {/* Tab 4: Timeline */}
          {activeTab === 4 && (
            <div className="form-group">
              <label className="form-label">Scheme Timeline</label>
              <textarea className="form-control" rows={6} value={form.timeline} onChange={e => set('timeline', e.target.value)} />
            </div>
          )}

          {/* Tab 5: Target Audience */}
          {activeTab === 5 && (
            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <textarea className="form-control" rows={8} value={form.targetAudience} onChange={e => set('targetAudience', e.target.value)} />
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--card-border)' }}>
            {saved && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600 }}>
                ✓ Saved successfully
              </span>
            )}
            <button className="btn btn-secondary" onClick={() => setActiveTab(0)}><X size={14} /> Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}><Save size={14} /> Save Scheme</button>
          </div>
        </div>
      </div>
    </div>
  );
}

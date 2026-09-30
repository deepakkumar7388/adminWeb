import React, { useState, useEffect, useRef } from 'react';
import {
  Upload, FileText, CheckCircle2, AlertTriangle, ArrowRight,
  RefreshCw, Check, Trash2, Eye, Edit3,
  CheckCircle
} from 'lucide-react';
import { api } from '../api';

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


export default function UploadSchemeSection({ onSchemeUpdated, preselectedScheme = null }) {
  // Step management (1=upload, 2=extract, 3=review, 4=publish)
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(preselectedScheme ? 'edit' : 'new');
  const [existingSchemes, setExistingSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState(preselectedScheme?.id || '');

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  const fileInputRef = useRef();

  const recentUploads = existingSchemes.slice(0, 5).map((s) => ({
    id: s.id,
    name: s.titleEn || 'Scheme Document',
    ministry: s.ministryEn || 'Government of India',
    officialUrl: s.officialUrl || null,
    date: s.updatedAt ? new Date(s.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—',
    status: 'Completed',
    fullScheme: s,
  }));

  useEffect(() => {
    api.getSchemes().then(d => {
      setExistingSchemes(d);
      if (d.length > 0 && !selectedSchemeId && !preselectedScheme) {
        setSelectedSchemeId(d[0].id);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (preselectedScheme) {
      setMode('edit');
      setSelectedSchemeId(preselectedScheme.id);
      setExtractedData({ ...preselectedScheme });
      setStep(3);
    }
  }, [preselectedScheme]);

  const handleFileSelect = (file) => {
    if (!file || file.type !== 'application/pdf') {
      setExtractError('Please select a valid PDF file.');
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setExtractError('File size must not exceed 30 MB.');
      return;
    }
    setSelectedFile(file);
    setExtractError(null);
    setStep(1);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleExtract = async () => {
    if (!selectedFile) return;
    setIsExtracting(true);
    setExtractError(null);
    setStep(2);
    try {
      const schemeIdForEdit = mode === 'edit' ? selectedSchemeId : null;
      const result = await api.extractPdf(selectedFile, mode, schemeIdForEdit);
      if (result.success) {
        setExtractedData(result.extracted);
        setStep(3);
      } else {
        throw new Error(result.message || 'Extraction failed');
      }
    } catch (err) {
      setExtractError(err.message || 'Failed to extract PDF content. Please try again.');
      setStep(1);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSave = async () => {
    if (!extractedData) return;
    setIsSaving(true);
    setSaveMsg(null);
    try {
      const result = await api.saveScheme(mode, extractedData);
      if (result.success) {
        setSaveMsg({ type: 'success', text: result.message });
        setStep(4);
        if (onSchemeUpdated) onSchemeUpdated();
      } else {
        throw new Error(result.message || 'Failed to save scheme');
      }
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedFile(null);
    setExtractedData(null);
    setExtractError(null);
    setSaveMsg(null);
    setIsExtracting(false);
  };

  const updateField = (key, val) => {
    setExtractedData(prev => ({ ...prev, [key]: val }));
  };

  const handleViewScheme = (url) => {
    if (url && url !== 'https://myscheme.gov.in') {
      window.open(url, '_blank');
    } else {
      window.open('https://myscheme.gov.in', '_blank');
    }
  };

  const handleEditScheme = (scheme) => {
    setMode('edit');
    setSelectedSchemeId(scheme.id);
    setExtractedData({ ...scheme });
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteScheme = async (schemeId, schemeName) => {
    if (!window.confirm(`Are you sure you want to delete "${schemeName}"? This cannot be undone.`)) return;
    try {
      await api.deleteScheme(schemeId);
      setExistingSchemes(prev => prev.filter(s => s.id !== schemeId));
    } catch (err) {
      alert('Failed to delete scheme: ' + (err.message || 'Unknown error'));
    }
  };

  const stepConfig = [
    { num: 1, label: 'Upload PDF' },
    { num: 2, label: 'AI Extraction' },
    { num: 3, label: 'Review & Edit' },
    { num: 4, label: 'Store & Publish' },
  ];

  return (
    <div>
      {/* Step Indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', marginBottom: 24,
        background: '#fff', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--card-border)', padding: '16px 24px',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {stepConfig.map((s, i) => (
          <React.Fragment key={s.num}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700, flexShrink: 0,
                background: step > s.num ? 'var(--success)' : step === s.num ? 'var(--primary)' : 'var(--card-border)',
                color: step >= s.num ? '#fff' : 'var(--text-400)',
              }}>
                {step > s.num ? <Check size={13} /> : s.num}
              </div>
              <span style={{
                fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap',
                color: step === s.num ? 'var(--primary)' : step > s.num ? 'var(--success)' : 'var(--text-400)',
              }}>
                {s.label}
              </span>
            </div>
            {i < stepConfig.length - 1 && (
              <div style={{
                flex: 1, height: 1, minWidth: 20, margin: '0 10px',
                background: step > s.num ? 'var(--success)' : 'var(--card-border)',
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* ── LEFT: Main upload area ── */}
        <div>
          {/* Mode switch */}
          <div className="ct-card" style={{ padding: '18px 24px', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-500)', marginRight: 4 }}>
                Purpose:
              </span>
              {[{ v: 'new', l: 'New Scheme Creation' }, { v: 'edit', l: 'Revised / Amendment' }].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => { setMode(v); handleReset(); }}
                  className={`btn btn-sm ${mode === v ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {l}
                </button>
              ))}
              {mode === 'edit' && existingSchemes.length > 0 && (
                <div style={{ position: 'relative', marginLeft: 8 }}>
                  <select
                    className="form-control"
                    style={{ paddingRight: 32, fontSize: '0.82rem', height: 34 }}
                    value={selectedSchemeId}
                    onChange={e => setSelectedSchemeId(e.target.value)}
                  >
                    {existingSchemes.map(s => (
                      <option key={s.id} value={s.id}>{s.titleEn}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Step 1: Upload Zone */}
          {(step === 1 || step === 2) && (
            <div className="ct-card" style={{ padding: 24, marginBottom: 16 }}>
              <div
                className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-dropzone-icon">
                  <Upload size={24} />
                </div>
                <h4>Drag &amp; drop PDF here</h4>
                <p>or click to browse files<br />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-300)' }}>
                    Supports PDF (Max 30MB) • Gazettes, Ministry Circulars, Scheme Documents
                  </span>
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  Browse Files
                </button>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={e => handleFileSelect(e.target.files[0])}
                />
              </div>

              {selectedFile && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginTop: 16,
                  padding: '12px 14px', background: 'var(--primary-light)',
                  borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)',
                }}>
                  <FileText size={18} color="var(--primary)" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--text-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {selectedFile.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-400)' }}>
                      {(selectedFile.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button className="tbl-action-btn danger" onClick={() => setSelectedFile(null)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              )}

              {extractError && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginTop: 14,
                  padding: '10px 14px', background: 'var(--danger-bg)',
                  border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem', color: 'var(--danger)',
                }}>
                  <AlertTriangle size={15} /> {extractError}
                </div>
              )}

              {/* Extract CTA */}
              {selectedFile && !isExtracting && step !== 4 && (
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                  <button className="btn btn-primary" onClick={handleExtract}>
                    Start AI Extraction
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Loading state */}
              {isExtracting && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, marginTop: 16,
                  padding: '14px', background: 'var(--secondary-light)',
                  borderRadius: 'var(--radius-md)', border: '1px solid rgba(124,58,237,0.2)',
                }}>
                  <div className="spinner" style={{ borderTopColor: 'var(--secondary)', borderColor: 'rgba(124,58,237,0.2)' }} />
                  <div>
                    <div style={{ fontSize: '0.845rem', fontWeight: 600, color: 'var(--secondary)' }}>
                      AI Extraction in progress...
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-400)' }}>
                      Groq LLaMA-3.3-70B is analyzing your document
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Edit */}
          {step === 3 && extractedData && (
            <div className="ct-card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
                padding: '10px 14px', background: 'rgba(5,150,105,0.06)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--success-border)',
              }}>
                <CheckCircle2 size={16} color="var(--success)" />
                <span style={{ fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600 }}>
                  AI extraction complete. Review and edit the extracted data below.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Scheme Name (English) <span className="required">*</span></label>
                  <input className="form-control" value={extractedData.titleEn || ''} onChange={e => updateField('titleEn', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Scheme Name (Hindi)</label>
                  <input className="form-control" value={extractedData.titleHi || ''} onChange={e => updateField('titleHi', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ministry / Department (English)</label>
                  <input className="form-control" value={extractedData.ministryEn || ''} onChange={e => updateField('ministryEn', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Domain / Category</label>
                  <select className="form-control" value={extractedData.category || 'general'} onChange={e => updateField('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label className="form-label">Description (English)</label>
                  <textarea className="form-control" value={extractedData.descriptionEn || ''} onChange={e => updateField('descriptionEn', e.target.value)} rows={3} />
                </div>
                <div className="form-group">
                  <label className="form-label">Benefit (English)</label>
                  <textarea className="form-control" value={extractedData.benefitEn || ''} onChange={e => updateField('benefitEn', e.target.value)} rows={2} />
                </div>
                <div className="form-group">
                  <label className="form-label">Benefit Amount</label>
                  <input className="form-control" value={extractedData.benefitAmount || ''} onChange={e => updateField('benefitAmount', e.target.value)} />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label className="form-label">Eligibility Criteria (English)</label>
                  <textarea className="form-control" value={extractedData.whyEligibleEn || ''} onChange={e => updateField('whyEligibleEn', e.target.value)} rows={3} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={handleReset}>
                  <RefreshCw size={14} /> Start Over
                </button>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2, borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> Saving...</> : <>
                    <Check size={14} /> Save &amp; Publish to RAG
                  </>}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && saveMsg && (
            <div className="ct-card" style={{ padding: 40, textAlign: 'center', marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, background: 'var(--success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} color="var(--success)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 8 }}>
                Scheme Published Successfully
              </h3>
              <p style={{ fontSize: '0.845rem', color: 'var(--text-400)', marginBottom: 24 }}>
                {saveMsg.text}
              </p>
              <button className="btn btn-primary" onClick={handleReset}>
                Upload Another Circular
              </button>
            </div>
          )}

          {/* Recent Uploads Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-900)' }}>
                Recent Uploads
              </h3>
              <div className="search-bar-wrap" style={{ width: 240 }}>
                <input className="form-control" placeholder="Search uploads..." style={{ fontSize: '0.8rem' }} />
              </div>
            </div>

            <div className="ct-table-wrap">
              <table className="ct-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Ministry / Department</th>
                    <th>Uploaded On</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.length > 0 ? recentUploads.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-300)', fontSize: '0.78rem' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <FileText size={14} color="var(--primary)" />
                          <span style={{ fontWeight: 500 }}>{row.name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-500)' }}>{row.ministry}</td>
                      <td style={{ color: 'var(--text-400)', fontSize: '0.8rem' }}>{row.date}</td>
                      <td>
                        <span className={`badge ${row.status === 'Completed' ? 'badge-success' : row.status === 'Processing' ? 'badge-info' : 'badge-danger'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="tbl-action-btn"
                          title="View Official Page"
                          onClick={() => handleViewScheme(row.officialUrl)}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          className="tbl-action-btn"
                          title="Edit Scheme"
                          onClick={() => handleEditScheme(row.fullScheme)}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          type="button"
                          className="tbl-action-btn danger"
                          title="Delete Scheme"
                          onClick={() => handleDeleteScheme(row.id, row.name)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-400)' }}>
                        No recent uploads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Guidelines Panel ── */}
        <div>
          <div className="ct-card" style={{ padding: '20px 20px', marginBottom: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 14 }}>
              Upload Guidelines
            </h4>
            {[
              'Official government PDFs only',
              'Clear and readable documents',
              'Supports English, Hindi and bilingual documents',
              'Automatically extracts scheme metadata',
              'AI-powered data structuring and vector storage',
            ].map((g, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10,
                fontSize: '0.8rem', color: 'var(--text-500)', lineHeight: 1.5,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--success-bg)', border: '1px solid var(--success-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <Check size={10} color="var(--success)" />
                </div>
                {g}
              </div>
            ))}
          </div>

          <div className="ct-card" style={{ padding: '20px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: 10 }}>
              AI Pipeline Status
            </h4>
            {[
              { label: 'Groq LLaMA-3.3-70B', status: 'Active' },
              { label: 'FAISS Vector Store', status: 'Ready' },
              { label: 'PDF Parser (PyPDF)', status: 'Active' },
              { label: 'Hindi NLP Model',    status: 'Loaded' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-500)' }}>{item.label}</span>
                <span className="badge badge-success" style={{ fontSize: '0.66rem' }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

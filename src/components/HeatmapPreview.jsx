import React, { useState, useMemo } from 'react';
import {
  MapPin, Users, BarChart3, Filter, TrendingUp,
  ExternalLink, ZoomIn, ZoomOut, RotateCcw, Search,
  CheckCircle2, Award, Building2, ShieldCheck
} from 'lucide-react';
import indiaMapData from '../data/indiaStates.json';

const SCHEMES_LIST = [
  'All Schemes',
  'PM-Kisan Samman Nidhi',
  'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
  'PM Awas Yojana (Gramin & Urban)',
  'Pradhan Mantri MUDRA Yojana',
  'Skill India Mission',
  'Beti Bachao Beti Padhao'
];

const DOMAINS_LIST = [
  'All Domains',
  'Agriculture & Farming',
  'Healthcare & Medical',
  'Housing & Shelter',
  'Finance & Subsidies',
  'Skills & Employment',
  'Women & Child Welfare'
];

const METRICS_LIST = [
  'Citizen Uptake (%)',
  'Fund Allocation (₹ Cr)',
  'Scheme Penetration',
  'District Coverage'
];

export default function HeatmapPreview() {
  const [selectedScheme, setSelectedScheme] = useState('All Schemes');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedMetric, setSelectedMetric] = useState('Citizen Uptake (%)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('uttar-pradesh');
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState('uptake'); // 'uptake' | 'beneficiaries' | 'schemes'

  const states = indiaMapData.states;

  // Filtered or searched states
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return states;
    const q = searchQuery.toLowerCase();
    return states.filter(s => s.name.toLowerCase().includes(q));
  }, [states, searchQuery]);

  const activeState = useMemo(() => {
    return states.find(s => s.id === selectedStateId) || states[0];
  }, [states, selectedStateId]);

  // Color generator based on mode and percentage
  const getStateColor = (state) => {
    const isSelected = state.id === selectedStateId;
    const isHovered = hoveredState?.id === state.id;

    if (viewMode === 'uptake') {
      if (state.pct >= 75) {
        return {
          fill: isHovered ? '#1e40af' : isSelected ? '#1d4ed8' : '#2563eb',
          stroke: isSelected ? '#ffffff' : '#1e3a8a',
          strokeWidth: isSelected ? 2.5 : 0.8,
          opacity: 0.92
        };
      } else if (state.pct >= 50) {
        return {
          fill: isHovered ? '#d97706' : isSelected ? '#f59e0b' : '#fbbf24',
          stroke: isSelected ? '#ffffff' : '#b45309',
          strokeWidth: isSelected ? 2.5 : 0.8,
          opacity: 0.9
        };
      } else {
        return {
          fill: isHovered ? '#047857' : isSelected ? '#059669' : '#10b981',
          stroke: isSelected ? '#ffffff' : '#065f46',
          strokeWidth: isSelected ? 2.5 : 0.8,
          opacity: 0.88
        };
      }
    } else if (viewMode === 'beneficiaries') {
      if (state.citizens >= 15) {
        return { fill: '#1d4ed8', stroke: '#1e3a8a', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.9 };
      } else if (state.citizens >= 5) {
        return { fill: '#0284c7', stroke: '#0369a1', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.85 };
      } else {
        return { fill: '#38bdf8', stroke: '#0284c7', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.8 };
      }
    } else {
      // Schemes count
      if (state.schemes >= 5) {
        return { fill: '#4338ca', stroke: '#312e81', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.9 };
      } else if (state.schemes >= 3) {
        return { fill: '#6366f1', stroke: '#4338ca', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.85 };
      } else {
        return { fill: '#a5b4fc', stroke: '#4f46e5', strokeWidth: isSelected ? 2.5 : 0.8, opacity: 0.8 };
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const topStates = useMemo(() => {
    return [...states].sort((a, b) => b.pct - a.pct).slice(0, 5);
  }, [states]);

  return (
    <div>
      {/* Subtitle */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-400)', marginBottom: 20, maxWidth: 720 }}>
        Geographical Information System (GIS) heat mapping visualizing state-wise administrative
        penetration, verified citizen registrations, and active welfare distribution across India.
      </p>

      {/* Top 4 Metrics Row */}
      <div className="metric-grid" style={{ marginBottom: 24 }}>
        <div className="metric-card">
          <div className="metric-icon blue"><BarChart3 size={20} /></div>
          <div className="metric-body">
            <div className="metric-label">Active Central Schemes</div>
            <div className="metric-value">6</div>
            <div className="metric-sub">Across 36 States &amp; UTs</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple"><Users size={20} /></div>
          <div className="metric-body">
            <div className="metric-label">Enrolled Beneficiaries</div>
            <div className="metric-value">148<span style={{ fontSize: '1rem', fontWeight: 500 }}>M+</span></div>
            <div className="metric-sub">Verified Aadhar &amp; JanDhan</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon blue"><MapPin size={20} /></div>
          <div className="metric-body">
            <div className="metric-label">Covered Districts</div>
            <div className="metric-value">734</div>
            <div className="metric-sub">98.4% Geographic Reach</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green"><TrendingUp size={20} /></div>
          <div className="metric-body">
            <div className="metric-label">National Saturation</div>
            <div className="metric-value">68<span style={{ fontSize: '1rem' }}>%</span></div>
            <div className="metric-sub">+12% vs Previous Quarter</div>
          </div>
        </div>
      </div>

      {/* Main Responsive Layout */}
      <div className="heatmap-layout-grid">

        {/* ── LEFT: Filters & State Search ── */}
        <div className="ct-card heatmap-controls-col" style={{ padding: 18 }}>
          <h4 style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700,
            color: 'var(--text-900)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6
          }}>
            <Filter size={14} style={{ color: 'var(--primary)' }} />
            Map Controls &amp; Filters
          </h4>

          {/* Quick Search */}
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="form-label" style={{ fontSize: '0.74rem' }}>Find State / UT</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-control"
                placeholder="e.g. Maharashtra, UP..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.78rem', paddingLeft: 28 }}
              />
              <Search size={13} style={{ position: 'absolute', left: 9, top: 10, color: 'var(--text-300)' }} />
            </div>
          </div>

          {/* Filter Scheme */}
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.74rem' }}>Welfare Scheme</label>
            <select
              className="form-control"
              style={{ fontSize: '0.78rem' }}
              value={selectedScheme}
              onChange={e => setSelectedScheme(e.target.value)}
            >
              {SCHEMES_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Filter Domain */}
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.74rem' }}>Ministry Domain</label>
            <select
              className="form-control"
              style={{ fontSize: '0.78rem' }}
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
            >
              {DOMAINS_LIST.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Heat Metric */}
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.74rem' }}>Display Layer</label>
            <select
              className="form-control"
              style={{ fontSize: '0.78rem' }}
              value={selectedMetric}
              onChange={e => setSelectedMetric(e.target.value)}
            >
              {METRICS_LIST.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Layer Mode Toggle */}
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label" style={{ fontSize: '0.74rem' }}>Choropleth Mode</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { id: 'uptake', label: 'Uptake Percentage (%)' },
                { id: 'beneficiaries', label: 'Total Beneficiaries (M)' },
                { id: 'schemes', label: 'Active Scheme Count' },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setViewMode(m.id)}
                  style={{
                    padding: '7px 10px', fontSize: '0.74rem', borderRadius: 6,
                    border: '1px solid', textAlign: 'left', cursor: 'pointer',
                    background: viewMode === m.id ? 'var(--primary-light)' : '#ffffff',
                    borderColor: viewMode === m.id ? 'var(--primary)' : 'var(--card-border)',
                    color: viewMode === m.id ? 'var(--primary)' : 'var(--text-700)',
                    fontWeight: viewMode === m.id ? 700 : 500,
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CENTER: Real Geographic Map of India ── */}
        <div className="ct-card heatmap-map-col" style={{ padding: 20, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Header Bar inside card */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-900)' }}>
                Survey of India — Administrative State Boundaries
              </h4>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-400)', marginTop: 2 }}>
                High-precision geographical vector projection of all 36 States &amp; Union Territories
              </div>
            </div>

            {/* Map Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={11} style={{ marginRight: 4 }} />
                Official Boundaries
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(z => Math.min(z + 0.2, 1.8))}
                title="Zoom In"
                style={{ padding: '5px 8px' }}
              >
                <ZoomIn size={13} />
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.8))}
                title="Zoom Out"
                style={{ padding: '5px 8px' }}
              >
                <ZoomOut size={13} />
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(1)}
                title="Reset View"
                style={{ padding: '5px 8px' }}
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* SVG Map Container */}
          <div
            onMouseMove={handleMouseMove}
            style={{
              flex: 1, minHeight: 480, height: 500, position: 'relative',
              background: 'radial-gradient(ellipse at center, #f8fafc 0%, #edf2f7 100%)',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <svg
              viewBox={indiaMapData.viewBox}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 490,
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-out',
                cursor: 'pointer'
              }}
            >
              <defs>
                <filter id="stateShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* State Polygons */}
              {filteredStates.map((st) => {
                const colors = getStateColor(st);
                const isSelected = st.id === selectedStateId;
                const isHovered = hoveredState?.id === st.id;

                return (
                  <path
                    key={st.id}
                    d={st.d}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={colors.strokeWidth}
                    opacity={colors.opacity}
                    filter={isSelected || isHovered ? 'url(#stateShadow)' : undefined}
                    onMouseEnter={() => setHoveredState(st)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => setSelectedStateId(st.id)}
                    style={{
                      transition: 'fill 0.15s ease, stroke 0.15s ease, opacity 0.15s ease',
                      outline: 'none'
                    }}
                  />
                );
              })}

              {/* Centroid Label Dots for prominent states */}
              {states.filter(s => s.pct >= 60).map(st => (
                <g key={`dot-${st.id}`} pointerEvents="none">
                  <circle cx={st.centroid[0]} cy={st.centroid[1]} r={2.5} fill="#ffffff" opacity={0.85} />
                  <text
                    x={st.centroid[0]}
                    y={st.centroid[1] - 4}
                    fontSize="7.5"
                    fontWeight="700"
                    fill="#0f172a"
                    textAnchor="middle"
                    style={{ textShadow: '0 1px 2px #fff, 0 -1px 2px #fff, 1px 0 2px #fff, -1px 0 2px #fff' }}
                  >
                    {st.name}
                  </text>
                </g>
              ))}
            </svg>

            {/* Dynamic Hover Tooltip */}
            {hoveredState && (
              <div
                style={{
                  position: 'absolute',
                  left: Math.min(tooltipPos.x + 14, 380),
                  top: Math.max(tooltipPos.y - 80, 10),
                  background: '#0d1b2e',
                  color: '#ffffff',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  pointerEvents: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  zIndex: 30,
                  minWidth: 170
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#60a5fa', marginBottom: 4 }}>
                  {hoveredState.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 2 }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>Citizen Uptake:</span>
                  <strong style={{ color: '#ffffff' }}>{hoveredState.pct}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 2 }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>Beneficiaries:</span>
                  <strong style={{ color: '#ffffff' }}>{hoveredState.citizens}M</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>Active Schemes:</span>
                  <strong style={{ color: '#ffffff' }}>{hoveredState.schemes} / 6</strong>
                </div>
              </div>
            )}
          </div>

          {/* Choropleth Legend (No Pink!) */}
          <div style={{
            display: 'flex', gap: 20, justifyContent: 'center', marginTop: 14,
            padding: '10px 16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--card-border)', flexWrap: 'wrap'
          }}>
            {[
              { color: '#1d4ed8', label: 'High Saturation (75% – 100%)', note: 'Priority Delivered' },
              { color: '#f59e0b', label: 'Medium Penetration (50% – 74%)', note: 'Expanding Coverage' },
              { color: '#10b981', label: 'Developing Uptake (< 50%)', note: 'Action Targeted' },
            ].map(({ color, label, note }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: color, display: 'inline-block' }} />
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-900)' }}>{label}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-400)' }}>{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Selected State Inspection & Top Performers ── */}
        <div className="heatmap-spotlight-col" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* State Spotlight Card */}
          <div className="ct-card" style={{ padding: 18, borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>SELECTED STATE</span>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>ACTIVE SYNC</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-900)', marginBottom: 4 }}>
              {activeState.name}
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-400)', marginBottom: 14 }}>
              {activeState.type || 'State Administration'} • State Code: IN-{activeState.id.slice(0, 2).toUpperCase()}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ padding: '10px', background: 'var(--bg-main)', borderRadius: 6, border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-400)', textTransform: 'uppercase' }}>Uptake</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{activeState.pct}%</div>
              </div>
              <div style={{ padding: '10px', background: 'var(--bg-main)', borderRadius: 6, border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-400)', textTransform: 'uppercase' }}>Citizens</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-900)' }}>{activeState.citizens}M</div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-500)', lineHeight: 1.5, marginBottom: 12 }}>
              Districts reached: <strong>100%</strong> of notified zones. Active biometric e-KYC integration synchronized with state civil supplies portal.
            </div>

            <button
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={() => alert(`Opening district-level analytics dossier for ${activeState.name}`)}
            >
              Inspect District Dossier <ExternalLink size={12} />
            </button>
          </div>

          {/* Top States Ranking */}
          <div className="ct-card" style={{ padding: 18 }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700,
              color: 'var(--text-900)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Award size={14} style={{ color: 'var(--primary)' }} />
              Top States by Scheme Uptake
            </h4>

            {topStates.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setSelectedStateId(s.id)}
                style={{
                  marginBottom: 12, cursor: 'pointer', padding: '6px 8px', borderRadius: 6,
                  background: selectedStateId === s.id ? 'var(--primary-light)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: idx === 0 ? '#1d4ed8' : idx === 1 ? '#2563eb' : '#3b82f6',
                      color: '#ffffff', fontSize: '0.68rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-800)' }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>{s.pct}%</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

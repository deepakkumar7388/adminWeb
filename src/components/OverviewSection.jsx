import React, { useState, useEffect } from 'react';
import {
  FileText, Users, Layers, Cpu,
  ArrowUpRight, FileUp
} from 'lucide-react';
import { api } from '../api';
import govHeroBg from '../assets/gov_hero_bg.jpg';
import indiaMapData from '../data/indiaStates.json';

export default function OverviewSection({ onNavigateTab }) {
  const [stats, setStats] = useState({
    total_schemes: 6,
    total_users: 148,
    categories_count: 6,
  });

  useEffect(() => {
    api.getStats().then(d => setStats(d)).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero Card ── */}
      <div className="hero-card">
        {/* Background image - right side */}
        <div
          className="hero-bg-accent"
          style={{ backgroundImage: `url(${govHeroBg})` }}
        >
          <div className="hero-bg-overlay" />
        </div>

        {/* Text overlay - top right */}
        <div style={{
          position: 'absolute', top: 18, right: 24,
          textAlign: 'right', zIndex: 2,
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1.5px', color: 'var(--text-400)', textTransform: 'uppercase' }}>
            सत्यमेव जयते
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--text-300)', letterSpacing: '0.6px', fontWeight: 600 }}>
            GOVERNMENT OF INDIA
          </div>
        </div>

        {/* Main text */}
        <div className="hero-content-wrap">
          <div className="hero-badge-row">
            <div className="section-chip blue">
              <Cpu size={11} />
              CuraTerra Intelligence Engine
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
              NIC Certified Portal
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: 'var(--text-900)',
            lineHeight: 1.2,
            marginBottom: 12,
            letterSpacing: '-0.3px',
          }}>
            Unified Scheme Administration{' '}
            <span style={{ color: 'var(--primary)' }}>&amp; Circular Ingestion</span>
          </h1>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-500)',
            lineHeight: 1.65,
            marginBottom: 24,
            maxWidth: 520,
          }}>
            Enterprise policy administration console. Ingest official gazette and ministry PDF circulars
            with AI extraction, synchronize live RAG vectorstores, and monitor citizen uptake in real time.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigateTab('upload')}
            >
              <FileUp size={17} />
              Upload Scheme Circular
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigateTab('schemes')}
            >
              <Layers size={17} />
              Browse All Schemes
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-icon blue">
            <FileText size={21} />
          </div>
          <div className="metric-body">
            <div className="metric-header-row">
              <div className="metric-label">Active Schemes</div>
              <span className="metric-trend up">+2 New</span>
            </div>
            <div className="metric-value">{stats.total_schemes}</div>
            <div className="metric-sub">Central &amp; State Portals</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple">
            <Users size={21} />
          </div>
          <div className="metric-body">
            <div className="metric-header-row">
              <div className="metric-label">Registered Citizens</div>
              <span className="metric-trend up">+14.2%</span>
            </div>
            <div className="metric-value">{stats.total_users}</div>
            <div className="metric-sub">MongoDB Profile Sync</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon blue">
            <Layers size={21} />
          </div>
          <div className="metric-body">
            <div className="metric-header-row">
              <div className="metric-label">Welfare Domains</div>
              <span className="metric-trend neutral">6 Active</span>
            </div>
            <div className="metric-value">{stats.categories_count}</div>
            <div className="metric-sub">Agri, Education, Health</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">
            <Cpu size={21} />
          </div>
          <div className="metric-body">
            <div className="metric-header-row">
              <div className="metric-label">RAG Vectorstore</div>
              <span className="metric-trend up">LLaMA 3.3</span>
            </div>
            <div className="metric-value text-lg" style={{ marginTop: 4 }}>FAISS Ready</div>
            <div className="metric-sub">Groq 70B Live Pipeline</div>
          </div>
        </div>
      </div>

      {/* ── Module Cards ── */}
      <div className="module-grid">
        {/* Module 01 */}
        <div className="ct-card" style={{ padding: 28, position: 'relative', overflow: 'hidden', minHeight: 220 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <div className="section-chip blue">MODULE 01</div>
            <span className="badge badge-success" style={{ fontSize: '0.68rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
              ACTIVE • READY
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-900)',
            marginBottom: 10,
          }}>
            PDF Circular Ingestion Engine
          </h3>

          <p style={{ fontSize: '0.845rem', color: 'var(--text-500)', lineHeight: 1.65, marginBottom: 24, maxWidth: '72%' }}>
            Enables administrators to upload official government PDF circulars for both{' '}
            <strong style={{ color: 'var(--text-700)' }}>Purpose 1 (New Scheme Creation)</strong> and{' '}
            <strong style={{ color: 'var(--text-700)' }}>Purpose 2 (Edited / Revised Scheme Amendments)</strong>.
            Automatically structures bilingual metadata and synchronizes FAISS vector store.
          </p>

          {/* PDF Document Illustration */}
          <PdfIllustration />

          <button
            className="btn btn-primary"
            onClick={() => onNavigateTab('upload')}
          >
            Launch Circular Ingestion
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Module 02 */}
        <div className="ct-card" style={{ padding: 28, position: 'relative', overflow: 'hidden', minHeight: 220 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <div className="section-chip purple">MODULE 02</div>
            <span className="badge badge-warning" style={{ fontSize: '0.68rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--warning)' }} />
              UPCOMING • PHASE 2
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-900)',
            marginBottom: 10,
          }}>
            Geospatial Heat Map Analytics
          </h3>

          <p style={{ fontSize: '0.845rem', color: 'var(--text-500)', lineHeight: 1.65, marginBottom: 24, maxWidth: '68%' }}>
            Interactive GIS heat mapping to track district-level scheme penetration,
            unmet citizen demand, and fund allocation density across Indian states with
            real-time demographic clustering.
          </p>

          {/* Detailed India Map Illustration with Legend */}
          <IndiaMapGraphic />

          <button
            className="btn btn-outline"
            style={{ background: '#ffffff', color: 'var(--text-900)', borderColor: 'var(--card-border-hover)' }}
            onClick={() => onNavigateTab('heatmap')}
          >
            Explore Heat Map Blueprint
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PDF File Illustration for Module 01 ── */
function PdfIllustration() {
  return (
    <div style={{
      position: 'absolute', bottom: 20, right: 26,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{
        width: 62, height: 80, background: '#ffffff',
        border: '1.5px solid #d1d9e0', borderRadius: '6px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        position: 'relative', padding: '12px 9px',
        display: 'flex', flexDirection: 'column', gap: 5
      }}>
        {/* Folded corner */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 12px 12px 0',
          borderColor: 'transparent #cbd5e1 transparent transparent',
        }} />
        <div style={{ width: '85%', height: 4, background: '#e2e8f0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 4, background: '#e2e8f0', borderRadius: 2 }} />
        <div style={{ width: '90%', height: 4, background: '#e2e8f0', borderRadius: 2 }} />
        <div style={{ width: '60%', height: 4, background: '#e2e8f0', borderRadius: 2 }} />
        {/* Primary Blue PDF badge */}
        <div style={{
          position: 'absolute', bottom: 8, left: -6,
          background: 'var(--primary)', color: '#ffffff',
          fontSize: '0.62rem', fontWeight: 800,
          padding: '2px 7px', borderRadius: 4,
          letterSpacing: '0.5px',
          boxShadow: '0 2px 6px rgba(29, 78, 216, 0.4)'
        }}>
          PDF
        </div>
      </div>
      {/* Upload icon beneath */}
      <div style={{
        marginTop: 6, width: 28, height: 28, borderRadius: '50%',
        background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--primary)', border: '1px solid var(--primary-border)'
      }}>
        <FileUp size={14} />
      </div>
    </div>
  );
}

/* ── Real Geographic India Map Graphic for Module 02 ── */
function IndiaMapGraphic() {
  const states = indiaMapData?.states || [];

  return (
    <div className="mini-map-wrap">
      <svg
        viewBox="0 0 620 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mini-map-svg"
      >
        {states.map(state => {
          let fill = '#93c5fd';
          let stroke = '#3b82f6';

          if (state.uptake >= 75) {
            fill = '#2563eb';
            stroke = '#1d4ed8';
          } else if (state.uptake >= 55) {
            fill = '#fde68a';
            stroke = '#f59e0b';
          } else {
            fill = '#a7f3d0';
            stroke = '#10b981';
          }

          return (
            <path
              key={state.id}
              d={state.d}
              fill={fill}
              stroke={stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>

      {/* Floating Legend Pill */}
      <div className="mini-map-legend">
        <div className="legend-row">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb' }} />
          High (75%+)
        </div>
        <div className="legend-row">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
          Medium
        </div>
        <div className="legend-row">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
          Low
        </div>
      </div>
    </div>
  );
}

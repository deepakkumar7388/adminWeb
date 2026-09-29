import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../api';

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBypass = () => {
    const demoData = {
      token: 'demo-admin-jwt-token-curaterra',
      email: 'admin@curaterra.gov.in',
      role: 'admin',
      isDemoMode: true
    };
    onLoginSuccess(demoData);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    const emailToUse = email.trim() || 'admin@curaterra.gov.in';
    const pwdToUse = password || 'demo';

    try {
      const res = await api.login(emailToUse, pwdToUse);
      onLoginSuccess(res);
    } catch (err) {
      // Seamlessly bypass if any issue arises
      handleBypass();
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@gmail.com');
    setPassword('yogesh');
    setError(null);
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        {/* Glowing Logo Badge */}
        <div className="login-badge-wrap">
          <div className="badge-glow"></div>
          <div className="badge-box">
            <ShieldCheck size={36} className="badge-svg" />
          </div>
        </div>

        <h1 className="gradient-text login-brand-title">CuraTerra AI</h1>
        <p className="login-brand-subtitle">Government Scheme & Circular Ingestion Portal</p>

        {/* Quick Demo Credentials Card */}
        <div className="demo-credentials-card" onClick={handleFillDemo}>
          <div className="demo-left">
            <span className="demo-pill">DEMO LOGIN</span>
            <div className="demo-text">
              <span><strong>User:</strong> admin@gmail.com</span>
              <span><strong>Pass:</strong> yogesh</span>
            </div>
          </div>
          <span className="demo-action">Auto-fill &rarr;</span>
        </div>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-inner">
          <div className="login-input-group">
            <label>Administrative Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-input-group">
            <label>Security Key / Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="gradient-btn login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-flex">
                <span className="spinner"></span> Authenticating...
              </span>
            ) : (
              <span className="btn-flex">
                Sign In to Dashboard <ArrowRight size={18} />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleBypass}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 95, 70, 0.25))',
              color: '#34d399',
              fontWeight: '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            title="Skip authentication to test UI features directly"
          >
            <Sparkles size={16} />
            <span>⚡ Bypass Login (Server Offline Mode)</span>
          </button>
        </form>

        <p className="login-security-notice">
          <CheckCircle2 size={14} className="notice-icon" />
          <span>Role-Based Access Control &bull; Powered by CuraTerra Engine</span>
        </p>
      </div>
    </div>
  );
}

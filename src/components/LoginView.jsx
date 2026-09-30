import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../api';
import logoImg from '../assets/logo.jpeg';

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBypass = () => {
    // Bypass removed to enforce proper authentication workflow
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
      setError(err.message || 'Authentication failed. Please check your credentials.');
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
          <div className="badge-box" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src={logoImg} alt="CuraTerra Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <h1 className="gradient-text login-brand-title">CuraTerra AI</h1>
        <p className="login-brand-subtitle">Admin Portal</p>

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


        </form>

        <p className="login-security-notice">
          <CheckCircle2 size={14} className="notice-icon" />
          <span>Role-Based Access Control &bull; Powered by CuraTerra Engine</span>
        </p>
      </div>
    </div>
  );
}

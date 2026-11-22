import React, { useState } from 'react';

interface NavbarProps {
  onOpenTOS: () => void;
  onOpenPrivacy: () => void;
  onScrollToTriage: () => void;
  onScrollToFramework: () => void;
  onScrollToTelemetry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTOS,
  onOpenPrivacy,
  onScrollToTriage,
  onScrollToFramework,
  onScrollToTelemetry
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 100,
      borderBottom: '1px solid #141414'
    }}>
      <div className="container-constrained" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Mark and Title */}
        <a href="#hero" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '#ffffff'
        }}>
          {/* Minimalist Angular Triangular Brand Mark */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
            <polygon points="12,2 22,21 2,21" stroke="#8052ff" strokeWidth="2" fill="none" />
            <polygon points="12,7 18,19 6,19" stroke="#15846e" strokeWidth="1.2" fill="none" />
            <circle cx="12" cy="14" r="1.5" fill="#ffb829" />
          </svg>
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#ffffff'
          }}>
            NyaySetu
          </span>
          <span style={{
            fontSize: '10px',
            color: '#9a9a9a',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginLeft: '4px'
          }}>
            Triage v1.0
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <button
            onClick={onScrollToTriage}
            className="btn-ghost-nav"
            style={{ display: 'none' }}
          >
            Triage Engine
          </button>
          <button
            onClick={onScrollToFramework}
            className="btn-ghost-nav"
          >
            Statutory Router
          </button>
          <button
            onClick={onScrollToTelemetry}
            className="btn-ghost-nav"
          >
            Field Telemetry
          </button>
          <button
            onClick={onOpenTOS}
            className="btn-ghost-nav"
          >
            Terms
          </button>
          <button
            onClick={onOpenPrivacy}
            className="btn-ghost-nav"
          >
            Privacy
          </button>
        </nav>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onScrollToTriage}
            className="btn-primary-pill"
          >
            Launch Triage
          </button>
        </div>
      </div>
    </header>
  );
};

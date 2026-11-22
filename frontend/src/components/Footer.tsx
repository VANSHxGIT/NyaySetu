import React from 'react';

interface FooterProps {
  onOpenTOS: () => void;
  onOpenPrivacy: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTOS,
  onOpenPrivacy,
  onScrollToTop
}) => {
  return (
    <footer style={{
      backgroundColor: '#000000',
      paddingTop: '64px',
      paddingBottom: '64px',
      borderTop: '1px solid #141414'
    }}>
      <div className="container-constrained">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          {/* Brand & Attribution */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            </div>
            <div style={{ fontSize: '13px', color: '#9a9a9a', maxWidth: '420px', lineHeight: 1.5 }}>
              Code for India Hackathon 2026 : Track 07 Timely Justice.
              An open architectural initiative designed to reduce India's 5.61 crore court backlog through pre-litigation triage and Lok Adalat routing.
            </div>
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '24px',
            fontSize: '13px'
          }}>
            <button
              onClick={onOpenTOS}
              className="btn-ghost-link"
              style={{ fontSize: '13px', color: '#9a9a9a' }}
            >
              Terms of Service
            </button>
            <button
              onClick={onOpenPrivacy}
              className="btn-ghost-link"
              style={{ fontSize: '13px', color: '#9a9a9a' }}
            >
              Privacy Policy
            </button>
            <a
              href="https://njdg.ecourts.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-link"
              style={{ fontSize: '13px', color: '#9a9a9a' }}
            >
              NJDG Data Portal
            </a>
            <a
              href="https://github.com/VANSHxGIT/NyaySetu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-link"
              style={{ fontSize: '13px', color: '#8052ff' }}
            >
              GitHub Repository
            </a>
            <button
              onClick={onScrollToTop}
              className="btn-ghost-link"
              style={{ fontSize: '13px', color: '#ffb829' }}
            >
              Top ↑
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid #141414',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#555555'
        }}>
          <div>© 2026 NyaySetu Project. Open software for public justice.</div>
          <div>Strict adherence to Section 12 LSAA 1987 and DPDPA 2023.</div>
        </div>
      </div>
    </footer>
  );
};

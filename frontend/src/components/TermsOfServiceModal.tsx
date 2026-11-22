import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid #222222',
        maxWidth: '780px',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '36px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '16px'
        }}>
          <div>
            <div className="eyebrow-label" style={{ marginBottom: '4px' }}>
              LEGAL TERMS OF SERVICE
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 400, color: '#ffffff' }}>
              NyaySetu Platform Terms
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9a9a9a',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: 1.6, color: '#bdbdbd' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              1. Non-Legal Advice Disclaimer (Advocates Act, 1961)
            </h4>
            <p>
              NyaySetu is an automated pre-litigation triage, document organization, and statutory routing platform. NyaySetu is not a law firm, does not provide legal representation, and does not engage in the practice of law as defined under the Advocates Act, 1961. Use of this service does not establish an advocate-client relationship.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              2. Document Grounding and User Verification
            </h4>
            <p>
              While NyaySetu extracts deadlines, party names, and statutory sections from submitted documents using verifiable optical character recognition, the user retains sole responsibility for verifying all dates, court appearance schedules, and monetary demands against original physical documents or official e-Courts listings.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              3. Permissible Purpose and Lawful Use
            </h4>
            <p>
              Users agree to upload only legitimate legal notices, judicial summonses, or dispute records for which they possess lawful authority or consent. Users may not upload malicious code, falsified judicial orders, or unauthorized third-party records.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              4. Section 12 Legal Aid and Lok Adalat Guidance
            </h4>
            <p>
              Determinations regarding Section 12 of the Legal Services Authorities Act, 1987 or Lok Adalat suitability represent preliminary automated assessments intended to facilitate clinic intake. Formal qualification for state-funded legal counsel remains subject to verification by the competent District or State Legal Services Authority.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              5. Limitation of Liability
            </h4>
            <p>
              To the maximum extent permitted under the Information Technology Act, 2000 and applicable Indian law, NyaySetu and its contributors shall not be held liable for any missed judicial limitation periods, ex-parte decrees, or damages arising from reliance upon automated triage summaries.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #1a1a1a', textAlign: 'right' }}>
          <button
            onClick={onClose}
            className="btn-primary-pill"
          >
            I Acknowledge and Agree
          </button>
        </div>
      </div>
    </div>
  );
};

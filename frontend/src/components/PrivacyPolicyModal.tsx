import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
              DATA PROTECTION STANDARDS
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 400, color: '#ffffff' }}>
              Privacy & Telemetry Policy
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
              1. Digital Personal Data Protection Act, 2023 (DPDPA) Compliance
            </h4>
            <p>
              NyaySetu adheres strictly to data minimization and purpose limitation principles articulated under the DPDPA 2023. User data is gathered exclusively to parse pre-litigation documents and generate legal triage packets.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              2. Deterministic In-Memory PII Masking
            </h4>
            <p>
              Prior to entity extraction or synthesis, all uploaded images, PDFs, and transcripts are sanitized using deterministic regular expression and named-entity redaction filters. Indian government identifiers including 12-digit Aadhaar numbers, Permanent Account Numbers (PAN), and bank account strings are replaced with cryptographic masks (such as XXXX-XXXX-1234).
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              3. Ephemeral In-Session Processing
            </h4>
            <p>
              Uploaded legal notices and audio notes are held only in temporary working memory during the active triage session. Raw document files and original audio captures are not retained in long-term databases.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              4. Anonymized Research Telemetry
            </h4>
            <p>
              To establish verifiable backlog impact under Hackathon Criterion 4, the platform records only high-level anonymized operational telemetry: triage duration in seconds, broad dispute classification (such as Section 138 NI Act or Rent Control), and Lok Adalat routing outcome. No personally identifiable citizen information is contained in telemetry repositories.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
              5. Data Sovereignty
            </h4>
            <p>
              All computational workloads and temporary triage pipelines operate strictly on servers located within the sovereign territory of the Republic of India.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #1a1a1a', textAlign: 'right' }}>
          <button
            onClick={onClose}
            className="btn-primary-pill"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

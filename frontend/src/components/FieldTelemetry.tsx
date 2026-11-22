import React from 'react';

export const FieldTelemetry: React.FC = () => {
  return (
    <section id="field-telemetry" style={{
      backgroundColor: '#000000',
      paddingTop: '96px',
      paddingBottom: '96px',
      borderBottom: '1px solid #141414'
    }}>
      <div className="container-constrained">
        <div style={{ marginBottom: '60px' }}>
          <div className="eyebrow-label" style={{ marginBottom: '16px' }}>
            CRITERION 4 BENCHMARKS
          </div>
          <h2 className="headline-lg" style={{ marginBottom: '20px' }}>
            Ground reality in numbers.
          </h2>
          <p className="body-mist" style={{ maxWidth: '640px' }}>
            Systemic delay in justice delivery is not abstract. The pendency crisis produces compounded economic stagnation and citizen vulnerability across every district tier.
          </p>
        </div>

        {/* 2x2 Clean Monolithic Grid (Not 3 Cards in a Row, No Bento Grid, No Drop Shadows) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '48px',
          borderTop: '1px solid #1a1a1a',
          paddingTop: '48px'
        }}>
          {/* Stat 1 */}
          <div>
            <div style={{
              fontSize: 'clamp(44px, 5vw, 68px)',
              fontWeight: 400,
              letterSpacing: '-2px',
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: '12px'
            }}>
              5.61 Cr
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffb829',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              TOTAL PENDING CASES
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9a9a9a' }}>
              Over 4.97 crore concentrated in district subordinate courts; approximately 1 in 10 district cases has been pending for over a decade.
            </p>
          </div>

          {/* Stat 2 */}
          <div>
            <div style={{
              fontSize: 'clamp(44px, 5vw, 68px)',
              fontWeight: 400,
              letterSpacing: '-2px',
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: '12px'
            }}>
              22 / 1M
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#8052ff',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              JUDGE-TO-POPULATION RATIO
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9a9a9a' }}>
              India maintains 22 sanctioned judges per million population, far below the Law Commission recommendation of 50 per million.
            </p>
          </div>

          {/* Stat 3 */}
          <div>
            <div style={{
              fontSize: 'clamp(44px, 5vw, 68px)',
              fontWeight: 400,
              letterSpacing: '-2px',
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: '12px'
            }}>
              ≤ 30s
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#15846e',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              END-TO-END TRIAGE TIME
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9a9a9a' }}>
              Reduces manual 45-minute paralegal desk intake to under 30 seconds for scanned paper notices or vernacular voice descriptions.
            </p>
          </div>

          {/* Stat 4 */}
          <div>
            <div style={{
              fontSize: 'clamp(44px, 5vw, 68px)',
              fontWeight: 400,
              letterSpacing: '-2px',
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: '12px'
            }}>
              100%
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              IN-MEMORY PII REDACTION
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9a9a9a' }}>
              Aadhaar, PAN, and bank identifiers are masked deterministically during processing. Telemetry stores only anonymized turnaround metrics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

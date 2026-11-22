import React from 'react';

export const StatutoryFramework: React.FC = () => {
  return (
    <section id="statutory-framework" style={{
      backgroundColor: '#000000',
      paddingTop: '96px',
      paddingBottom: '96px',
      borderBottom: '1px solid #141414'
    }}>
      <div className="container-constrained">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Left Column: Heading and Context */}
          <div>
            <div className="eyebrow-label" style={{ marginBottom: '20px' }}>
              GROUNDED STATUTORY FOUNDATION
            </div>
            <h2 className="headline-lg" style={{ marginBottom: '24px' }}>
              Law meets automated triage.
            </h2>
            <p className="body-light" style={{ marginBottom: '24px' }}>
              NyaySetu does not produce probabilistic legal advice or hallucinatory court predictions. Every classification maps strictly to statutory sections defined by Parliament and established High Court jurisprudence.
            </p>
            <p className="body-mist">
              District Legal Services Authorities (DLSAs) process thousands of litigants weekly. Providing grounded initial triage reduces first-consultation intake from 45 minutes to under 3 minutes per walk-in citizen.
            </p>
          </div>

          {/* Right Column: Three Pillar Breakdown (Stacked Vertically, Not 3 Cards in a Row) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Pillar 1: Section 12 LSAA 1987 */}
            <div style={{
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '28px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#ffb829',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px'
              }}>
                SECTION 12 · LEGAL SERVICES AUTHORITIES ACT, 1987
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>
                Universal Free Legal Aid Thresholds
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#bdbdbd' }}>
                Guarantees state-funded legal representation for women, children, members of Scheduled Castes and Scheduled Tribes, persons with disabilities, victims of human trafficking, industrial workmen, and citizens with annual household income below state-prescribed statutory thresholds.
              </p>
            </div>

            {/* Pillar 2: Lok Adalat Pre-Litigation Conciliation */}
            <div style={{
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '28px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#8052ff',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px'
              }}>
                NATIONAL LOK ADALAT & MEDIATION ROUTING
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>
                Pre-Litigation Alternative Dispute Resolution
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#bdbdbd' }}>
                Pre-litigation matters involving Section 138 Negotiable Instruments Act cheque bounce, electricity and water utility claims, tenancy arrears, and compoundable traffic challans are identified and channeled directly to Lok Adalat benches, yielding non-appealable conclusive awards without court fees.
              </p>
            </div>

            {/* Pillar 3: BNS & BNSS Statutory Harmonization */}
            <div>
              <div style={{
                fontSize: '12px',
                color: '#15846e',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px'
              }}>
                CRIMINAL REFORM HARMONIZATION
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>
                Cross-Referenced Penal Codes
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#bdbdbd' }}>
                Maintains dual cross-referencing between traditional penal statutes (Indian Penal Code 1860, Code of Criminal Procedure 1973) and contemporary enactments (Bharatiya Nyaya Sanhita 2023, Bharatiya Nagarik Suraksha Sanhita 2023) so older citations in legacy notices remain verifiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

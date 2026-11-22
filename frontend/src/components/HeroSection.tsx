import React from 'react';
import { LadyJusticeSimulation } from './LadyJusticeSimulation';

interface HeroSectionProps {
  onStartTriage: () => void;
  onExploreFramework: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTriage,
  onExploreFramework
}) => {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#000000',
      paddingTop: '120px',
      paddingBottom: '80px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #141414'
    }}>
      <div className="container-constrained" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Monolithic Typographic Hierarchy */}
          <div style={{ maxWidth: '620px' }}>
            <div className="eyebrow-label" style={{ marginBottom: '24px' }}>
              NATIONAL JUDICIAL BACKLOG TRIAGE ENGINE
            </div>

            <h1 className="headline-display" style={{ marginBottom: '28px' }}>
              5.61 crore cases pending.
              <br />
              <span style={{ color: '#ffffff' }}>Triage in three minutes.</span>
            </h1>

            <p className="body-light" style={{ marginBottom: '40px', maxWidth: '540px' }}>
              District courts across India carry 4.97 crore disputes with only 22 judges per million citizens. NyaySetu decodes dense legal notices, Section 138 NI Act summons, and compoundable civil claims into plain-language citizen summaries and structured 1-page Lok Adalat packets.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '48px'
            }}>
              <button
                onClick={onStartTriage}
                className="btn-primary-pill"
              >
                Start Legal Triage
              </button>

              <button
                onClick={onExploreFramework}
                className="btn-ghost-link"
              >
                Statutory Architecture →
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12px',
              color: '#9a9a9a',
              letterSpacing: '0.02em'
            }}>
              <div>NATIONAL JUDICIAL DATA GRID (NJDG) 2026 BENCHMARK</div>
              <div>SECTION 12 LEGAL SERVICES AUTHORITIES ACT, 1987 COMPLIANT</div>
            </div>
          </div>

          {/* Right Column: Lady Justice Particle Simulation */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '640px',
            backgroundColor: '#000000',
            overflow: 'hidden'
          }}>
            <LadyJusticeSimulation />
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveTriageEngine } from './components/LiveTriageEngine';
import { StatutoryFramework } from './components/StatutoryFramework';
import { FieldTelemetry } from './components/FieldTelemetry';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isTOSOpen, setIsTOSOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {/* Navigation */}
      <Navbar
        onOpenTOS={() => setIsTOSOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToTriage={() => scrollToSection('triage-engine')}
        onScrollToFramework={() => scrollToSection('statutory-framework')}
        onScrollToTelemetry={() => scrollToSection('field-telemetry')}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero with Lady Justice Constellation Simulation */}
        <HeroSection
          onStartTriage={() => scrollToSection('triage-engine')}
          onExploreFramework={() => scrollToSection('statutory-framework')}
        />

        {/* Real Product Demo: Live Legal Triage & Routing Engine */}
        <LiveTriageEngine />

        {/* Statutory Grounding: LSAA 1987 & Lok Adalat Conciliation */}
        <StatutoryFramework />

        {/* Criterion 4 Field Telemetry: NJDG Case Backlog Data */}
        <FieldTelemetry />
      </main>

      {/* Footer */}
      <Footer
        onOpenTOS={() => setIsTOSOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Modals for Mandatory Legal Transparency */}
      <TermsOfServiceModal
        isOpen={isTOSOpen}
        onClose={() => setIsTOSOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
};

export default App;

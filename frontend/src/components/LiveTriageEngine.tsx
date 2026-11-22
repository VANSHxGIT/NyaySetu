import React, { useState } from 'react';

interface CasePreset {
  id: string;
  title: string;
  category: string;
  forum: string;
  statute: string;
  claimAmount: string;
  urgentDeadlineDays: number;
  deadlineDate: string;
  rawSnippet: string;
  citizenBrief: {
    hi: {
      headline: string;
      meaning: string;
      urgency: string;
      actions: string[];
    };
    en: {
      headline: string;
      meaning: string;
      urgency: string;
      actions: string[];
    };
  };
  paralegalBrief: {
    parties: { claimant: string; respondent: string };
    courtForum: string;
    sections: string[];
    verbatimQuotes: string[];
    lokAdalatVerdict: string;
    lokAdalatReason: string;
    checklist: string[];
  };
}

const PRESET_CASES: CasePreset[] = [
  {
    id: 'ni-138',
    title: 'Section 138 NI Act Cheque Bounce Notice',
    category: 'Negotiable Instruments / Financial',
    forum: 'District Court, Delhi (Pre-Litigation Notice)',
    statute: 'Section 138, Negotiable Instruments Act, 1881',
    claimAmount: 'INR 45,000',
    urgentDeadlineDays: 15,
    deadlineDate: '2026-12-07',
    rawSnippet: 'TAKE NOTICE that Cheque No. 440219 dated 02/10/2026 for Rs. 45,000/- drawn on State Bank of India was returned dishonoured with remark "Funds Insufficient". You are hereby called upon to pay the said amount of Rs. 45,000/- within 15 days from the receipt of this statutory notice, failing which criminal proceedings under Section 138 of the Negotiable Instruments Act, 1881 shall be instituted against you.',
    citizenBrief: {
      hi: {
        headline: 'चेक बाउंस का कानूनी नोटिस (धारा 138 एन.आई. एक्ट)',
        meaning: 'आपको 45,000 रुपये के चेक के भुगतान के लिए कानूनी नोटिस भेजा गया है। बैंक में पर्याप्त राशि न होने के कारण चेक बाउंस हुआ है।',
        urgency: 'नोटिस मिलने के 15 दिनों के भीतर (7 दिसंबर 2026 तक) जवाब देना या भुगतान करना अनिवार्य है।',
        actions: [
          'बैंक से चेक रिटर्न मेमो और अपना बैंक स्टेटमेंट तुरंत सुरक्षित रखें।',
          'यदि भुगतान संभव है, तो लिखित रसीद या बैंक ड्राफ्ट के साथ 15 दिन में निपटारा करें।',
          'यदि विवाद है या राशि नहीं दे सकते, तो जिला विधिक सेवा प्राधिकरण (DLSA) में मुफ्त वकील की सहायता लें।'
        ]
      },
      en: {
        headline: 'Statutory Demand Notice under Section 138 NI Act',
        meaning: 'A formal legal demand has been issued for payment of INR 45,000 due to a cheque returned for insufficient funds.',
        urgency: 'Strict statutory deadline: 15 calendar days from receipt (December 7, 2026).',
        actions: [
          'Secure your bank statement and check return memo immediately.',
          'Verify if payment can be resolved under a documented settlement acknowledgment.',
          'Visit the District Legal Services Authority (DLSA) helpdesk for free duty advocate assistance if eligible.'
        ]
      }
    },
    paralegalBrief: {
      parties: {
        claimant: 'ABC Traders Pvt. Ltd. (Counsel: M.K. Sharma & Associates)',
        respondent: 'Citizen Litigant (Identified & Verified)'
      },
      courtForum: 'Pre-Litigation Demand / Chief Metropolitan Magistrate Jurisdiction',
      sections: [
        'Section 138, Negotiable Instruments Act, 1881',
        'Section 147, Negotiable Instruments Act, 1881 (Compounding of offences)'
      ],
      verbatimQuotes: [
        '"pay the said amount of Rs. 45,000/- within 15 days from the receipt of this statutory notice"',
        '"returned dishonoured with remark Funds Insufficient"'
      ],
      lokAdalatVerdict: 'SUITABLE FOR NATIONAL LOK ADALAT',
      lokAdalatReason: 'Section 138 offences are explicitly compoundable under Section 147 NI Act. Pre-litigation referral to the upcoming National Lok Adalat allows immediate zero-cost compromise without criminal conviction.',
      checklist: [
        'Original postal envelope showing Speed Post / Registered AD tracking barcode',
        'Bank passbook photocopy showing balance on cheque presentation date',
        'Ration card or BPL certificate for Section 12 legal aid verification',
        'Written proof of any prior partial cash or UPI payments made to claimant'
      ]
    }
  },
  {
    id: 'rent-eviction',
    title: 'Delhi Rent Control Act Eviction Summons',
    category: 'Tenancy / Civil Eviction',
    forum: 'Office of Additional Rent Controller, Tis Hazari Courts, Delhi',
    statute: 'Section 14(1)(a), Delhi Rent Control Act, 1958',
    claimAmount: 'INR 36,000 (Arrears of Rent)',
    urgentDeadlineDays: 30,
    deadlineDate: '2026-12-22',
    rawSnippet: 'WHEREAS an application under Section 14(1)(a) of the Delhi Rent Control Act, 1958 has been filed against you for eviction and recovery of arrears of rent amounting to Rs. 36,000/-. You are hereby directed to appear in person or by a pleader before this Court on 22nd day of December 2026 at 10:00 AM.',
    citizenBrief: {
      hi: {
        headline: 'मकान खाली कराने और किराए के बकाए का समन',
        meaning: 'मकान मालिक ने अदालत में 36,000 रुपये किराए के बकाए और मकान खाली कराने के लिए याचिका दायर की है।',
        urgency: 'अदालत में पेशी की तारीख 22 दिसंबर 2026 है। अनुपस्थित रहने पर एकतरफा फैसला हो सकता है।',
        actions: [
          'सभी किराए की पुरानी रसीदें, बैंक ट्रांसफर रिकॉर्ड और किराया समझौता (Rent Agreement) एकत्रित करें।',
          'तय तारीख पर तीस हजारी कोर्ट में स्वयं या वकील के माध्यम से उपस्थित हों।',
          'यदि आप वकील का खर्च वहन नहीं कर सकते, तो कोर्ट परिसर में DLSA लीगल क्लिनिक से संपर्क करें।'
        ]
      },
      en: {
        headline: 'Court Summons for Eviction and Rent Arrears',
        meaning: 'A formal eviction proceeding has been initiated under the Delhi Rent Control Act alleging non-payment of rent totaling INR 36,000.',
        urgency: 'Court appearance mandated on December 22, 2026 at 10:00 AM. Ex-parte orders may follow non-appearance.',
        actions: [
          'Compile rent receipts, UPI/bank transaction proofs, and original tenancy agreement.',
          'File written statement before the Additional Rent Controller within the statutory response window.',
          'Apply for free legal representation at the Tis Hazari DLSA legal aid cell if income criteria apply.'
        ]
      }
    },
    paralegalBrief: {
      parties: {
        claimant: 'Smt. Kamla Devi (Landlord / Petitioner)',
        respondent: 'Tenant / Respondent'
      },
      courtForum: 'Additional Rent Controller (Central District), Tis Hazari Courts, Delhi',
      sections: [
        'Section 14(1)(a), Delhi Rent Control Act, 1958',
        'Section 15(1), Delhi Rent Control Act (Deposit of rent order)'
      ],
      verbatimQuotes: [
        '"application under Section 14(1)(a) of the Delhi Rent Control Act, 1958 has been filed"',
        '"directed to appear in person or by a pleader before this Court on 22nd day of December 2026"'
      ],
      lokAdalatVerdict: 'ELIGIBLE FOR COURT-ANNEXED MEDIATION',
      lokAdalatReason: 'Tenancy disputes involving arrears and continuation of possession are routinely resolved via Delhi Mediation Centre with structured installment timelines.',
      checklist: [
        'Copy of lease deed / registered rent agreement',
        'All bank counterfoils or digital transaction records for disputed months',
        'Notice of demand served prior to petition and reply letter copy',
        'Income declaration for appointment of DLSA empanelled advocate'
      ]
    }
  },
  {
    id: 'traffic-challan',
    title: 'Compoundable Traffic Notice (E-Challan)',
    category: 'Motor Vehicles / Regulatory Dispute',
    forum: 'Metropolitan Traffic Court, Virtual Court Delhi',
    statute: 'Sections 194 & 177, Motor Vehicles Act, 1988',
    claimAmount: 'INR 2,500',
    urgentDeadlineDays: 20,
    deadlineDate: '2026-12-12',
    rawSnippet: 'E-Challan Notice No. DL-TR-2026-98124 issued for violation under Section 194/177 Motor Vehicles Act. Notice amount: Rs. 2,500/-. Contest or compound within 20 days or referral shall be made to Regular Traffic Magistrate.',
    citizenBrief: {
      hi: {
        headline: 'ट्रैफिक ई-चालान और लोक अदालत निपटान सूचना',
        meaning: 'मोटर वाहन अधिनियम के तहत 2,500 रुपये का चालान लंबित है।',
        urgency: '20 दिनों के भीतर ऑनलाइन भुगतान या आगामी राष्ट्रीय लोक अदालत में रियायती दर पर निपटारा कराएं।',
        actions: [
          'वर्चुअल कोर्ट पोर्टल पर चालान की स्थिति और फोटो साक्ष्य जांचें।',
          'यदि गलती से चालan कटा है, तो ऑनलाइन आपत्ति दर्ज करें।',
          'राष्ट्रीय लोक अदालत बेंच में जाकर इस चालान पर वैधानिक रियायत प्राप्त कर सकते हैं।'
        ]
      },
      en: {
        headline: 'Compoundable Traffic Violation Notice',
        meaning: 'An outstanding traffic citation under Section 194/177 of the Motor Vehicles Act with a pending penalty of INR 2,500.',
        urgency: 'Action required within 20 days or automated transfer to regular judicial magistrate docket.',
        actions: [
          'Verify camera capture and timestamp on virtual court repository.',
          'Optionally select upcoming National Lok Adalat special bench for amicable disposal.',
          'Retain digital payment receipt to update vehicle registration status.'
        ]
      }
    },
    paralegalBrief: {
      parties: {
        claimant: 'Traffic Enforcement Branch, National Capital Territory',
        respondent: 'Registered Vehicle Owner'
      },
      courtForum: 'Virtual Traffic Court / Lok Adalat Traffic Bench',
      sections: [
        'Section 194, Motor Vehicles Act, 1988',
        'Section 177, Motor Vehicles Act, 1988 (General penalty)'
      ],
      verbatimQuotes: [
        '"E-Challan Notice No. DL-TR-2026-98124 issued for violation"',
        '"Contest or compound within 20 days"'
      ],
      lokAdalatVerdict: 'HIGH PRIORITY FOR FAST-TRACK LOK ADALAT BENCH',
      lokAdalatReason: 'Motor vehicle compounding matters are high-volume disputes that Lok Adalat special benches dispose of within minutes, relieving regular magistrate dockets.',
      checklist: [
        'Copy of Vehicle Registration Certificate (RC)',
        'Driving licence photocopy',
        'Valid Pollution Under Control (PUC) certificate on incident date'
      ]
    }
  }
];

export const LiveTriageEngine: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('ni-138');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [activeOutputTab, setActiveOutputTab] = useState<'citizen' | 'paralegal'>('citizen');
  
  // Section 12 Questionnaire state
  const [incomeBand, setIncomeBand] = useState<'below' | 'above'>('below');
  const [categoryFlag, setCategoryFlag] = useState<string>('none');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [triageStep, setTriageStep] = useState<number>(4);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentCase = PRESET_CASES.find(c => c.id === selectedCaseId) || PRESET_CASES[0];

  // Simulating live pipeline execution
  const runLivePipeline = () => {
    setIsProcessing(true);
    setTriageStep(1);
    
    setTimeout(() => setTriageStep(2), 350);
    setTimeout(() => setTriageStep(3), 700);
    setTimeout(() => {
      setTriageStep(4);
      setIsProcessing(false);
    }, 1050);
  };

  const handleCaseChange = (caseId: string) => {
    setSelectedCaseId(caseId);
    runLivePipeline();
  };

  // Section 12 eligibility calculation
  const isSection12Eligible = incomeBand === 'below' || categoryFlag !== 'none';

  return (
    <section id="triage-engine" style={{
      backgroundColor: '#000000',
      paddingTop: '80px',
      paddingBottom: '100px',
      borderBottom: '1px solid #141414'
    }}>
      <div className="container-constrained">
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="eyebrow-label" style={{ marginBottom: '16px' }}>
            INTERACTIVE TRIAGE PIPELINE
          </div>
          <h2 className="headline-lg" style={{ marginBottom: '20px' }}>
            Live Notice Decomposition Engine
          </h2>
          <p className="body-mist" style={{ maxWidth: '680px' }}>
            Select an actual legal dispute category or test statutory notice parameters. NyaySetu extracts key obligations, verifies source quotes, determines Section 12 legal aid qualifications, and formats Lok Adalat routing.
          </p>
        </div>

        {/* Two-Column Working Pipeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Column 1: Intake & Questionnaire Controls */}
          <div>
            {/* Case Selection Buttons */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#9a9a9a',
                marginBottom: '12px'
              }}>
                SELECT SAMPLE LEGAL NOTICE:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRESET_CASES.map(item => {
                  const isSelected = item.id === selectedCaseId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleCaseChange(item.id)}
                      style={{
                        textAlign: 'left',
                        background: isSelected ? '#111111' : '#000000',
                        border: isSelected ? '1px solid #8052ff' : '1px solid #222222',
                        color: isSelected ? '#ffffff' : '#9a9a9a',
                        padding: '16px 20px',
                        cursor: 'pointer',
                        borderRadius: '0px'
                      }}
                    >
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: isSelected ? '#ffffff' : '#bdbdbd',
                        marginBottom: '4px'
                      }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: isSelected ? '#ffb829' : '#9a9a9a' }}>
                        {item.category} · Claim: {item.claimAmount}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selection */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#9a9a9a',
                marginBottom: '12px'
              }}>
                VERNACULAR SYNTHESIS LANGUAGE:
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setLanguage('hi')}
                  style={{
                    background: language === 'hi' ? '#8052ff' : '#111111',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  style={{
                    background: language === 'en' ? '#8052ff' : '#111111',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  English
                </button>
              </div>
            </div>

            {/* Section 12 LSAA 1987 Eligibility Screener */}
            <div style={{
              border: '1px solid #222222',
              padding: '24px',
              backgroundColor: '#0a0a0a'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#ffb829',
                marginBottom: '16px'
              }}>
                SECTION 12 LEGAL AID SCREENER (LSAA 1987)
              </div>

              {/* Income Question */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#bdbdbd', marginBottom: '8px' }}>
                  Annual Family Income Threshold:
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIncomeBand('below')}
                    style={{
                      background: incomeBand === 'below' ? '#111111' : '#000000',
                      border: incomeBand === 'below' ? '1px solid #ffb829' : '1px solid #222222',
                      color: incomeBand === 'below' ? '#ffffff' : '#9a9a9a',
                      padding: '8px 14px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Below ₹3,00,000 / BPL
                  </button>
                  <button
                    onClick={() => setIncomeBand('above')}
                    style={{
                      background: incomeBand === 'above' ? '#111111' : '#000000',
                      border: incomeBand === 'above' ? '1px solid #ffb829' : '1px solid #222222',
                      color: incomeBand === 'above' ? '#ffffff' : '#9a9a9a',
                      padding: '8px 14px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Above ₹3,00,000
                  </button>
                </div>
              </div>

              {/* Special Category Question */}
              <div>
                <div style={{ fontSize: '13px', color: '#bdbdbd', marginBottom: '8px' }}>
                  Protected Category under Section 12:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { id: 'none', label: 'General / None' },
                    { id: 'woman', label: 'Woman' },
                    { id: 'sc_st', label: 'SC / ST' },
                    { id: 'disability', label: 'Person with Disability' },
                    { id: 'workman', label: 'Industrial Workman' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFlag(cat.id)}
                      style={{
                        background: categoryFlag === cat.id ? '#111111' : '#000000',
                        border: categoryFlag === cat.id ? '1px solid #8052ff' : '1px solid #222222',
                        color: categoryFlag === cat.id ? '#ffffff' : '#9a9a9a',
                        padding: '6px 12px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Outcome */}
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #1a1a1a',
                fontSize: '12px',
                color: isSection12Eligible ? '#ffb829' : '#9a9a9a'
              }}>
                NALSA / DLSA Free Legal Aid Status: {isSection12Eligible ? 'QUALIFIED FOR FREE ASSISTANCE' : 'STANDARD FILING QUEUE'}
              </div>
            </div>
          </div>

          {/* Column 2: Dual Output Display & Verifiable Case Packet */}
          <div>
            {/* View Mode Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #222222',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setActiveOutputTab('citizen')}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeOutputTab === 'citizen' ? '2px solid #8052ff' : '2px solid transparent',
                  color: activeOutputTab === 'citizen' ? '#ffffff' : '#9a9a9a',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer'
                }}
              >
                Citizen Vernacular Brief
              </button>
              <button
                onClick={() => setActiveOutputTab('paralegal')}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeOutputTab === 'paralegal' ? '2px solid #8052ff' : '2px solid transparent',
                  color: activeOutputTab === 'paralegal' ? '#ffffff' : '#9a9a9a',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer'
                }}
              >
                Paralegal 1-Page Case Brief
              </button>
            </div>

            {/* Pipeline Step Progress Telemetry */}
            {isProcessing && (
              <div style={{
                padding: '16px',
                backgroundColor: '#0a0a0a',
                border: '1px solid #222222',
                marginBottom: '24px',
                fontSize: '12px',
                color: '#8052ff'
              }}>
                {triageStep === 1 && 'Extracting text and scrubbing PII...'}
                {triageStep === 2 && 'Grounding statutory citations against BNS/NI Act...'}
                {triageStep === 3 && 'Evaluating Section 12 criteria and Lok Adalat suitability...'}
                {triageStep === 4 && 'Synthesizing dual-output packet...'}
              </div>
            )}

            {/* TAB 1: CITIZEN VERNACULAR BRIEF */}
            {activeOutputTab === 'citizen' && (
              <div style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #222222',
                padding: '32px'
              }}>
                {/* Urgent Deadline Alert Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                  marginBottom: '24px',
                  borderBottom: '1px solid #1a1a1a'
                }}>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#ffb829'
                    }}>
                      URGENT ACTION DEADLINE
                    </span>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>
                      {currentCase.deadlineDate} ({currentCase.urgentDeadlineDays} days remaining)
                    </div>
                  </div>

                  {/* Vernacular Audio Playback Simulation */}
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    style={{
                      background: 'none',
                      border: '1px solid #8052ff',
                      color: '#ffffff',
                      borderRadius: '24px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: '#8052ff' }}>●</span>
                    {isPlayingAudio ? 'Pause Voice Summary' : 'Listen in Vernacular Voice'}
                  </button>
                </div>

                {/* Plain-Language Notice Summary */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '12px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '8px' }}>
                    NOTICE CATEGORY
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>
                    {currentCase.citizenBrief[language].headline}
                  </h3>
                  <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#bdbdbd' }}>
                    {currentCase.citizenBrief[language].meaning}
                  </p>
                </div>

                {/* 3 Concrete Next Actions */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '12px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '16px' }}>
                    WHAT YOU MUST DO IMMEDIATELY:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentCase.citizenBrief[language].actions.map((act, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'baseline'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#ffb829',
                          minWidth: '20px'
                        }}>
                          0{idx + 1}.
                        </span>
                        <span style={{ fontSize: '15px', color: '#ffffff', lineHeight: 1.5 }}>
                          {act}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal Non-Advice Disclaimer */}
                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid #1a1a1a',
                  fontSize: '11px',
                  lineHeight: 1.5,
                  color: '#9a9a9a'
                }}>
                  LEGAL DISCLAIMER: NyaySetu operates as an automated triage tool. This summary provides contextual information under the Advocates Act, 1961 and does not constitute formal legal representation or legal advice. Consult an empanelled District Legal Services Authority advocate for case representation.
                </div>
              </div>
            )}

            {/* TAB 2: PARALEGAL 1-PAGE CASE BRIEF */}
            {activeOutputTab === 'paralegal' && (
              <div style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #222222',
                padding: '32px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '24px',
                  borderBottom: '1px solid #1a1a1a',
                  paddingBottom: '16px'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase' }}>
                      CASE RECORD
                    </span>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                      NS-2026-DEL-{currentCase.id.toUpperCase()}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: isSection12Eligible ? '#ffb829' : '#9a9a9a',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {isSection12Eligible ? 'DLSA LEGAL AID RECOMMENDED' : 'REGULAR CIVIL / CRIMINAL DOCKET'}
                  </div>
                </div>

                {/* Structured Case Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase' }}>CLAIMANT</div>
                    <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '4px' }}>
                      {currentCase.paralegalBrief.parties.claimant}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase' }}>FORUM / VENUE</div>
                    <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '4px' }}>
                      {currentCase.paralegalBrief.courtForum}
                    </div>
                  </div>
                </div>

                {/* Verbatim Source Quotes */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '8px' }}>
                    GROUNDED SOURCE EVIDENCE (OCR EXTRACT):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {currentCase.paralegalBrief.verbatimQuotes.map((q, idx) => (
                      <div key={idx} style={{
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: '#bdbdbd',
                        backgroundColor: '#111111',
                        padding: '8px 12px',
                        borderLeft: '2px solid #8052ff'
                      }}>
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lok Adalat Routing */}
                <div style={{
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#0d1512',
                  border: '1px solid #15846e'
                }}>
                  <div style={{ fontSize: '11px', color: '#15846e', fontWeight: 600, textTransform: 'uppercase' }}>
                    LOK ADALAT / MEDIATION VERDICT: {currentCase.paralegalBrief.lokAdalatVerdict}
                  </div>
                  <div style={{ fontSize: '13px', color: '#ffffff', marginTop: '6px', lineHeight: 1.5 }}>
                    {currentCase.paralegalBrief.lokAdalatReason}
                  </div>
                </div>

                {/* Missing Documents Checklist */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '12px' }}>
                    PARALEGAL INTAKE DOCUMENT CHECKLIST:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentCase.paralegalBrief.checklist.map((doc, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        color: '#bdbdbd'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          border: '1px solid #9a9a9a'
                        }} />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => window.print()}
                  className="btn-primary-pill"
                  style={{ width: '100%' }}
                >
                  Print / Export 1-Page Case Brief
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

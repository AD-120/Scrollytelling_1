import React from 'react';
import { X, Printer, Download, CheckCircle, Building, Compass, Sparkles } from 'lucide-react';
import { PersonaProfile, PersonaType } from '../types';
import { STAKEHOLDER_PERSONAS } from '../services/districtMetrics';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  selectedPersona,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  const currentProfile = STAKEHOLDER_PERSONAS.find((p) => p.id === selectedPersona) || STAKEHOLDER_PERSONAS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAFAFA] border-2 border-[#111111] neo-shadow-lg max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] bg-white p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 border border-[#111111] bg-[#FAFAFA] hover:bg-neutral-200 transition-colors"
              title="סגור חלון"
            >
              <X className="w-4 h-4 text-[#111111]" />
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-[#111111] text-white hover:bg-[#F39C12] hover:text-black border border-[#111111] text-xs font-mono-data flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>הדפסה / שמירה כ-PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-data font-bold bg-[#F39C12] text-black px-2 py-0.5 border border-[#111111]">
              PITCH DECK DOSSIER
            </span>
            <span className="text-sm font-bold font-display text-[#111111]">
              תקציר מנהלים אסטרטגי
            </span>
          </div>
        </div>

        {/* Persona Filter Strip */}
        <div className="flex border-b border-[#111111] bg-neutral-100 p-2 gap-1 overflow-x-auto">
          {STAKEHOLDER_PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p.id)}
              className={`px-3 py-1 text-xs font-mono-data border transition-colors whitespace-nowrap ${
                selectedPersona === p.id
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-800'
              }`}
            >
              {p.labelHe}
            </button>
          ))}
        </div>

        {/* Printable Pitch Deck Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 print:p-0 bg-white" id="pitch-deck-print-area">
          
          {/* Deck Header */}
          <div className="border-b-2 border-[#111111] pb-4">
            <div className="flex items-center justify-between text-xs font-mono-data text-neutral-500 mb-1">
              <span>מהדורת קשרי קהילה ומחקר · אוקטובר 2026</span>
              <span>BEER SHEVA CLIMATE INNOVATION DISTRICT</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-[#111111]">
              רובע החדשנות באר שבע: אקלים ומדבר כמנוף צמיחה
            </h1>
            <p className="text-xs font-mono-data text-[#0055FF] font-semibold mt-1">
              מותאם ייעודית עבור: {currentProfile.labelHe} ({currentProfile.labelEn})
            </p>
          </div>

          {/* Persona Specific Strategic Mandate */}
          <div className="p-4 border border-[#111111] bg-[#FAF8F2] neo-shadow-sm">
            <h3 className="text-sm font-bold font-mono-data text-[#111111] mb-1">
              הייעוד והמיקוד האסטרטגי:
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {currentProfile.roleDescription}
            </p>
          </div>

          {/* Two-Column Grid: Incentives & District Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#111111]">
              <h4 className="text-xs font-bold font-mono-data uppercase text-[#111111] border-b border-neutral-200 pb-1.5 mb-2">
                סל תמריצים והטבות בלעדי
              </h4>
              <ul className="space-y-2 text-xs text-neutral-800">
                {currentProfile.keyIncentives.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#F39C12] font-bold">■</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-[#111111]">
              <h4 className="text-xs font-bold font-mono-data uppercase text-[#111111] border-b border-neutral-200 pb-1.5 mb-2">
                נכסי תשתית ופיילוט ברובע
              </h4>
              <ul className="space-y-2 text-xs text-neutral-800">
                {currentProfile.districtAccess.map((acc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2ECC71] font-bold">■</span>
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantitative ROI Block */}
          <div className="p-4 border-2 border-[#111111] bg-[#F4F9F5]">
            <span className="text-[10px] font-mono-data font-bold text-emerald-800 uppercase block">
              אימפקט כלכלי ומדעי מדיד (ROI Projection)
            </span>
            <div className="text-sm font-bold font-display text-[#111111] mt-1">
              {currentProfile.projectedROI}
            </div>
          </div>

          {/* Tri-Institutional Core Facts */}
          <div className="border border-neutral-200 p-3 bg-neutral-50 text-[11px] font-mono-data text-neutral-600 flex flex-wrap justify-between gap-2">
            <span>• סורוקה: 1,170 מיטות קליניות וניטור אבק רציף</span>
            <span>• אונ׳ בן-גוריון: 14 מעבדות מדבר ומים</span>
            <span>• גב-ים נגב: 70+ חברות טכנולוגיה וסייבר</span>
          </div>

          {/* Institutional Closing & Signatures */}
          <div className="border-t-2 border-[#111111] pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-data">
            <div>
              <span className="text-neutral-500 block">ערוץ התקשרות ישיר:</span>
              <span className="font-bold text-[#0055FF]">{currentProfile.contactDesk}</span>
            </div>
            <div className="text-neutral-500 text-left">
              <span>הנהלת רובע החדשנות באר שבע</span>
              <span className="block text-[10px]">עיריית ב״ש · אונ׳ בן גוריון · מרכז רפואי סורוקה · גב-ים</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

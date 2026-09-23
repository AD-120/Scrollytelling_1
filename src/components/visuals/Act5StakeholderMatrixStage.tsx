import React, { useState } from 'react';
import { STAKEHOLDER_PERSONAS } from '../../services/districtMetrics';
import { PersonaProfile, PersonaType } from '../../types';
import { Users, FileText, CheckCircle2, ArrowUpRight, Award, Compass, Printer, Briefcase } from 'lucide-react';

interface Act5StakeholderMatrixStageProps {
  stepIndex: number;
  onOpenPitchDeckWithPersona: (persona: PersonaType) => void;
}

export const Act5StakeholderMatrixStage: React.FC<Act5StakeholderMatrixStageProps> = ({
  stepIndex,
  onOpenPitchDeckWithPersona,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<PersonaType>('startup');

  const selectedPersona = STAKEHOLDER_PERSONAS.find(p => p.id === selectedPersonaId) || STAKEHOLDER_PERSONAS[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 bg-[#FAFAFA] relative overflow-hidden select-none border border-[#111111]">
      
      {/* Museum Header Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-3 z-10 bg-[#FAFAFA]">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs px-2 py-0.5 bg-[#2ECC71] text-black font-bold">
            FIG. 05
          </span>
          <span className="text-xs uppercase font-mono-data tracking-wider text-[#111111]">
            מטריצת פעולה והתאמת שותפים · בעלי עניין ומקבלי החלטות
          </span>
        </div>

        <button
          onClick={() => onOpenPitchDeckWithPersona(selectedPersonaId)}
          className="px-3 py-1 bg-[#111111] text-white text-xs font-mono-data hover:bg-[#F39C12] hover:text-black border border-[#111111] transition-colors flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>הפקת תקציר מנהלים לפרסונה</span>
        </button>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="relative flex-1 my-3 border border-[#111111] bg-[#F7F6F2] overflow-y-auto p-4 md:p-6">
        
        {/* Persona Selector Tabs */}
        <div className="border border-[#111111] bg-white p-2 neo-shadow-sm mb-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {STAKEHOLDER_PERSONAS.map((persona) => {
              const isSelected = persona.id === selectedPersonaId;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersonaId(persona.id)}
                  className={`p-2.5 text-right border transition-all ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] neo-shadow-sm'
                      : 'bg-[#FAFAFA] text-[#111111] border-neutral-300 hover:border-[#111111]'
                  }`}
                >
                  <div className="text-xs font-bold font-mono-data mb-0.5">
                    [ {persona.labelHe} ]
                  </div>
                  <span className={`text-[10px] block ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {persona.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tailored Persona Dossier Display */}
        <div className="border border-[#111111] bg-white p-5 neo-shadow-sm space-y-4 text-right">
          
          <div className="flex flex-wrap items-center justify-between border-b border-[#111111]/20 pb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono-data text-[#0055FF] uppercase font-bold block">
                פרופיל שותף אסטרטגי
              </span>
              <h3 className="text-lg font-bold font-display text-[#111111]">
                {selectedPersona.labelHe} ({selectedPersona.labelEn})
              </h3>
            </div>

            <span className="text-xs font-mono-data bg-neutral-100 text-neutral-800 px-2 py-1 border border-neutral-300">
              מוקד התקשרות: {selectedPersona.contactDesk}
            </span>
          </div>

          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {selectedPersona.roleDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Incentives Block */}
            <div className="p-3 bg-[#FAFAFA] border border-[#111111]/20">
              <h4 className="text-xs font-bold font-mono-data text-[#111111] mb-2 flex items-center gap-1.5 justify-end">
                <span>חבילת תמריצים בלעדית</span>
                <Award className="w-3.5 h-3.5 text-[#F39C12]" />
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {selectedPersona.keyIncentives.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 justify-end">
                    <span>{item}</span>
                    <span className="text-[#F39C12] font-bold">·</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* District Access Assets Block */}
            <div className="p-3 bg-[#FAFAFA] border border-[#111111]/20">
              <h4 className="text-xs font-bold font-mono-data text-[#111111] mb-2 flex items-center gap-1.5 justify-end">
                <span>נגישות לנכסי הרובע והאקדמיה</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {selectedPersona.districtAccess.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 justify-end">
                    <span>{item}</span>
                    <span className="text-[#2ECC71] font-bold">·</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ROI & Next Steps Callout */}
          <div className="p-3 border-2 border-[#111111] bg-[#FFFBF0] flex flex-col md:flex-row items-center justify-between gap-3 text-right">
            <div>
              <span className="text-[10px] font-mono-data text-amber-800 font-bold block">
                החזר השקעה ואימפקט צפוי (Expected ROI & Impact):
              </span>
              <div className="text-xs font-bold text-[#111111] mt-0.5">
                {selectedPersona.projectedROI}
              </div>
            </div>

            <button
              onClick={() => onOpenPitchDeckWithPersona(selectedPersonaId)}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-mono-data hover:bg-[#F39C12] hover:text-black border border-[#111111] neo-shadow-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 whitespace-nowrap"
            >
              הורדת תקציר מנהלים מלא (PDF / Print)
            </button>
          </div>

        </div>

        {/* Roadmap Timeline Matrix: Enabler vs Operator */}
        <div className="mt-5 border border-[#111111] bg-white p-4 neo-shadow-sm text-right">
          <span className="text-[10px] font-mono-data text-neutral-500 uppercase block">מודל ניהול אסטרטגי</span>
          <h4 className="text-sm font-bold font-mono-data text-[#111111] mb-3">
            חלוקת האחריות: העירייה כמאפשרת (Enabler) לעומת העירייה כמפעילה (Operator)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 border border-neutral-300 bg-neutral-50">
              <span className="font-bold text-[#0055FF] font-mono-data block mb-1">
                העירייה כמאפשרת (The Municipality as Enabler)
              </span>
              <ul className="space-y-1 text-neutral-600">
                <li>• ארגז חול רגולטורי לפיילוטים תוך 21 יום</li>
                <li>• פתיחת מאגרי נתוני אקלים עירוניים (Open Data)</li>
                <li>• הקלות והתאמות סטטוטוריות לבניה ביו-אקלימית</li>
              </ul>
            </div>

            <div className="p-3 border border-neutral-300 bg-neutral-50">
              <span className="font-bold text-[#2ECC71] font-mono-data block mb-1">
                העירייה כמפעילה (The Municipality as Operator)
              </span>
              <ul className="space-y-1 text-neutral-600">
                <li>• הקמת רשת הצללה רציפה ותחזוקת מיקרו-אקלים</li>
                <li>• ניהול מערך District Cooling וחיבורי חשמל ירוק</li>
                <li>• רכש מקומי מועדף ממיזמים שהוכיחו הצלחה ברובע</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="border border-[#111111] bg-white p-3 neo-shadow-sm z-10 flex flex-wrap items-center justify-between gap-3 text-right">
        <span className="text-xs font-mono-data font-bold text-[#111111]">
          מנהלת רובע החדשנות באר שבע · רחוב הנרייטה סולד, באר שבע
        </span>
        <div className="text-xs font-mono-data text-neutral-500">
          בשיתוף עיריית באר שבע, אוניברסיטת בן-גוריון, מרכז רפואי סורוקה ופארק גב-ים נגב
        </div>
      </div>

    </div>
  );
};

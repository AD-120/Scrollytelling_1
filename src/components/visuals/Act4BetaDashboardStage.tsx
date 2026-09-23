import React, { useState } from 'react';
import { CALLS_FOR_PROPOSALS, calculateSolarPotential } from '../../services/districtMetrics';
import { CallForProposal } from '../../types';
import { Sun, Zap, Leaf, Coins, Filter, Send, CheckCircle2, ChevronLeft, Building2 } from 'lucide-react';

interface Act4BetaDashboardStageProps {
  stepIndex: number;
  onOpenProposal: (proposal: CallForProposal) => void;
}

export const Act4BetaDashboardStage: React.FC<Act4BetaDashboardStageProps> = ({
  stepIndex,
  onOpenProposal,
}) => {
  // Rooftop area state in square meters
  const [rooftopM2, setRooftopM2] = useState<number>(12500);
  const [activeTab, setActiveTab] = useState<'solar' | 'proposals'>('solar');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  // Compute live solar stats
  const solarMetrics = calculateSolarPotential(rooftopM2);

  // Filter proposals
  const filteredProposals = selectedDomain === 'all'
    ? CALLS_FOR_PROPOSALS
    : CALLS_FOR_PROPOSALS.filter(p => p.domain.toLowerCase().includes(selectedDomain.toLowerCase()));

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 bg-[#FAFAFA] relative overflow-hidden select-none border border-[#111111]">
      
      {/* Museum Header Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-3 z-10 bg-[#FAFAFA]">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs px-2 py-0.5 bg-[#F39C12] text-black font-bold">
            FIG. 04
          </span>
          <span className="text-xs uppercase font-mono-data tracking-wider text-[#111111]">
            דשבורד אתר בטא חי · סימולטור סולארי ומאגר קולות קוראים
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-white border border-[#111111] p-0.5 text-xs font-mono-data">
          <button
            onClick={() => setActiveTab('solar')}
            className={`px-3 py-1 transition-colors ${
              activeTab === 'solar' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'
            }`}
          >
            מחשבון פוטנציאל סולארי
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-3 py-1 transition-colors ${
              activeTab === 'proposals' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'
            }`}
          >
            קולות קוראים ופיילוטים ({CALLS_FOR_PROPOSALS.length})
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="relative flex-1 my-3 border border-[#111111] bg-[#F7F6F2] overflow-y-auto p-4 md:p-6">
        
        {activeTab === 'solar' ? (
          <div className="space-y-6 max-w-2xl mx-auto">
            
            {/* Header Description & Hero Inset */}
            <div className="flex flex-col md:flex-row gap-4 items-start border border-[#111111] bg-white p-4 neo-shadow-sm">
              <div className="w-full md:w-44 h-28 shrink-0 border border-[#111111] overflow-hidden">
                <img
                  src="/src/assets/images/beersheva_solar_lab_1790172913615.jpg"
                  alt="Solar Testbed Beer Sheva"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-120"
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono-data text-neutral-500 uppercase block">מודל חיזוי אנרגטי · באר שבע</span>
                <h4 className="text-base font-bold font-display text-[#111111]">
                  מחשבון הספק סולארי וחיסכון פחמני
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  הנגב מאופיין בכ-2,050 שעות שמש אפקטיביות בשנה. התאימו את שטח הגגות והחניונים הפנויים ברובע לבחינת התפוקה המצטברת.
                </p>
              </div>
            </div>

            {/* Interactive Area Slider */}
            <div className="border border-[#111111] bg-white p-5 neo-shadow-sm text-right">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold font-mono-data text-[#111111]">
                  {rooftopM2.toLocaleString('he-IL')} מ״ר
                </span>
                <label className="text-xs font-mono-data font-semibold text-neutral-700">
                  שטח גגות וחניונים מוקצים להצללה סולארית:
                </label>
              </div>

              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={rooftopM2}
                onChange={(e) => setRooftopM2(Number(e.target.value))}
                className="w-full h-3 bg-neutral-200 border border-[#111111] accent-[#F39C12] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono-data text-neutral-500 mt-2">
                <span>1,000 מ״ר (מבנה ציבור יחיד)</span>
                <span>25,000 מ״ר (מתחם אוניברסיטאי)</span>
                <span>50,000 מ״ר (כלל הרובע)</span>
              </div>
            </div>

            {/* 4 Computed Metrics Output Cards */}
            <div className="grid grid-cols-2 gap-3 text-right">
              
              <div className="p-4 bg-white border border-[#111111] neo-shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <Zap className="w-4 h-4 text-[#F39C12]" />
                  <span className="text-xs font-mono-data">הספק שיא מותקן (kWp)</span>
                </div>
                <div className="text-2xl font-bold font-mono-data text-[#111111]">
                  {solarMetrics.kwPeak.toLocaleString('he-IL')} kWp
                </div>
                <span className="text-[10px] text-neutral-500 font-mono-data block mt-1">
                  מבוסס על נצילות פאנל של 21%
                </span>
              </div>

              <div className="p-4 bg-white border border-[#111111] neo-shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-mono-data">ייצור חשמל שנתי</span>
                </div>
                <div className="text-2xl font-bold font-mono-data text-[#111111]">
                  {(solarMetrics.annualKwh / 1000000).toFixed(2)} MWh
                </div>
                <span className="text-[10px] text-neutral-500 font-mono-data block mt-1">
                  {solarMetrics.annualKwh.toLocaleString('he-IL')} קוט״ש לשנה
                </span>
              </div>

              <div className="p-4 bg-white border border-[#111111] neo-shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <Leaf className="w-4 h-4 text-[#2ECC71]" />
                  <span className="text-xs font-mono-data">קיזוז פליטות פחמן שנתי</span>
                </div>
                <div className="text-2xl font-bold font-mono-data text-[#2ECC71]">
                  {solarMetrics.co2OffsetTons.toLocaleString('he-IL')} טון
                </div>
                <span className="text-[10px] text-neutral-500 font-mono-data block mt-1">
                  שווה ערך לנטיעת {Math.round(solarMetrics.co2OffsetTons * 45).toLocaleString('he-IL')} עצים
                </span>
              </div>

              <div className="p-4 bg-white border border-[#111111] neo-shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-mono-data">חיסכון כלכלי עירוני ישיר</span>
                </div>
                <div className="text-2xl font-bold font-mono-data text-emerald-700">
                  ₪{solarMetrics.annualSavingsShekels.toLocaleString('he-IL')}
                </div>
                <span className="text-[10px] text-neutral-500 font-mono-data block mt-1">
                  לפי תעריף משולב ממוצע של 52 אג׳ לקוט״ש
                </span>
              </div>

            </div>

          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            
            {/* Domain Filter Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#111111] pb-3 text-right">
              <div className="text-xs font-mono-data text-neutral-600">
                הצגת {filteredProposals.length} קולות קוראים ומסלולי ניסויי שטח פתוחים
              </div>

              <div className="flex items-center gap-1">
                {['all', 'Shading', 'Dust', 'Solar', 'Health'].map((domainKey) => (
                  <button
                    key={domainKey}
                    onClick={() => setSelectedDomain(domainKey)}
                    className={`px-2 py-1 text-xs font-mono-data border border-[#111111] transition-colors ${
                      selectedDomain === domainKey
                        ? 'bg-[#111111] text-white'
                        : 'bg-white hover:bg-neutral-100 text-[#111111]'
                    }`}
                  >
                    {domainKey === 'all' ? 'הכל' : domainKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Proposal Cards Stream */}
            <div className="space-y-3">
              {filteredProposals.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#111111] bg-white p-4 neo-shadow-sm hover:neo-shadow transition-all text-right"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono-data font-bold px-2 py-0.5 border border-[#111111] ${
                        item.stage === 'Open Call'
                          ? 'bg-[#2ECC71] text-black'
                          : item.stage === 'Field Validation'
                          ? 'bg-[#F39C12] text-black'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {item.stage}
                    </span>
                    <span className="text-xs font-mono-data text-neutral-500">
                      מועד אחרון: {item.deadline}
                    </span>
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-[#111111] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 pt-2">
                    <div className="text-xs font-mono-data text-[#0055FF] font-semibold">
                      מימון: {item.budgetMatch}
                    </div>

                    <button
                      onClick={() => onOpenProposal(item)}
                      className="px-3 py-1 bg-[#111111] text-white text-xs font-mono-data hover:bg-[#F39C12] hover:text-black border border-[#111111] transition-colors flex items-center gap-1"
                    >
                      <span>פרטי הקול הקורא</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Beta Site Operating Principle Footer */}
      <div className="border border-[#111111] bg-white p-3 neo-shadow-sm z-10 flex flex-wrap items-center justify-between gap-3 text-right">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2ECC71]" />
          <span className="text-xs font-bold font-mono-data text-[#111111]">
            רגולציה מאפשרת (Fast-Track Regulatory Sandbox)
          </span>
        </div>
        <p className="text-xs text-neutral-600 font-mono-data">
          אישור עירוני תוך 21 יום · גישה לתשתיות ציבוריות · חיבור ישיר לחוקרי בן-גוריון וסורוקה
        </p>
      </div>

    </div>
  );
};

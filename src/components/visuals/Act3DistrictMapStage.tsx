import React, { useState, useEffect } from 'react';
import { DISTRICT_HOTSPOTS } from '../../services/districtMetrics';
import { DistrictHotspot } from '../../types';
import {
  MapPin,
  Activity,
  Building,
  Award,
  ArrowUpRight,
  Compass,
  ShieldCheck,
  X,
  Minimize2,
  Maximize2,
  ArrowLeftRight,
  Eye,
  Info
} from 'lucide-react';

interface Act3DistrictMapStageProps {
  stepIndex: number;
}

export const Act3DistrictMapStage: React.FC<Act3DistrictMapStageProps> = ({ stepIndex }) => {
  // Default active hotspot based on card or user click
  const [selectedHotspot, setSelectedHotspot] = useState<DistrictHotspot>(DISTRICT_HOTSPOTS[0]);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Controls to hide / move the detail card so it never obscures the map
  const [isCardVisible, setIsCardVisible] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [cardSide, setCardSide] = useState<'right' | 'left'>('right');

  // Sync with scroll steps: step 0 -> Soroka/BGU, step 1 -> Gav-Yam / Sandboxes
  useEffect(() => {
    if (stepIndex === 0) {
      setSelectedHotspot(DISTRICT_HOTSPOTS[0]); // Soroka Medical
    } else {
      setSelectedHotspot(DISTRICT_HOTSPOTS[2]); // Gav-Yam Tech Park
    }
  }, [stepIndex]);

  const handleSelectHotspot = (spot: DistrictHotspot) => {
    setSelectedHotspot(spot);
    setIsCardVisible(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 bg-[#FAFAFA] relative overflow-hidden select-none border border-[#111111]">
      
      {/* Museum Header Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-3 z-10 bg-[#FAFAFA]">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs px-2 py-0.5 bg-[#0055FF] text-white font-bold">
            FIG. 03
          </span>
          <span className="text-xs uppercase font-mono-data tracking-wider text-[#111111]">
            מפת המערכת המרחבית · המשולש המוסדי של באר שבע
          </span>
        </div>

        {/* Hotspot Quick Select Tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-white border border-[#111111] p-0.5 text-xs font-mono-data">
          {DISTRICT_HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSelectHotspot(spot)}
              className={`px-2 py-0.5 transition-colors whitespace-nowrap ${
                selectedHotspot.id === spot.id
                  ? 'bg-[#111111] text-white'
                  : 'hover:bg-neutral-100 text-[#111111]'
              }`}
            >
              {spot.titleHe.split(' ')[0]} {spot.titleHe.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Vector Map Container */}
      <div className="relative flex-1 my-3 border border-[#111111] bg-[#F3EFE6] overflow-hidden">
        
        {/* Subtle Architectural Underlay Blueprint Grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 650" preserveAspectRatio="none">
          <defs>
            <pattern id="arch-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />

          {/* Railway Corridor (Separating BGU from Gav-Yam Tech Park) */}
          <line x1="680" y1="0" x2="680" y2="650" stroke="#111111" strokeWidth="4" strokeDasharray="12 6" />
          <text x="660" y="30" fill="#111111" fontSize="11" fontFamily="JetBrains Mono" transform="rotate(-90 660,30)" opacity="0.6">
            מסילת הרכבת ת״א-ב״ש צפון
          </text>

          {/* Bioclimatic Pedestrian Bridge spanning the tracks */}
          <path
            d="M 540 280 L 740 230"
            fill="none"
            stroke="#2ECC71"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <text x="575" y="240" fill="#111111" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            גשר הולכי הרגל הממוזג
          </text>

          {/* Inter-institutional Collaboration Vector Triangles */}
          <polygon
            points="280,240 520,330 750,210"
            fill="#0055FF"
            fillOpacity="0.08"
            stroke="#0055FF"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* Arterial Pedestrian & Solar Canopy Corridors */}
          <path d="M 280 240 Q 400 320 520 330" fill="none" stroke="#F39C12" strokeWidth="3" strokeDasharray="4 2" />
          <path d="M 520 330 Q 640 270 750 210" fill="none" stroke="#F39C12" strokeWidth="3" strokeDasharray="4 2" />
          <path d="M 420 480 L 520 330" fill="none" stroke="#2ECC71" strokeWidth="2" strokeDasharray="3 3" />
        </svg>

        {/* Hotspot Markers placed accurately on top of map */}
        {DISTRICT_HOTSPOTS.map((spot) => {
          const isSelected = selectedHotspot.id === spot.id;
          const isHov = isHovered === spot.id;

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-200"
              onClick={() => handleSelectHotspot(spot)}
              onMouseEnter={() => setIsHovered(spot.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {/* Radar Ping Animation for selected node */}
              {isSelected && (
                <span className="absolute -inset-4 rounded-full bg-[#0055FF]/20 animate-ping pointer-events-none" />
              )}

              {/* Node Marker Box */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#111111] transition-all font-mono-data text-xs ${
                  isSelected
                    ? 'bg-[#111111] text-white neo-shadow-sm scale-110'
                    : isHov
                    ? 'bg-[#F39C12] text-black neo-shadow-sm'
                    : 'bg-white text-[#111111]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    spot.type === 'medical'
                      ? 'bg-red-500'
                      : spot.type === 'academia'
                      ? 'bg-blue-600'
                      : spot.type === 'industry'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />
                <span className="font-bold whitespace-nowrap">{spot.titleHe.split(' ')[0]} {spot.titleHe.split(' ')[1] || ''}</span>
              </div>
            </div>
          );
        })}

        {/* Integrated Night Photograph Inset of Campus & High-Tech Bridge */}
        <div className={`hidden lg:block absolute bottom-3 ${cardSide === 'left' ? 'right-3' : 'left-3'} w-48 h-32 border border-[#111111] bg-white p-1 neo-shadow-sm z-10 transition-all`}>
          <img
            src="/src/assets/images/beersheva_campus_night_1790172902099.jpg"
            alt="Gav Yam Negev & BGU Night View"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-[9px] font-mono-data text-white px-1">
            גב-ים נגב וגשר האוניברסיטה בלילה
          </div>
        </div>

        {/* Floating reopen button when card is hidden */}
        {!isCardVisible && (
          <div className={`absolute top-3 ${cardSide === 'right' ? 'right-3' : 'left-3'} z-20 flex items-center gap-2`}>
            <button
              onClick={() => setIsCardVisible(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/95 border-2 border-[#111111] neo-shadow hover:bg-[#F39C12] hover:text-black transition-all text-xs font-mono-data font-bold"
              title="לחץ לפתיחת כרטיס המידע על המוקד"
            >
              <Info className="w-3.5 h-3.5 text-[#0055FF]" />
              <span>פרטי מוקד: {selectedHotspot.titleHe.split(' ')[0]} {selectedHotspot.titleHe.split(' ')[1] || ''}</span>
              <Eye className="w-3.5 h-3.5 text-neutral-600 mr-1" />
            </button>
            
            <button
              onClick={() => setCardSide(cardSide === 'right' ? 'left' : 'right')}
              className="p-1.5 bg-white/95 border-2 border-[#111111] neo-shadow hover:bg-neutral-100 transition-colors"
              title={`העבר צד ל-${cardSide === 'right' ? 'שמאל' : 'ימין'}`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#111111]" />
            </button>
          </div>
        )}

        {/* Detail Telemetry Callout Card for the Selected Hotspot (Moveable & Hideable) */}
        {isCardVisible && (
          <div
            className={`absolute top-3 ${
              cardSide === 'right' ? 'right-3' : 'left-3'
            } max-w-sm w-80 bg-white/95 border-2 border-[#111111] p-3.5 neo-shadow z-20 text-right transition-all duration-200`}
          >
            {/* Header with window controls */}
            <div className="flex items-center justify-between border-b border-[#111111]/20 pb-2 mb-2 gap-1">
              <div className="flex items-center gap-1">
                {/* Close / Hide button */}
                <button
                  onClick={() => setIsCardVisible(false)}
                  className="p-1 border border-[#111111] bg-white hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="הסתר כרטיס לפינוי תצוגת המפה"
                >
                  <X className="w-3 h-3 text-[#111111]" />
                </button>

                {/* Minimize / Expand button */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1 border border-[#111111] bg-white hover:bg-neutral-100 transition-colors"
                  title={isCollapsed ? 'הרחב פרטים מלאים' : 'מזער כרטיס'}
                >
                  {isCollapsed ? <Maximize2 className="w-3 h-3 text-[#111111]" /> : <Minimize2 className="w-3 h-3 text-[#111111]" />}
                </button>

                {/* Move side button */}
                <button
                  onClick={() => setCardSide(cardSide === 'right' ? 'left' : 'right')}
                  className="px-1.5 py-1 border border-[#111111] bg-white hover:bg-neutral-100 text-[10px] font-mono-data flex items-center gap-1 transition-colors"
                  title={`העבר לצד ${cardSide === 'right' ? 'שמאל' : 'ימין'} כדי לא להסתיר את המפה`}
                >
                  <ArrowLeftRight className="w-3 h-3 text-[#111111]" />
                  <span>העבר צד</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-data text-neutral-500">
                  מוקד נבחר
                </span>
                <span className="text-[10px] font-mono-data uppercase bg-[#111111] text-white px-1.5 py-0.5">
                  {selectedHotspot.type.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Title always visible */}
            <h4 className="text-base font-bold font-display text-[#111111]">
              {selectedHotspot.titleHe}
            </h4>

            {/* Collapsed view summary */}
            {isCollapsed ? (
              <div className="mt-1 flex items-center justify-between pt-1 border-t border-neutral-200">
                <span className="text-[11px] font-mono-data text-[#0055FF] font-semibold truncate">
                  {selectedHotspot.liveMetric}
                </span>
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="text-[10px] font-mono-data underline text-neutral-600 hover:text-black mr-2 whitespace-nowrap"
                >
                  הרחב פרטים
                </button>
              </div>
            ) : (
              /* Expanded view */
              <>
                <span className="text-[11px] font-mono-data text-neutral-500 block mb-2">
                  {selectedHotspot.titleEn}
                </span>

                <p className="text-xs text-[#111111] leading-relaxed mb-3">
                  {selectedHotspot.description}
                </p>

                <div className="p-2 bg-[#FAFAFA] border border-[#111111]/20 mb-3 text-right">
                  <span className="text-[10px] font-mono-data text-neutral-500 block">מדד חי מהשטח:</span>
                  <div className="text-xs font-bold font-mono-data text-[#0055FF]">
                    {selectedHotspot.liveMetric}
                  </div>
                </div>

                <div className="border-t border-[#111111]/20 pt-2">
                  <span className="text-[10px] font-mono-data text-neutral-500 block mb-1">שותפי סינרגיה ישירים:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedHotspot.synergyPartners.map((partner, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono-data bg-neutral-100 text-neutral-800 px-1.5 py-0.5 border border-neutral-300"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

      </div>

      {/* Institutional Synergies Summary Strip */}
      <div className="border border-[#111111] bg-white p-3 neo-shadow-sm z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <div className="flex items-center gap-1 text-red-600 font-mono-data text-xs font-bold mb-0.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>סורוקה (רפואה ואקלים)</span>
            </div>
            <p className="text-[11px] text-neutral-600">
              ניטור השפעות אבק וחום קיצוני על בריאות הציבור ומאגר נתונים קליניים.
            </p>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <div className="flex items-center gap-1 text-blue-600 font-mono-data text-xs font-bold mb-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>אוניברסיטת בן-גוריון</span>
            </div>
            <p className="text-[11px] text-neutral-600">
              מחקר תיאורטי ויישומי במדעי המדבר, אנרגיה סולארית והנדסת מים.
            </p>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <div className="flex items-center gap-1 text-amber-600 font-mono-data text-xs font-bold mb-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>פארק גב-ים נגב</span>
            </div>
            <p className="text-[11px] text-neutral-600">
              מסחור טכנולוגיות, שיתופי פעולה עם תאגידים בינלאומיים וקרנות הון סיכון.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

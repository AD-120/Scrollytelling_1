import React, { useState } from 'react';
import { Sliders, Sun, Shield, Wind, Thermometer, Eye, Sparkles } from 'lucide-react';

interface Act2MicroclimateSplitStageProps {
  stepIndex: number;
}

export const Act2MicroclimateSplitStage: React.FC<Act2MicroclimateSplitStageProps> = ({ stepIndex }) => {
  // Slider position from 0 (all unshaded) to 100 (all shaded canopy)
  const [splitPos, setSplitPos] = useState<number>(55);
  const [activePreset, setActivePreset] = useState<'noon' | 'afternoon' | 'night'>('noon');

  // Computed thermal values based on slider
  const surfaceTemp = Math.round(58 - (splitPos / 100) * 24); // 58°C down to 34°C
  const airTemp = (39 - (splitPos / 100) * 8.5).toFixed(1); // 39°C down to 30.5°C
  const perceivedTempDelta = Math.round((splitPos / 100) * 11); // 0°C to -11°C drop

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 bg-[#FAFAFA] relative overflow-hidden select-none border border-[#111111]">
      
      {/* Museum Header Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-3 z-10 bg-[#FAFAFA]">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs px-2 py-0.5 bg-[#2ECC71] text-black font-bold">
            FIG. 02
          </span>
          <span className="text-xs uppercase font-mono-data tracking-wider text-[#111111]">
            סימולציית מיקרו-אקלים ביו-אקלימי · Shaded Canopy vs. Desert Exposure
          </span>
        </div>

        {/* Sun Elevation Preset Buttons */}
        <div className="flex items-center gap-1 bg-white border border-[#111111] p-0.5 text-xs font-mono-data">
          <button
            onClick={() => { setActivePreset('noon'); setSplitPos(60); }}
            className={`px-2 py-0.5 transition-colors ${activePreset === 'noon' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
          >
            13:00 שיא חום
          </button>
          <button
            onClick={() => { setActivePreset('afternoon'); setSplitPos(75); }}
            className={`px-2 py-0.5 transition-colors ${activePreset === 'afternoon' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
          >
            16:30 זווית שמש נמוכה
          </button>
          <button
            onClick={() => { setActivePreset('night'); setSplitPos(40); }}
            className={`px-2 py-0.5 transition-colors ${activePreset === 'night' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
          >
            21:00 פליטה לילית
          </button>
        </div>
      </div>

      {/* Main Interactive Split Container */}
      <div className="relative flex-1 my-3 border border-[#111111] overflow-hidden bg-[#ECE8DF]">
        
        {/* Underlayer: Unshaded Raw Desert Condition */}
        <div className="absolute inset-0 flex">
          {/* Desert Sun Exposure Side */}
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-bl from-amber-100 via-orange-50 to-neutral-200 flex items-center justify-center">
            
            {/* Heat Mirage Waves Effect */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#F39C12_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Direct Solar Glare Badge */}
            <div className="absolute top-6 left-6 p-3 bg-white/95 border border-[#111111] neo-shadow-sm text-left max-w-[200px]">
              <div className="flex items-center gap-1.5 text-amber-700 font-mono-data text-xs font-bold">
                <Sun className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '18s' }} />
                <span>UNSHADED EXPOSURE</span>
              </div>
              <div className="mt-1 text-2xl font-bold font-mono-data text-red-600">
                58°C
              </div>
              <span className="text-[10px] text-neutral-600 font-mono-data block">טמפ׳ אספלט חשוף</span>
              <span className="text-[10px] text-red-700 font-mono-data font-bold block mt-1">עקת חום קיצונית (PET 44°C)</span>
            </div>

            {/* Visual Vector: Sun Rays striking unprotected pedestrian ground */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="10%" y1="0%" x2="40%" y2="100%" stroke="#E67E22" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="25%" y1="0%" x2="55%" y2="100%" stroke="#E67E22" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="40%" y1="0%" x2="70%" y2="100%" stroke="#E67E22" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="28%" cy="12%" r="28" fill="#F39C12" fillOpacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Overlayer: Shaded Bioclimatic Canopy (Clipped by splitPos) */}
        <div 
          className="absolute inset-y-0 right-0 overflow-hidden border-l-2 border-[#111111] bg-neutral-900 transition-all duration-75"
          style={{ width: `${splitPos}%` }}
        >
          {/* Canopy Photographic Texture */}
          <div className="absolute inset-0 right-0 w-full h-full min-w-[700px]">
            <img
              src="/src/assets/images/beersheva_canopy_1790172889737.jpg"
              alt="Beer Sheva Bioclimatic Shading Canopy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90"
            />
            {/* Green Bioclimatic tint scrim */}
            <div className="absolute inset-0 bg-[#2ECC71]/15 mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Shaded Canopy Metrics Badge */}
          <div className="absolute top-6 right-6 p-3 bg-white/95 border border-[#111111] neo-shadow-sm text-right max-w-[210px] z-10">
            <div className="flex items-center gap-1.5 text-emerald-700 font-mono-data text-xs font-bold justify-end">
              <span>חופת צל ביו-אקלימית</span>
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono-data text-emerald-600">
              34°C
            </div>
            <span className="text-[10px] text-neutral-600 font-mono-data block">טמפ׳ מדרכה מוצלת</span>
            <div className="text-[10px] text-emerald-800 font-mono-data font-bold mt-1 bg-emerald-50 px-1 py-0.5 border border-emerald-300">
              הפחתת עומס תחושתי: -11°C
            </div>
          </div>

          {/* Air Flow Channel Vectors */}
          <div className="absolute bottom-6 right-6 z-10 text-white font-mono-data text-xs bg-black/75 p-2 border border-white/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-300 mb-0.5">
              <Wind className="w-3.5 h-3.5 animate-pulse" />
              <span>תיעול רוח מדברית: 14 קמ״ש</span>
            </div>
            <span className="text-[11px] text-neutral-300">הצללה סולארית + פליטה תרמית לילית</span>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div 
          className="absolute inset-y-0 flex items-center justify-center pointer-events-none z-30"
          style={{ right: `calc(${splitPos}% - 14px)` }}
        >
          <div className="w-7 h-14 bg-[#111111] border-2 border-white text-white flex flex-col items-center justify-center gap-1 shadow-md cursor-ew-resize">
            <span className="text-[8px] font-mono-data">◄</span>
            <span className="text-[8px] font-mono-data">►</span>
          </div>
        </div>

        {/* Interactive Range Input Overlay (Full hit area) */}
        <input
          type="range"
          min="10"
          max="90"
          value={splitPos}
          onChange={(e) => setSplitPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
          aria-label="השוואת מיקרו-אקלים בין שטח חשוף לחופת צל"
        />

        {/* Instruction pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 border border-[#111111] px-3 py-1 neo-shadow-sm text-xs font-mono-data text-[#111111] pointer-events-none whitespace-nowrap">
          גררו ימינה / שמאלה להשוואת השפעת ההצללה הביו-אקלימית
        </div>
      </div>

      {/* Dynamic Thermal Comparison Dashboard Footer */}
      <div className="border border-[#111111] bg-white p-3 md:p-4 neo-shadow-sm z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-[#111111]/20 pb-2 mb-2 gap-2">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#F39C12]" />
            <span className="text-xs font-bold font-mono-data uppercase text-[#111111]">
              מטריצת תועלת מיקרו-אקלימית (חישוב שטח הרובע)
            </span>
          </div>
          <span className="text-xs font-mono-data text-neutral-500">
            כיסוי הצללה נוכחי בסימולציה: {splitPos}%
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-right">
          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">טמפ׳ פני מדרכה ממוצעת</span>
            <div className="text-xl font-bold font-mono-data text-[#111111]">
              {surfaceTemp}°C
            </div>
            <span className="text-[10px] text-emerald-700 font-mono-data block">ירידה של עד 24°C מהאספלט</span>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">טמפרטורת אוויר (גובה 1.5 מ׳)</span>
            <div className="text-xl font-bold font-mono-data text-[#111111]">
              {airTemp}°C
            </div>
            <span className="text-[10px] text-neutral-500 font-mono-data block">בהשוואה ל-39°C ללא הצללה</span>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">הפחתת עומס תחושתי (PET)</span>
            <div className="text-xl font-bold font-mono-data text-emerald-600">
              -{perceivedTempDelta}°C
            </div>
            <span className="text-[10px] text-emerald-800 font-mono-data block">הארכת שעות פעילות הולכי רגל</span>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">חיסכון שנתי במיזוג מבנים צמודים</span>
            <div className="text-xl font-bold font-mono-data text-[#F39C12]">
              {Math.round((splitPos / 100) * 28)}%
            </div>
            <span className="text-[10px] text-neutral-500 font-mono-data block">צמצום תופעת "אי חום עירוני"</span>
          </div>
        </div>
      </div>

    </div>
  );
};

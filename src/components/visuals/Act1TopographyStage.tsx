import React, { useState, useEffect } from 'react';
import { RefreshCw, Wind, Sun, AlertTriangle, Compass, Eye } from 'lucide-react';
import { getLiveDistrictMetrics } from '../../services/districtMetrics';
import { DistrictMetrics } from '../../types';

interface Act1TopographyStageProps {
  stepIndex: number;
}

export const Act1TopographyStage: React.FC<Act1TopographyStageProps> = ({ stepIndex }) => {
  const [metrics, setMetrics] = useState<DistrictMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'mixed' | 'photo' | 'contours'>('mixed');
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await getLiveDistrictMetrics();
      // Add slight jitter for realism
      const tempJitter = (Math.random() * 0.8 - 0.4).toFixed(1);
      const tempVal = (34 + parseFloat(tempJitter)).toFixed(1);
      setMetrics({
        ...data,
        temperature: `${tempVal}°C`,
        solarIrradiance: `${Math.round(870 + Math.random() * 25)} W/m²`,
        lastUpdated: new Date().toLocaleTimeString('he-IL')
      });
      setLastRefreshed(new Date().toLocaleTimeString('he-IL'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 bg-[#F5F4EF] relative overflow-hidden select-none border border-[#111111]">
      
      {/* Museum Header Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-3 z-10 bg-[#F5F4EF]">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs px-2 py-0.5 bg-[#111111] text-white font-bold">
            FIG. 01
          </span>
          <span className="text-xs uppercase font-mono-data tracking-wider text-[#111111]">
            נפת באר שבע · 31.2529° N, 34.7915° E · גובה 260 מ׳
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-[#111111] p-0.5 text-xs font-mono-data">
            <button
              onClick={() => setViewMode('mixed')}
              className={`px-2 py-0.5 transition-colors ${viewMode === 'mixed' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
            >
              שכבות
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`px-2 py-0.5 transition-colors ${viewMode === 'photo' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
            >
              צילום שטח
            </button>
            <button
              onClick={() => setViewMode('contours')}
              className={`px-2 py-0.5 transition-colors ${viewMode === 'contours' ? 'bg-[#111111] text-white' : 'hover:bg-neutral-100 text-[#111111]'}`}
            >
              טופוגרפיה
            </button>
          </div>
          
          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="p-1.5 border border-[#111111] bg-white hover:bg-[#F39C12] transition-colors"
            title="עדכן נתוני סנסורים חיים"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#111111] ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Visual Stage Area */}
      <div className="relative flex-1 my-3 border border-[#111111] bg-[#EFECE4] overflow-hidden flex items-center justify-center">
        
        {/* Background Desert Photographic Canvas */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${
            viewMode === 'contours' ? 'opacity-0' : viewMode === 'photo' ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <img
            src="/src/assets/images/beersheva_desert_hero_1790172875779.jpg"
            alt="Beer Sheva Desert Pavilion Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-115 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-[#F39C12]/10 mix-blend-color-burn" />
        </div>

        {/* Topographic Contour Vectors Overlay */}
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
            viewMode === 'photo' ? 'opacity-10' : 'opacity-85'
          }`}
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
        >
          {/* Architectural Grid Lines */}
          <defs>
            <pattern id="grid-act1" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-act1)" />

          {/* Elevation Contours (Topography of northern Negev / Wadi Be'er Sheva) */}
          <path
            d="M -50 180 Q 200 120 400 190 T 850 140"
            fill="none"
            stroke="#111111"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
          <path
            d="M -50 260 Q 180 210 380 280 T 850 220"
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M -50 340 Q 240 290 420 370 T 850 310"
            fill="none"
            stroke="#F39C12"
            strokeWidth="2"
          />
          <path
            d="M -50 420 Q 160 370 390 460 T 850 390"
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M -50 500 Q 220 450 440 540 T 850 480"
            fill="none"
            stroke="#111111"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Sun Vector Indicator */}
          <circle cx="710" cy="90" r="40" fill="#F39C12" fillOpacity="0.25" stroke="#F39C12" strokeWidth="1.5" />
          <circle cx="710" cy="90" r="14" fill="#F39C12" stroke="#111111" strokeWidth="1.5" />
          <line x1="710" y1="90" x2="620" y2="180" stroke="#F39C12" strokeWidth="2" strokeDasharray="4 2" />
          <text x="635" y="195" fill="#111111" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
            קרינה: 880 W/m²
          </text>

          {/* District Boundary Box */}
          <rect
            x="220"
            y="210"
            width="340"
            height="210"
            fill="#FAFAFA"
            fillOpacity="0.45"
            stroke="#111111"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <text x="235" y="235" fill="#111111" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            רובע החדשנות (מתחם BGU - סורוקה - גב ים)
          </text>
          <circle cx="390" cy="315" r="5" fill="#0055FF" stroke="#111111" strokeWidth="1.5" />
          <text x="405" y="320" fill="#111111" fontSize="10" fontFamily="JetBrains Mono">
            תחנת דגימה ראשית #01
          </text>
        </svg>

        {/* Dynamic Context Badge based on stepIndex */}
        <div className="absolute bottom-4 right-4 z-20 max-w-xs bg-white/95 border border-[#111111] p-3 neo-shadow-sm text-right">
          <div className="flex items-center gap-2 text-[#F39C12] mb-1 font-mono-data text-xs font-bold">
            <Sun className="w-3.5 h-3.5" />
            <span>תנאי מדבר קיצון: שלב {stepIndex + 1} מתוך 2</span>
          </div>
          <p className="text-xs text-[#111111] leading-relaxed">
            {stepIndex === 0
              ? 'מדבור גלובלי מואץ: באר שבע מתפקדת כמעבדת שטח טבעית ל-40% משטח כדור הארץ.'
              : 'ריכוז של 14 מעבדות שטח פעילות ו-3 מתקני סימולציה סולארית ברדיוס הליכה אחד.'}
          </p>
        </div>
      </div>

      {/* Live Environmental Sensor Museum Label Widget (API Placeholder) */}
      <div className="border border-[#111111] bg-white p-3 md:p-4 neo-shadow-sm z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-[#111111]/20 pb-2 mb-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
            <span className="text-xs font-bold font-mono-data uppercase text-[#111111]">
              חיישני סביבה חיים · מרכז הרובע
            </span>
          </div>
          <div className="text-xs font-mono-data text-neutral-500">
            עדכון אחרון: {metrics?.lastUpdated || 'מסנכרן...'} · {metrics?.status || 'Active'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-right">
          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">טמפרטורת אוויר</span>
            <div className="text-xl md:text-2xl font-bold font-mono-data text-[#111111] flex items-baseline gap-1">
              <span>{metrics?.temperature || '34.0°C'}</span>
              <span className="text-xs text-[#F39C12] font-normal">חם מאוד</span>
            </div>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">חלקיקי אבק מדברי (PM10)</span>
            <div className="text-lg md:text-xl font-bold font-mono-data text-[#111111]">
              <span>{metrics?.dustLevel.split(' ')[1] || '45'}</span>
              <span className="text-xs font-mono-data text-neutral-500 mr-1">µg/m³</span>
            </div>
            <span className="text-[10px] text-amber-700 font-mono-data block">רמה מתונה / חזית אובך</span>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">עוצמת קרינה סולארית</span>
            <div className="text-lg md:text-xl font-bold font-mono-data text-[#F39C12]">
              <span>{metrics?.solarIrradiance || '880 W/m²'}</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono-data block">אינדקס UV: {metrics?.uvIndex || 8.4}</span>
          </div>

          <div className="p-2 border border-[#111111]/10 bg-[#FAFAFA]">
            <span className="text-[11px] font-mono-data text-neutral-500 block">רוח מדברית ולחות</span>
            <div className="text-sm md:text-base font-bold font-mono-data text-[#111111] flex items-center justify-between">
              <span>{metrics?.windSpeed || '18 km/h NW'}</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono-data block">לחות יחסית: {metrics?.humidity || '28%'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

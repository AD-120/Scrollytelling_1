import React from 'react';
import { Presentation, Compass, Layers, ShieldCheck, Sun } from 'lucide-react';
import { ActId } from '../types';

interface HeaderProps {
  currentAct: ActId;
  onSelectAct: (actId: ActId) => void;
  onOpenPitchDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentAct,
  onSelectAct,
  onOpenPitchDeck,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#111111] px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg md:text-xl font-bold font-display tracking-tight text-[#111111] hover:text-[#F39C12] transition-colors flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-[#F39C12] border border-[#111111] inline-block"></span>
            <span>רובע החדשנות באר שבע</span>
          </a>
        </div>

        {/* Zone 2: 4–6 clean text navigation links (Act navigation) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#111111]/70">
          <button
            onClick={() => onSelectAct(1)}
            className={`transition-colors hover:text-[#111111] text-xs font-mono-data ${
              currentAct === 1 ? 'text-[#111111] font-semibold border-b-2 border-[#111111] pb-0.5' : ''
            }`}
          >
            01. המדבר כעתיד
          </button>
          <button
            onClick={() => onSelectAct(2)}
            className={`transition-colors hover:text-[#111111] text-xs font-mono-data ${
              currentAct === 2 ? 'text-[#111111] font-semibold border-b-2 border-[#111111] pb-0.5' : ''
            }`}
          >
            02. אקלים כמנוף
          </button>
          <button
            onClick={() => onSelectAct(3)}
            className={`transition-colors hover:text-[#111111] text-xs font-mono-data ${
              currentAct === 3 ? 'text-[#111111] font-semibold border-b-2 border-[#111111] pb-0.5' : ''
            }`}
          >
            03. המשולש המוסדי
          </button>
          <button
            onClick={() => onSelectAct(4)}
            className={`transition-colors hover:text-[#111111] text-xs font-mono-data ${
              currentAct === 4 ? 'text-[#111111] font-semibold border-b-2 border-[#111111] pb-0.5' : ''
            }`}
          >
            04. אתר בטא חי
          </button>
          <button
            onClick={() => onSelectAct(5)}
            className={`transition-colors hover:text-[#111111] text-xs font-mono-data ${
              currentAct === 5 ? 'text-[#111111] font-semibold border-b-2 border-[#111111] pb-0.5' : ''
            }`}
          >
            05. מפת דרכים
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPitchDeck}
            className="px-3 md:px-4 py-1.5 text-xs font-mono-data font-semibold bg-[#111111] text-white border border-[#111111] neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-transform flex items-center gap-1.5 whitespace-nowrap"
            title="הפקת תקציר מנהלים מותאם"
          >
            <Presentation className="w-3.5 h-3.5 text-[#F39C12]" />
            <span>תקציר מנהלים</span>
          </button>
        </div>

      </div>
    </header>
  );
};

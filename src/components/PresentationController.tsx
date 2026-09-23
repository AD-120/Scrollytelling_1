import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, Compass, Layers, RotateCcw } from 'lucide-react';
import { ActId } from '../types';
import { PRESENTATION_ACTS } from '../data/presentationContent';

interface PresentationControllerProps {
  currentAct: ActId;
  activeCardIndex: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onSelectAct: (actId: ActId) => void;
  totalSteps: number;
}

export const PresentationController: React.FC<PresentationControllerProps> = ({
  currentAct,
  activeCardIndex,
  onNextSlide,
  onPrevSlide,
  onSelectAct,
  totalSteps,
}) => {
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Calculate global progress percentage
  const currentStepNum = activeCardIndex + 1;
  const progressPercent = Math.round((currentStepNum / totalSteps) * 100);

  // Autoplay timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoplay) {
      timer = setInterval(() => {
        onNextSlide();
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoplay, onNextSlide]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-white/95 backdrop-blur-md border-2 border-[#111111] neo-shadow-lg px-3 py-2.5 transition-all">
      
      {/* Horizontal Progress Bar */}
      <div className="w-full h-1 bg-neutral-200 border-b border-neutral-300 mb-2 overflow-hidden">
        <div
          className="h-full bg-[#111111] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        
        {/* Step Indicator & Act Tag */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-data font-bold bg-[#111111] text-white px-2 py-0.5">
            ACT 0{currentAct}
          </span>
          <span className="hidden sm:inline text-xs font-mono-data text-neutral-600">
            צעד {currentStepNum} מתוך {totalSteps} ({progressPercent}%)
          </span>
        </div>

        {/* 5 Act Quick Jump Dots / Buttons */}
        <div className="flex items-center gap-1">
          {PRESENTATION_ACTS.map((act) => (
            <button
              key={act.id}
              onClick={() => onSelectAct(act.id)}
              className={`w-6 h-6 border border-[#111111] font-mono-data text-[10px] font-bold transition-transform ${
                currentAct === act.id
                  ? 'bg-[#111111] text-white scale-110'
                  : 'bg-[#FAFAFA] text-neutral-700 hover:bg-neutral-200'
              }`}
              title={`מעבר ל-${act.titleHe}`}
            >
              {act.id}
            </button>
          ))}
        </div>

        {/* Playback & Slide Navigation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`p-1.5 border border-[#111111] transition-colors ${
              isAutoplay ? 'bg-[#F39C12] text-black' : 'bg-white hover:bg-neutral-100 text-[#111111]'
            }`}
            title={isAutoplay ? 'השהה ניגון אוטומטי' : 'ניגון מצגת אוטומטי (7 שניות לשקף)'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onPrevSlide}
            className="px-2 py-1 border border-[#111111] bg-white hover:bg-neutral-100 text-[#111111] text-xs font-mono-data flex items-center gap-0.5 active:translate-y-0.5"
            title="שקף קודם (חץ עליון / שמאלי)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">הקודם</span>
          </button>

          <button
            onClick={onNextSlide}
            className="px-2.5 py-1 border border-[#111111] bg-[#111111] text-white hover:bg-[#F39C12] hover:text-black text-xs font-mono-data font-bold flex items-center gap-0.5 active:translate-y-0.5 transition-colors"
            title="שקף הבא (חץ תחתון / רווח)"
          >
            <span className="hidden sm:inline">הבא</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

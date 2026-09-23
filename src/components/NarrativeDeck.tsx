import React, { useEffect, useRef } from 'react';
import { PRESENTATION_ACTS } from '../data/presentationContent';
import { ActId } from '../types';
import { Quote, ArrowDown, Sparkles, Compass, CheckCircle } from 'lucide-react';

interface NarrativeDeckProps {
  currentAct: ActId;
  activeCardIndex: number;
  onActChange: (actId: ActId, cardIndex: number) => void;
}

export const NarrativeDeck: React.FC<NarrativeDeckProps> = ({
  currentAct,
  activeCardIndex,
  onActChange,
}) => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Intersection Observer to detect which card is centered in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const actIdAttr = entry.target.getAttribute('data-act-id');
            const stepIndexAttr = entry.target.getAttribute('data-step-index');
            if (actIdAttr && stepIndexAttr !== null) {
              const actId = Number(actIdAttr) as ActId;
              const stepIndex = Number(stepIndexAttr);
              onActChange(actId, stepIndex);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -25% 0px',
        threshold: [0.4, 0.7]
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onActChange]);

  return (
    <div className="w-full py-8 px-4 md:px-8 space-y-24 text-right">
      
      {/* Intro Exhibition Monograph Banner */}
      <div className="border-2 border-[#111111] bg-white p-6 md:p-8 neo-shadow text-right">
        <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-4">
          <span className="font-mono-data text-xs font-bold bg-[#111111] text-white px-2 py-0.5">
            EXHIBITION DOSSIER · רובע החדשנות באר שבע
          </span>
          <span className="text-xs font-mono-data text-neutral-500">
            תקציר אסטרטגי ומחקר שטח 2026–2030
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-display text-[#111111] leading-tight mb-3">
          הפיכת אקלים מדברי קיצוני ליתרון כלכלי, מדעי ואורבני
        </h1>

        <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-sans max-w-xl">
          מדריך אינטראקטיבי למשקיעים, חוקרים, סטארטאפים והנהגת העיר: כיצד באר שבע מנצלת את 300 ימי השמש, סופות האבק והחום העז כדי להפוך למעבדת האקלים וה-DesertTech המובילה בעולם.
        </p>

        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-200 text-xs font-mono-data text-neutral-600">
          <span className="animate-bounce">↓</span>
          <span>גללו מטה להמשך הסיפור, או נווטו באמצעות בקר הפרזנטציה התחתון</span>
        </div>
      </div>

      {/* 5 Acts Narrative Sections */}
      {PRESENTATION_ACTS.map((act) => {
        const isCurrentAct = currentAct === act.id;

        return (
          <section
            key={act.id}
            id={`act-section-${act.id}`}
            className="space-y-12 scroll-mt-24 transition-opacity duration-300"
          >
            {/* Act Title Divider Header */}
            <div className="border-b-2 border-[#111111] pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono-data text-xs font-bold px-2 py-0.5 text-black border border-[#111111]"
                  style={{ backgroundColor: act.accentColor }}
                >
                  {act.code}
                </span>
                <span className="text-xs font-mono-data text-neutral-500 uppercase tracking-wider">
                  {act.themeTag}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-display text-[#111111]">
                {act.titleHe}
              </h2>
              <span className="text-xs font-mono-data text-neutral-500 block mt-0.5">
                {act.titleEn}
              </span>

              <p className="text-xs md:text-sm text-neutral-700 italic mt-2 border-r-2 border-[#111111] pr-2">
                {act.summaryKicker}
              </p>
            </div>

            {/* Deck Narrative Cards */}
            <div className="space-y-10">
              {act.cards.map((card, idx) => {
                const isCardActive = isCurrentAct && activeCardIndex === card.stepIndex;

                return (
                  <div
                    key={card.id}
                    ref={(el) => { cardRefs.current[card.id] = el; }}
                    data-act-id={act.id}
                    data-step-index={card.stepIndex}
                    className={`border-2 border-[#111111] bg-white p-6 md:p-8 transition-all duration-300 ${
                      isCardActive
                        ? 'neo-shadow-lg scale-[1.01] border-[#111111]'
                        : 'neo-shadow-sm opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Card Meta Indicator */}
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-3">
                      <span className="text-[11px] font-mono-data text-neutral-500">
                        פרק {act.id} · נקודת מפנה {idx + 1} מתוך {act.cards.length}
                      </span>
                      {isCardActive && (
                        <span className="text-[10px] font-mono-data font-bold bg-[#111111] text-white px-2 py-0.5">
                          מוצג כעת במשטח הראווה
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold font-display text-[#111111] mb-1">
                      {card.title}
                    </h3>

                    {card.tagline && (
                      <div className="text-xs font-mono-data text-neutral-600 font-semibold mb-4">
                        {card.tagline}
                      </div>
                    )}

                    {/* Prose Paragraphs */}
                    <div className="space-y-3 text-xs md:text-sm text-neutral-800 leading-relaxed font-sans">
                      {card.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Pull Quote Callout if exists */}
                    {card.highlightQuote && (
                      <div className="my-5 p-4 border-r-4 border-[#F39C12] bg-[#FAF8F2] text-neutral-900">
                        <Quote className="w-5 h-5 text-[#F39C12] mb-1 opacity-80" />
                        <p className="text-xs md:text-sm italic font-serif leading-relaxed">
                          {card.highlightQuote.text}
                        </p>
                        <div className="text-[11px] font-mono-data font-bold text-neutral-700 mt-2">
                          — {card.highlightQuote.author}
                          {card.highlightQuote.role && (
                            <span className="text-neutral-500 font-normal">, {card.highlightQuote.role}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Key Proof Metrics Bar */}
                    {card.metrics && (
                      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[#111111]/20">
                        {card.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-2 border border-neutral-200 bg-[#FAFAFA] text-right">
                            <span className="text-[10px] font-mono-data text-neutral-500 block truncate">
                              {m.label}
                            </span>
                            <div className="text-base md:text-xl font-bold font-mono-data text-[#111111]">
                              {m.value}
                            </div>
                            {m.unit && (
                              <span className="text-[9px] font-mono-data text-neutral-500 block">
                                {m.unit}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Hint */}
                    {card.actionNote && (
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono-data text-[#0055FF]">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{card.actionNote}</span>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Outro Call to Action Card */}
      <div className="border-2 border-[#111111] bg-[#111111] text-white p-6 md:p-8 neo-shadow text-right">
        <span className="text-xs font-mono-data text-[#F39C12] uppercase font-bold block mb-1">
          השלב הבא · שותפות אסטרטגית ברובע
        </span>
        <h3 className="text-2xl font-bold font-display text-white mb-2">
          באר שבע מזמינה אתכם להוביל את מהפכת ה-ClimateTech
        </h3>
        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
          בין אם אתם סטארטאפ עם פתרון הצללה, חוקר עם פטנט על ננו-ציפוי דוחה אבק, או קרן הון סיכון המחפשת אימפקט מדיד – הרובע מעניק לכם גישה בלעדית לתשתיות, נתונים וקרקע לניסויי שטח.
        </p>
        <div className="text-xs font-mono-data text-neutral-400">
          פנו למנהלת הרובע: office@b7-climate-district.gov.il · טלפון: 08-6405555
        </div>
      </div>

    </div>
  );
};

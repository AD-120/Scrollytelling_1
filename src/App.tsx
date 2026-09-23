/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { VisualStage } from './components/VisualStage';
import { NarrativeDeck } from './components/NarrativeDeck';
import { PresentationController } from './components/PresentationController';
import { PitchDeckModal } from './components/PitchDeckModal';
import { ProposalModal } from './components/ProposalModal';
import { ActId, CallForProposal, PersonaType } from './types';
import { PRESENTATION_ACTS } from './data/presentationContent';
import { Eye, BookOpen, MonitorPlay, Layers } from 'lucide-react';

export default function App() {
  const [currentAct, setCurrentAct] = useState<ActId>(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<'narrative' | 'visual'>('narrative');

  // Modals state
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('startup');
  const [selectedProposal, setSelectedProposal] = useState<CallForProposal | null>(null);

  const totalSteps = 10; // 5 acts * 2 cards each

  // Handle Act & Card change from scroll observer
  const handleActChange = useCallback((actId: ActId, cardIndex: number) => {
    setCurrentAct(actId);
    setActiveCardIndex(cardIndex);
  }, []);

  // Scroll to a specific card by its step index
  const scrollToCard = useCallback((stepIndex: number) => {
    const targetElement = document.querySelector(`[data-step-index="${stepIndex}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Slide navigation handlers
  const handleNextSlide = useCallback(() => {
    const nextStep = Math.min(activeCardIndex + 1, totalSteps - 1);
    const targetAct = PRESENTATION_ACTS.find((act) =>
      act.cards.some((c) => c.stepIndex === nextStep)
    );
    if (targetAct) {
      setCurrentAct(targetAct.id);
    }
    setActiveCardIndex(nextStep);
    scrollToCard(nextStep);
  }, [activeCardIndex, scrollToCard, totalSteps]);

  const handlePrevSlide = useCallback(() => {
    const prevStep = Math.max(activeCardIndex - 1, 0);
    const targetAct = PRESENTATION_ACTS.find((act) =>
      act.cards.some((c) => c.stepIndex === prevStep)
    );
    if (targetAct) {
      setCurrentAct(targetAct.id);
    }
    setActiveCardIndex(prevStep);
    scrollToCard(prevStep);
  }, [activeCardIndex, scrollToCard]);

  // Jump to specific Act
  const handleSelectAct = useCallback((actId: ActId) => {
    setCurrentAct(actId);
    const act = PRESENTATION_ACTS.find((a) => a.id === actId);
    if (act && act.cards.length > 0) {
      const firstCardStep = act.cards[0].stepIndex;
      setActiveCardIndex(firstCardStep);
      scrollToCard(firstCardStep);
    }
  }, [scrollToCard]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleSelectAct(Number(e.key) as ActId);
      } else if (e.key === 'Escape') {
        setIsPitchDeckOpen(false);
        setSelectedProposal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, handleSelectAct]);

  const handleOpenPitchDeckWithPersona = (persona: PersonaType) => {
    setSelectedPersona(persona);
    setIsPitchDeckOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans selection:bg-[#F39C12] selection:text-black">
      
      {/* Top Bar Header (Zone 1: Wordmark, Zone 2: Act links, Zone 3: Pitch Deck Action) */}
      <Header
        currentAct={currentAct}
        onSelectAct={handleSelectAct}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Mobile Tab Segmented Switcher (Visible only on < lg screens) */}
      <div className="lg:hidden sticky top-[49px] z-30 bg-[#FAFAFA] border-b border-[#111111] p-2 flex items-center justify-center">
        <div className="flex items-center gap-1 p-1 bg-neutral-200 border border-[#111111] max-w-sm w-full">
          <button
            onClick={() => setMobileTab('narrative')}
            className={`flex-1 py-1 text-xs font-mono-data font-bold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'narrative'
                ? 'bg-[#111111] text-white'
                : 'text-[#111111] hover:bg-neutral-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>נרטיב אסטרטגי</span>
          </button>
          <button
            onClick={() => setMobileTab('visual')}
            className={`flex-1 py-1 text-xs font-mono-data font-bold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'visual'
                ? 'bg-[#111111] text-white'
                : 'text-[#111111] hover:bg-neutral-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>משטח ראווה חי</span>
          </button>
        </div>
      </div>

      {/* Main Scrollytelling Stage: Split Layout */}
      <main className="flex-1 w-full max-w-[1580px] mx-auto flex flex-col lg:flex-row relative">
        
        {/* Left Side (Narrative Scroll Deck in Hebrew RTL) */}
        <div
          className={`w-full lg:w-[46%] xl:w-[44%] relative z-10 pb-28 ${
            mobileTab === 'visual' ? 'hidden lg:block' : 'block'
          }`}
        >
          <NarrativeDeck
            currentAct={currentAct}
            activeCardIndex={activeCardIndex}
            onActChange={handleActChange}
          />
        </div>

        {/* Right Side (Pinned Persistent Visual Stage) */}
        <div
          className={`w-full lg:w-[54%] xl:w-[56%] lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] z-20 ${
            mobileTab === 'narrative' ? 'hidden lg:block' : 'block'
          }`}
        >
          <VisualStage
            currentAct={currentAct}
            activeCardIndex={activeCardIndex}
            onOpenProposal={(proposal) => setSelectedProposal(proposal)}
            onOpenPitchDeckWithPersona={handleOpenPitchDeckWithPersona}
          />
        </div>

      </main>

      {/* Persistent Bottom Presentation Remote Controller */}
      <PresentationController
        currentAct={currentAct}
        activeCardIndex={activeCardIndex}
        onNextSlide={handleNextSlide}
        onPrevSlide={handlePrevSlide}
        onSelectAct={handleSelectAct}
        totalSteps={totalSteps}
      />

      {/* Tailored Pitch Deck Dossier Modal */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        selectedPersona={selectedPersona}
        onSelectPersona={(persona) => setSelectedPersona(persona)}
      />

      {/* Call for Proposal Sandbox Submission Modal */}
      <ProposalModal
        proposal={selectedProposal}
        onClose={() => setSelectedProposal(null)}
      />

    </div>
  );
}

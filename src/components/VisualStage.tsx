import React from 'react';
import { ActId, CallForProposal, PersonaType } from '../types';
import { Act1TopographyStage } from './visuals/Act1TopographyStage';
import { Act2MicroclimateSplitStage } from './visuals/Act2MicroclimateSplitStage';
import { Act3DistrictMapStage } from './visuals/Act3DistrictMapStage';
import { Act4BetaDashboardStage } from './visuals/Act4BetaDashboardStage';
import { Act5StakeholderMatrixStage } from './visuals/Act5StakeholderMatrixStage';

interface VisualStageProps {
  currentAct: ActId;
  activeCardIndex: number;
  onOpenProposal: (proposal: CallForProposal) => void;
  onOpenPitchDeckWithPersona: (persona: PersonaType) => void;
}

export const VisualStage: React.FC<VisualStageProps> = ({
  currentAct,
  activeCardIndex,
  onOpenProposal,
  onOpenPitchDeckWithPersona,
}) => {
  return (
    <div className="w-full h-full p-2 md:p-6 flex flex-col justify-center">
      <div className="w-full h-[calc(100vh-5.5rem)] max-h-[880px] bg-white border-2 border-[#111111] neo-shadow-lg overflow-hidden transition-all duration-300">
        {currentAct === 1 && (
          <Act1TopographyStage stepIndex={activeCardIndex} />
        )}
        {currentAct === 2 && (
          <Act2MicroclimateSplitStage stepIndex={activeCardIndex} />
        )}
        {currentAct === 3 && (
          <Act3DistrictMapStage stepIndex={activeCardIndex} />
        )}
        {currentAct === 4 && (
          <Act4BetaDashboardStage
            stepIndex={activeCardIndex}
            onOpenProposal={onOpenProposal}
          />
        )}
        {currentAct === 5 && (
          <Act5StakeholderMatrixStage
            stepIndex={activeCardIndex}
            onOpenPitchDeckWithPersona={onOpenPitchDeckWithPersona}
          />
        )}
      </div>
    </div>
  );
};

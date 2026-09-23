export type ActId = 1 | 2 | 3 | 4 | 5;

export interface DistrictMetrics {
  location: string;
  temperature: string;
  dustLevel: string;
  solarIrradiance: string;
  activeBetaPilots: number;
  status: string;
  humidity: string;
  windSpeed: string;
  uvIndex: number;
  lastUpdated: string;
  thermalComfort: string;
}

export interface DeckCard {
  id: string;
  stepIndex: number;
  title: string;
  tagline?: string;
  paragraphs: string[];
  highlightQuote?: {
    text: string;
    author: string;
    role?: string;
  };
  metrics?: Array<{
    label: string;
    value: string;
    unit?: string;
    subtext?: string;
  }>;
  actionNote?: string;
}

export interface ActDefinition {
  id: ActId;
  code: string;
  titleHe: string;
  titleEn: string;
  themeTag: string;
  accentColor: string; // '#F39C12' | '#2ECC71' | '#0055FF'
  cards: DeckCard[];
  summaryKicker: string;
}

export interface DistrictHotspot {
  id: string;
  titleHe: string;
  titleEn: string;
  type: 'medical' | 'academia' | 'industry' | 'civic' | 'mobility';
  x: number; // percentage in svg canvas
  y: number;
  description: string;
  focusArea: string;
  liveMetric: string;
  synergyPartners: string[];
  highlightRole: string;
}

export interface CallForProposal {
  id: string;
  title: string;
  domain: 'Energy & Solar' | 'Dust & Air Quality' | 'Bioclimatic Shading' | 'Water & Soil' | 'Urban Health';
  budgetMatch: string;
  stage: 'Open Call' | 'In Pilot' | 'Field Validation';
  deadline: string;
  leadInstitution: string;
  description: string;
}

export type PersonaType = 'startup' | 'researcher' | 'investor' | 'municipality';

export interface PersonaProfile {
  id: PersonaType;
  labelHe: string;
  labelEn: string;
  roleDescription: string;
  keyIncentives: string[];
  districtAccess: string[];
  projectedROI: string;
  recommendedAction: string;
  contactDesk: string;
}

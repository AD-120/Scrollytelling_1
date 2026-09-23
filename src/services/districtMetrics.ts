import { CallForProposal, DistrictHotspot, DistrictMetrics, PersonaProfile } from '../types';

/**
 * Live Climate & Environmental Sensors Service
 * Matches user-requested boilerplate signature while offering dynamic simulation.
 */
export async function getLiveDistrictMetrics(): Promise<DistrictMetrics> {
  // Simulating realistic microclimate metrics for Beer Sheva District
  const now = new Date();
  const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    location: "Beer Sheva Innovation District",
    temperature: "34°C",
    dustLevel: "PM10: 45 µg/m³ (Moderate)",
    solarIrradiance: "880 W/m²",
    activeBetaPilots: 14,
    status: "Live Stream Active",
    humidity: "28%",
    windSpeed: "18 km/h NW",
    uvIndex: 8.4,
    lastUpdated: timeStr,
    thermalComfort: "Severe Heat Load (Unshaded) / Moderate (Canopy)"
  };
}

export const DISTRICT_HOTSPOTS: DistrictHotspot[] = [
  {
    id: 'soroka',
    titleHe: 'מרכז רפואי אוניברסיטאי סורוקה',
    titleEn: 'Soroka University Medical Center',
    type: 'medical',
    x: 28,
    y: 35,
    description: 'המרכז הרפואי המוביל בדרום, המשלב ניטור קליני של השפעות אבק מדברי (PM10/PM2.5) וחום קיצוני על חולי לב ונשימה.',
    focusArea: 'רפואת אקלים, בריאות הציבור וחוסן נשימתי באזורים צחיחים',
    liveMetric: '6,400 רישומי מטופלים מסונכרנים לניטור זיהום אקלימי',
    synergyPartners: ['אוניברסיטת בן-גוריון', 'פארק גב-ים'],
    highlightRole: 'ניטור אבק וחום בזמן אמת והערכת השפעה בריאותית'
  },
  {
    id: 'bgu',
    titleHe: 'אוניברסיטת בן-גוריון בנגב',
    titleEn: 'Ben-Gurion University of the Negev',
    type: 'academia',
    x: 52,
    y: 50,
    description: 'חלוצה עולמית במחקרי מדבר ומים (מכוני בלאושטיין), ביו-טכנולוגיה צמחית, חומרים מבודדי חום ופתרונות אנרגיה סולארית.',
    focusArea: 'מחקר יישומי בתנאי מדבר קיצוניים ופיתוח טכנולוגיות אגרי-וולטאיות',
    liveMetric: '14 מעבדות שדה פעילות ו-3 מתקני סימולציה סולארית',
    synergyPartners: ['סורוקה', 'משרד האנרגיה', 'רשות החדשנות'],
    highlightRole: 'מחקר בסיסי ומעבדות שטח לתנאים קיצוניים'
  },
  {
    id: 'gavyam',
    titleHe: 'פארק הייטק גב-ים נגב',
    titleEn: 'Gav-Yam Negev Advanced Technologies Park',
    type: 'industry',
    x: 75,
    y: 32,
    description: 'מתחם מו"פ המאכלס חברות רב-לאומיות, סטארטאפים בתחומי DesertTech, סייבר ואוטונומיה, המחובר בגשר הולכי רגל לרכבת ולאוניברסיטה.',
    focusArea: 'מסחור טכנולוגיות אקלים, פיילוטים תעשייתיים וגיוס השקעות',
    liveMetric: '70+ חברות טכנולוגיה ומרכזי מו"פ בינלאומיים',
    synergyPartners: ['אוניברסיטת בן-גוריון', 'עיריית באר שבע'],
    highlightRole: 'אתר בטא ומנוע מסחור והשקעות'
  },
  {
    id: 'bridge',
    titleHe: 'גשר הולכי הרגל והצל הביו-אקלימי',
    titleEn: 'Bioclimatic Shading & Pedestrian Link',
    type: 'mobility',
    x: 62,
    y: 42,
    description: 'ציר חיבור פיזי ואיקוני המהווה מעבדת חישה רציפה של משטר הרוחות, הצללה קינטית וזרימת קהל.',
    focusArea: 'הצללה פסיבית, תיעול רוחות מדבר ומיקרו-אקלים רציף',
    liveMetric: 'הורדת טמפרטורת חישה של 9.2°C בשעות השיא',
    synergyPartners: ['עיריית באר שבע', 'רכבת ישראל'],
    highlightRole: 'עורק קישוריות מוצל ומבוקר אקלים'
  },
  {
    id: 'civic-sandbox',
    titleHe: 'אתר בטא עירוני - רובע ג׳ הוותיק',
    titleEn: 'Municipal Beta Sandbox (Neighborhood C)',
    type: 'civic',
    x: 42,
    y: 72,
    description: 'מרקם עירוני חי לבחינת ציפויי אספלט פולטי קרינה לילית (Radiative Cooling), חופות צל סולאריות ומערכות אגירת נגר עילי.',
    focusArea: 'רגולציה מאפשרת ובחינה חיה בסביבת מגורים אותנטית',
    liveMetric: '8 פיילוטים פעילים ברחובות המגורים המחוברים לרשת החיישנים',
    synergyPartners: ['עיריית באר שבע', 'חברות סטארטאפ מקומיות'],
    highlightRole: 'רגולציה מאפשרת (Regulatory Sandbox) לבדיקות שטח'
  }
];

export const CALLS_FOR_PROPOSALS: CallForProposal[] = [
  {
    id: 'cfp-01',
    title: 'חופות צל דינמיות עם תאים פוטו-וולטאיים גמישים',
    domain: 'Bioclimatic Shading',
    budgetMatch: 'עד ₪500,000 + בדיקת שטח מאושרת',
    stage: 'Open Call',
    deadline: '15.11.2026',
    leadInstitution: 'עיריית באר שבע בשיתוף אוניברסיטת בן-גוריון',
    description: 'בחינת פריסה של יריעות צל קינטיות המייצרות חשמל ומורידות טמפרטורת מדרכה ב-12°C במרחב הציבורי.'
  },
  {
    id: 'cfp-02',
    title: 'סנסורים לניטור מקומי של סופות חלקיקי אבק (PM10/PM2.5)',
    domain: 'Dust & Air Quality',
    budgetMatch: 'עד ₪750,000 תמיכה מרשות החדשנות',
    stage: 'Open Call',
    deadline: '01.12.2026',
    leadInstitution: 'מרכז רפואי סורוקה ומכון בלאושטיין',
    description: 'אלגוריתמי חיזוי נשימתי מבוססי AI המתריעים לאוכלוסיות בסיכון טרם הגעת חזית סופת אבק מדברית.'
  },
  {
    id: 'cfp-03',
    title: 'ציפויי חזית מבוססי אצות לקירור פסיבי וקיבוע פחמן',
    domain: 'Energy & Solar',
    budgetMatch: '₪1,200,000 למתקן הדגמה מלא',
    stage: 'Field Validation',
    deadline: 'סבב בחינה פעיל',
    leadInstitution: 'פארק גב-ים נגב',
    description: 'מערכת פוטו-ביוריאקטורית משולבת חלונות זכוכית המווסתת חדירת חום ומפיקה ביומאסה בתנאי שמש מדברית.'
  },
  {
    id: 'cfp-04',
    title: 'אספלט בעל פליטה תרמית לילית מוגברת (Super-Cooling)',
    domain: 'Urban Health',
    budgetMatch: 'פטור מאגרות עירוניות + מימון תשתית',
    stage: 'In Pilot',
    deadline: 'פיילוט בביצוע (מקטע 4B)',
    leadInstitution: 'מנהלת רובע החדשנות',
    description: 'בחינת תרכובת פולימרית המונעת אפקט "אי חום עירוני" (Urban Heat Island) ופולטת חום לחלל החיצון.'
  }
];

export const STAKEHOLDER_PERSONAS: PersonaProfile[] = [
  {
    id: 'startup',
    labelHe: 'היזם והסטארטאפ',
    labelEn: 'Startup / Founder',
    roleDescription: 'חברות הזנק ומפתחי טכנולוגיות אקלים, אנרגיה ואיכות סביבה המחפשים אתר בטא לניסויי שטח מהירים.',
    keyIncentives: [
      'מסלול רישוי מהיר (Fast-Track Regulatory Sandbox) ללא בירוקרטיה עירונית',
      'חיבור ישיר לדאטה-לייק האקלימי של הרובע וסנסורי סורוקה',
      'מענקי התאמה מקרן הנגב ושותפות עם חברות גלובליות בפארק גב-ים'
    ],
    districtAccess: [
      'גישה למבני ציבור וגגות להתקנות שדה',
      'מעבדות אנליטיות באוניברסיטת בן-גוריון',
      'תשתית תקשורת LoRaWAN / 5G עירונית פרוסה'
    ],
    projectedROI: 'קיצור זמן הגעה לשוק מ-24 חודשים ל-9 חודשים בסביבת אקלים קיצונית מוכחת',
    recommendedAction: 'הגשת בקשה למסלול בטא-סייט מהיר (Beta-Site Sandbox Entry)',
    contactDesk: 'desk-startups@b7-innovation.org.il'
  },
  {
    id: 'researcher',
    labelHe: 'החוקר והאקדמאי',
    labelEn: 'Academic / Researcher',
    roleDescription: 'חוקרי אקלים, רפואה, הנדסת חומרים ומדעי הסביבה באוניברסיטת בן-גוריון ומרכז סורוקה.',
    keyIncentives: [
      'איגום משאבים בין-מוסדי בלעדי (סורוקה + בנ״ג + גב-ים)',
      'קרן מענקי מחקר תחרותית למיזמי מדבר ואקלים (קרן משותפת ₪15M)',
      'חשיפה ישירה לשותפים תעשייתיים גלובליים לרישום פטנטים ומסחור'
    ],
    districtAccess: [
      'מאגר נתוני חולים ותחלואה נשימתית מותמם (De-identified)',
      'מתקן שדה סולארי ייעודי בקמפוס שדה בוקר ובאר שבע',
      'תחנות ניטור מטאורולוגי וקרינה ברמת דיוק מעבדתית'
    ],
    projectedROI: 'פרסומים בכתבי עת מובילים ומענקי Horizon Europe / BSF מועדפים',
    recommendedAction: 'הצטרפות לפורום המו״פ המשולש (Tri-Institutional R&D Fellowship)',
    contactDesk: 'rd-fellowship@bgu.ac.il'
  },
  {
    id: 'investor',
    labelHe: 'המשקיע וקרן הון סיכון',
    labelEn: 'Investor / Climate VC',
    roleDescription: 'קרנות הון סיכון, משקיעי אימפקט ואנג׳לים המתמקדים ב-ClimateTech, אנרגיה ותשתיות עמידות.',
    keyIncentives: [
      'דיל-פלו בלעדי של טכנולוגיות מוכחות שעברו אימות שטח בתנאי קיצון',
      'הגנת De-Risking ממשלתית דרך רשות החדשנות ומשרד הכלכלה',
      'פטורים ועידוד השקעות הון ייעודי לאזור פיתוח א׳ (חוק עידוד השקעות הון)'
    ],
    districtAccess: [
      'חדר עסקאות (Deal Room) רבעוני עם סטארטאפים פעילים ברובע',
      'דו״חות ולידציה טכנו-כלכלית שנערכו ע״י מומחי האוניברסיטה',
      'ביקורי סיור מודרכים באתרי הפיילוט ובפארק גב-ים'
    ],
    projectedROI: 'תשואת הון גבוהה לצד אימפקט מובהק הניתן לכימות (CO2, הפחתת עומס חום, חיסכון אנרגטי)',
    recommendedAction: 'קבלת ספר הפרויקטים להשקעה (2026-2027 Deal Book)',
    contactDesk: 'investors@negev-climate.fund'
  },
  {
    id: 'municipality',
    labelHe: 'הרשות והעירייה',
    labelEn: 'City & Regional Leadership',
    roleDescription: 'הנהלת העיר באר שבע, מתכננים עירוניים, ראשי ערים ומקבלי החלטות במשרדי הממשלה.',
    keyIncentives: [
      'הפיכת הנטל האקלימי למנוע משיכת תושבים חזקים, חברות גלובליות והשקעות בינלאומיות',
      'שיפור ישיר של איכות החיים במרחב הציבורי (מרחב מוצל, קריר ונגיש)',
      'חיסכון תקציבי דרמטי בהוצאות חשמל עירוניות על ידי הצללה וייצור עצמי'
    ],
    districtAccess: [
      'דשבורד שליטה עירוני אחוד (Digital Twin) של הרובע',
      'ארגז כלים לתכנון סטטוטורי מותאם אקלים ותקנות בניה ירוקה',
      'מודל שיתוף פעולה ציבורי-פרטי-אקדמי מוכח לשכפול ברשויות נוספות'
    ],
    projectedROI: 'תוספת של 12,000 משרות עתירות ידע וגידול של 22% בהכנסות ארנונה עסקית',
    recommendedAction: 'אימוץ חבילת הרגולציה והכללת פיילוטים בתקציב הפיתוח העירוני',
    contactDesk: 'mayor-office@beer-sheva.muni.il'
  }
];

/**
 * Solar potential computation model
 */
export function calculateSolarPotential(rooftopAreaM2: number, panelEfficiency = 0.21, sunHoursPerYear = 1850) {
  // Beer Sheva has ~1,850 - 2,050 peak sun hours per year, among the highest in OECD
  const kwPeak = rooftopAreaM2 * 0.16; // conservative packing
  const annualKwh = Math.round(kwPeak * sunHoursPerYear);
  const co2OffsetTons = Math.round((annualKwh * 0.00045) * 10) / 10; // ~0.45 kg CO2/kWh
  const annualSavingsShekels = Math.round(annualKwh * 0.52); // average blended tariff

  return {
    kwPeak: Math.round(kwPeak),
    annualKwh,
    co2OffsetTons,
    annualSavingsShekels
  };
}

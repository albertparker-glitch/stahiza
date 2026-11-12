export interface SubjectDef {
  code: string;
  name: string;
}

export interface ALevelCombination {
  code: string;
  subjects: [string, string, string];
  stream: 'Arts' | 'Physics' | 'Biology' | 'PCB Joint' | 'Pure & Applied Sciences';
  subsidiary: string;
  popular?: boolean;
}

export const ARTS_SUBJECTS: SubjectDef[] = [
  { code: 'H', name: 'History' },
  { code: 'E', name: 'Economics' },
  { code: 'G', name: 'Geography' },
  { code: 'L', name: 'Literature' },
  { code: 'D', name: 'Divinity' },
  { code: 'I', name: 'Islam' },
  { code: 'Ent', name: 'Entrepreneurship' },
  { code: 'A', name: 'Art & Design' },
  { code: 'Lu', name: 'Luganda' },
  { code: 'F', name: 'French' },
  { code: 'K', name: 'Kiswahili' },
];

export const SCIENCE_SUBJECTS: SubjectDef[] = [
  { code: 'P', name: 'Physics' },
  { code: 'B', name: 'Biology' },
  { code: 'M', name: 'Mathematics' },
  { code: 'E', name: 'Economics' },
  { code: 'C', name: 'Chemistry' },
];

const POPULAR_ARTS_CODES = new Set([
  'HEG',
  'HEL',
  'HED',
  'HEI',
  'HEEnt',
  'HEA',
  'HGD',
  'HGI',
  'HGL',
  'HLD',
  'EGD',
  'EGA',
  'EEntA',
  'LEG',
  'LED',
  'HLuD',
  'FHL',
  'KHL',
]);

function generateArtsCombinations(): ALevelCombination[] {
  const results: ALevelCombination[] = [];
  const n = ARTS_SUBJECTS.length;

  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const trio = [ARTS_SUBJECTS[i], ARTS_SUBJECTS[j], ARTS_SUBJECTS[k]];
        const names = trio.map((s) => s.name);

        // Divinity and Islam are mutually exclusive Religious Education options
        if (names.includes('Divinity') && names.includes('Islam')) {
          continue;
        }

        const code = trio.map((s) => s.code).join('');
        results.push({
          code,
          subjects: [names[0], names[1], names[2]],
          stream: 'Arts',
          subsidiary: 'Sub-Math / Sub-ICT & General Paper',
          popular: POPULAR_ARTS_CODES.has(code),
        });
      }
    }
  }

  return results;
}

export const ALL_ARTS_COMBINATIONS: ALevelCombination[] = generateArtsCombinations();
export const POPULAR_ARTS_COMBINATIONS: ALevelCombination[] = ALL_ARTS_COMBINATIONS.filter((c) => c.popular);
export const OTHER_ARTS_COMBINATIONS: ALevelCombination[] = ALL_ARTS_COMBINATIONS.filter((c) => !c.popular);

/**
 * Generates A-Level Science combinations from:
 * Physics, Biology, Mathematics, Economics, Chemistry
 * Rule: Biology combinations and Physics combinations are strictly separated,
 * with PCB (Physics, Chemistry, Biology) as the ONLY allowed joint combination.
 */
function generateScienceCombinations(): {
  physics: ALevelCombination[];
  biology: ALevelCombination[];
  pcbOnly: ALevelCombination[];
  other: ALevelCombination[];
  all: ALevelCombination[];
} {
  // Ordered cleanly so codes match standard UNEB notation (PCM, PEM, PEC, BCM, BCE, BME, PCB, MEC)
  const orderedSubjects: SubjectDef[] = [
    { code: 'P', name: 'Physics' },
    { code: 'B', name: 'Biology' },
    { code: 'C', name: 'Chemistry' },
    { code: 'M', name: 'Mathematics' },
    { code: 'E', name: 'Economics' },
  ];

  const physics: ALevelCombination[] = [];
  const biology: ALevelCombination[] = [];
  const pcbOnly: ALevelCombination[] = [];
  const other: ALevelCombination[] = [];

  const n = orderedSubjects.length;
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const trio = [orderedSubjects[i], orderedSubjects[j], orderedSubjects[k]];
        const names = trio.map((s) => s.name);
        const hasPhysics = names.includes('Physics');
        const hasBiology = names.includes('Biology');
        const hasChemistry = names.includes('Chemistry');
        const hasMath = names.includes('Mathematics');

        // Separate Physics and Biology strictly, apart from PCB only
        if (hasPhysics && hasBiology) {
          if (hasChemistry) {
            pcbOnly.push({
              code: 'PCB',
              subjects: ['Physics', 'Chemistry', 'Biology'],
              stream: 'PCB Joint',
              subsidiary: 'Sub-Math & General Paper',
              popular: true,
            });
          }
          continue;
        }

        const rawCode = trio.map((s) => s.code).join('');
        const canonicalScienceCodeMap: Record<string, { code: string; subjects: [string, string, string] }> = {
          PCM: { code: 'PCM', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
          PME: { code: 'PEM', subjects: ['Physics', 'Economics', 'Mathematics'] },
          PCE: { code: 'PEC', subjects: ['Physics', 'Economics', 'Chemistry'] },
          BCM: { code: 'BCM', subjects: ['Biology', 'Chemistry', 'Mathematics'] },
          BCE: { code: 'BCE', subjects: ['Biology', 'Chemistry', 'Economics'] },
          BME: { code: 'BME', subjects: ['Biology', 'Mathematics', 'Economics'] },
          CME: { code: 'MEC', subjects: ['Mathematics', 'Economics', 'Chemistry'] },
        };
        const formatted = canonicalScienceCodeMap[rawCode] ?? {
          code: rawCode,
          subjects: [names[0], names[1], names[2]] as [string, string, string],
        };
        const subsidiary = hasMath ? 'Sub-ICT & General Paper' : 'Sub-Math & General Paper';

        if (hasPhysics) {
          physics.push({
            code: formatted.code,
            subjects: formatted.subjects,
            stream: 'Physics',
            subsidiary,
            popular: true,
          });
        } else if (hasBiology) {
          biology.push({
            code: formatted.code,
            subjects: formatted.subjects,
            stream: 'Biology',
            subsidiary,
            popular: true,
          });
        } else {
          other.push({
            code: formatted.code,
            subjects: formatted.subjects,
            stream: 'Pure & Applied Sciences',
            subsidiary,
          });
        }
      }
    }
  }

  return {
    physics,
    biology,
    pcbOnly,
    other,
    all: [...physics, ...biology, ...pcbOnly, ...other],
  };
}

export const SCIENCE_COMBINATION_GROUPS = generateScienceCombinations();
export const ALL_SCIENCE_COMBINATIONS = SCIENCE_COMBINATION_GROUPS.all;

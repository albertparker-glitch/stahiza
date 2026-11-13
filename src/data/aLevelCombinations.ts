export interface SubjectDef {
  code: string;
  name: string;
}

export interface ALevelCombination {
  code: string;
  subjects: [string, string, string];
  stream: 'Arts' | 'Physics' | 'Biology' | 'PCB Joint' | 'Technical & Applied Sciences';
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
  { code: 'TD', name: 'Technical Drawing' },
  { code: 'FN', name: 'Food & Nutrition' },
  { code: 'Agric', name: 'Agriculture' },
  { code: 'Art', name: 'Art & Design' },
  { code: 'G', name: 'Geography' },
  { code: 'Ent', name: 'Entrepreneurship' },
  { code: 'H', name: 'History' },
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
 * School Sciences & Technical/Vocational A-Level Combinations:
 * PCM, PCB, PEM, PMArt, PMTD, TDEconArt, GEE, HEA, BCFN, BioAgricFN, BioAgriChem, GeoArtEcon, MtcEconTD
 * (TD = Technical Drawing, FN = Food & Nutrition)
 * Biology combinations and Physics combinations are strictly separated apart from PCB only.
 */
function generateScienceCombinations(): {
  physics: ALevelCombination[];
  biology: ALevelCombination[];
  pcbOnly: ALevelCombination[];
  other: ALevelCombination[];
  all: ALevelCombination[];
} {
  const physics: ALevelCombination[] = [
    {
      code: 'PCM',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      stream: 'Physics',
      subsidiary: 'Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'PEM',
      subjects: ['Physics', 'Economics', 'Mathematics'],
      stream: 'Physics',
      subsidiary: 'Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'PMArt',
      subjects: ['Physics', 'Mathematics', 'Art & Design'],
      stream: 'Physics',
      subsidiary: 'Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'PMTD',
      subjects: ['Physics', 'Mathematics', 'Technical Drawing'],
      stream: 'Physics',
      subsidiary: 'Sub-ICT & General Paper',
      popular: true,
    },
  ];

  const biology: ALevelCombination[] = [
    {
      code: 'BCFN',
      subjects: ['Biology', 'Chemistry', 'Food & Nutrition'],
      stream: 'Biology',
      subsidiary: 'Sub-Math & General Paper',
      popular: true,
    },
    {
      code: 'BioAgricFN',
      subjects: ['Biology', 'Agriculture', 'Food & Nutrition'],
      stream: 'Biology',
      subsidiary: 'Sub-Math & General Paper',
      popular: true,
    },
    {
      code: 'BioAgriChem',
      subjects: ['Biology', 'Agriculture', 'Chemistry'],
      stream: 'Biology',
      subsidiary: 'Sub-Math & General Paper',
      popular: true,
    },
  ];

  const pcbOnly: ALevelCombination[] = [
    {
      code: 'PCB',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      stream: 'PCB Joint',
      subsidiary: 'Sub-Math & General Paper',
      popular: true,
    },
  ];

  const other: ALevelCombination[] = [
    {
      code: 'MtcEconTD',
      subjects: ['Mathematics', 'Economics', 'Technical Drawing'],
      stream: 'Technical & Applied Sciences',
      subsidiary: 'Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'TDEconArt',
      subjects: ['Technical Drawing', 'Economics', 'Art & Design'],
      stream: 'Technical & Applied Sciences',
      subsidiary: 'Sub-Math / Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'GeoArtEcon',
      subjects: ['Geography', 'Art & Design', 'Economics'],
      stream: 'Technical & Applied Sciences',
      subsidiary: 'Sub-Math / Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'GEE',
      subjects: ['Geography', 'Economics', 'Entrepreneurship'],
      stream: 'Technical & Applied Sciences',
      subsidiary: 'Sub-Math / Sub-ICT & General Paper',
      popular: true,
    },
    {
      code: 'HEA',
      subjects: ['History', 'Economics', 'Art & Design'],
      stream: 'Technical & Applied Sciences',
      subsidiary: 'Sub-Math / Sub-ICT & General Paper',
      popular: true,
    },
  ];

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

export interface CombinationCareerGuidance {
  overview: string;
  universityCourses: string[];
  careerPaths: string[];
  admissionNote: string;
}

const EXPLICIT_COMBINATION_GUIDANCE: Record<string, CombinationCareerGuidance> = {
  PCM: {
    overview:
      'The premier Physical Sciences & Engineering combination, equipping students with strong analytical, mathematical modeling, and physical-chemical problem-solving skills.',
    universityCourses: [
      'Bachelor of Science in Civil, Electrical, Mechanical or Computer Engineering',
      'Bachelor of Architecture & Quantity Surveying',
      'Bachelor of Science in Software Engineering / Computer Science',
      'Bachelor of Science in Petroleum Geoscience & Mining Engineering',
      'Bachelor of Statistics & Actuarial Science',
    ],
    careerPaths: [
      'Civil, Electrical or Mechanical Engineer',
      'Software Architect & Systems Engineer',
      'Architect & Structural Designer',
      'Aviation Pilot / Aerospace Specialist',
      'Data Scientist & Quantitative Analyst',
    ],
    admissionNote:
      'Essential Physics + Mathematics + Chemistry foundation required for Engineering, Architecture, and Technology faculties at Makerere, Kyambogo, and MUST.',
  },
  PEM: {
    overview:
      'Bridges physical sciences with quantitative economics and mathematics, ideal for technology-driven finance, actuarial modeling, and economic systems.',
    universityCourses: [
      'Bachelor of Science in Actuarial Science',
      'Bachelor of Quantitative Economics & Statistics',
      'Bachelor of Science in Computer Science & Information Technology',
      'Bachelor of Science in Telecommunications or Industrial Engineering',
      'Bachelor of Business Computing & Financial Engineering',
    ],
    careerPaths: [
      'Actuary & Risk Management Analyst',
      'Investment Banker & Quantitative Economist',
      'Software Developer & IT Systems Consultant',
      'Telecommunications & Network Specialist',
      'Operations Research Analyst',
    ],
    admissionNote:
      'Physics and Mathematics open doors to Computer Science and Computing degrees, while Economics unlocks top Finance, Statistics, and Business faculties.',
  },
  PMArt: {
    overview:
      'Fuses analytical Physics and Mathematics with creative Art & Design, building the ideal foundation for Architecture, Industrial Design, Multimedia, and Spatial Engineering.',
    universityCourses: [
      'Bachelor of Architecture (BArch)',
      'Bachelor of Industrial & Fine Arts',
      'Bachelor of Interior, Product & Industrial Design',
      'Bachelor of Science in Computer Graphics & Multimedia Technology',
      'Bachelor of Urban & Spatial Design',
    ],
    careerPaths: [
      'Architect & Building Concept Designer',
      'Industrial & Product Designer',
      '3D Visualization & CAD Specialist',
      'UI/UX & Motion Graphics Designer',
      'Creative Technologist',
    ],
    admissionNote:
      'Physics and Mathematics satisfy technical university entry rules while Art & Design fulfills design portfolio and architectural drawing expectations.',
  },
  PMTD: {
    overview:
      'Combines Physics, Mathematics, and Technical Drawing (TD), purpose-built for Civil Engineering, Architecture, Mechanical Systems, Surveying, and Construction Management.',
    universityCourses: [
      'Bachelor of Architecture & Quantity Surveying',
      'Bachelor of Science in Civil & Structural Engineering',
      'Bachelor of Science in Mechanical & Manufacturing Engineering',
      'Bachelor of Science in Land Surveying & Geomatics',
      'Bachelor of Construction Management & Building Economics',
    ],
    careerPaths: [
      'Civil & Structural Engineer',
      'Registered Architect & CAD Draughtsman',
      'Quantity Surveyor & Cost Engineer',
      'Mechanical Design Engineer',
      'Land Surveyor & Geomatics Engineer',
    ],
    admissionNote:
      'Widely recognized by Makerere, Kyambogo, and technical universities as a top direct-entry combination for Engineering, Architecture, and Construction faculties.',
  },
  BCFN: {
    overview:
      'Integrates Biology, Chemistry, and Food & Nutrition (FN), preparing students for clinical nutrition, food science & technology, dietetics, and public health programmes.',
    universityCourses: [
      'Bachelor of Science in Human Nutrition & Dietetics',
      'Bachelor of Science in Food Science & Technology',
      'Bachelor of Science in Biochemistry & Biotechnology',
      'Bachelor of Hospitality, Catering & Food Service Management',
      'Bachelor of Public Health & Community Nutrition',
    ],
    careerPaths: [
      'Clinical Nutritionist & Registered Dietitian',
      'Food Technologist & Quality Assurance Specialist',
      'Public Health & Maternal Nutrition Officer',
      'Hospitality & Culinary Operations Director',
      'Food Safety & Regulatory Inspector',
    ],
    admissionNote:
      'Biology and Chemistry provide core life-science eligibility while Food & Nutrition offers specialized preparation for Food Science and Dietetics degrees.',
  },
  BioAgricFN: {
    overview:
      'Connects Biology, Agriculture, and Food & Nutrition (FN) across the entire food value chain—from sustainable crop & livestock production to post-harvest processing and nutrition.',
    universityCourses: [
      'Bachelor of Science in Agriculture & Agronomy',
      'Bachelor of Science in Human Nutrition & Food Processing',
      'Bachelor of Agribusiness Management & Rural Development',
      'Bachelor of Science in Food Science & Post-Harvest Technology',
      'Bachelor of Science with Education (Biology / Agriculture)',
    ],
    careerPaths: [
      'Agronomist & Agricultural Extension Specialist',
      'Food Processing & Nutrition Programme Officer',
      'Agribusiness Manager & Value-Chain Consultant',
      'Community Food Security Coordinator (NGO/FAO)',
      'Agriculture & Biology Educator',
    ],
    admissionNote:
      'Strong applied life-science pathway tailored for Agricultural Sciences, Food & Nutrition, Agribusiness, and Rural Development faculties.',
  },
  BioAgriChem: {
    overview:
      'Unites Biology, Agriculture, and Chemistry for modern scientific farming, veterinary & animal sciences, soil chemistry, biotechnology, and agricultural research.',
    universityCourses: [
      'Bachelor of Veterinary Medicine & Animal Production',
      'Bachelor of Science in Agricultural Sciences & Soil Science',
      'Bachelor of Science in Agricultural Biotechnology & Crop Protection',
      'Bachelor of Science in Food Science & Agribusiness',
      'Bachelor of Science in Environmental & Natural Resource Management',
    ],
    careerPaths: [
      'Veterinary Officer & Animal Scientist',
      'Soil & Agricultural Research Chemist',
      'Crop Breeder & Plant Pathologist',
      'Agro-Chemical Technical Specialist',
      'Agribusiness & Farm Operations Director',
    ],
    admissionNote:
      'Biology and Chemistry unlock Veterinary Medicine, Biotechnology, and Agriculture degrees at Makerere (CAES/COVAB), Gulu, and Busitema universities.',
  },
  PCB: {
    overview:
      'The flagship Medical & Health Sciences combination (the sole track combining Physics and Biology), specifically designed for clinical medicine and life sciences.',
    universityCourses: [
      'Bachelor of Medicine & Bachelor of Surgery (MBChB)',
      'Bachelor of Pharmacy & Bachelor of Dental Surgery',
      'Bachelor of Science in Nursing & Midwifery',
      'Bachelor of Veterinary Medicine & Biomedical Sciences',
      'Bachelor of Medical Radiography & Physiotherapy',
    ],
    careerPaths: [
      'Medical Doctor, Surgeon & Specialist Physician',
      'Pharmacist & Clinical Pharmacologist',
      'Dental Surgeon & Orthodontist',
      'Registered Nurse Practitioner & Health Leader',
      'Veterinary Surgeon & Biomedical Scientist',
    ],
    admissionNote:
      'Mandatory prerequisite combination for Medicine, Surgery, Pharmacy, Dentistry, and Veterinary Medicine at Makerere, Mbarara (MUST), and KIU.',
  },
  MtcEconTD: {
    overview:
      'Pairs Mathematics and Economics with Technical Drawing (TD), forming a powerful quantitative & design foundation for Quantity Surveying, Land Economics, and Construction Finance.',
    universityCourses: [
      'Bachelor of Science in Quantity Surveying',
      'Bachelor of Science in Land Economics & Real Estate Valuation',
      'Bachelor of Construction Management & Building Economics',
      'Bachelor of Urban & Regional Planning',
      'Bachelor of Economics & Industrial Management',
    ],
    careerPaths: [
      'Quantity Surveyor & Construction Estimator',
      'Property Valuer & Land Economist',
      'Construction Project Manager',
      'Urban & Infrastructure Planner',
      'Real Estate Development Analyst',
    ],
    admissionNote:
      'Mathematics and Technical Drawing align directly with Built Environment & Surveying programmes while Economics powers Valuation and Project Economics.',
  },
  TDEconArt: {
    overview:
      'Blends Technical Drawing (TD), Economics, and Art & Design for interior architecture, product design, construction commerce, and creative real estate.',
    universityCourses: [
      'Bachelor of Industrial & Fine Arts',
      'Bachelor of Interior, Furniture & Product Design',
      'Bachelor of Construction Economics & Property Management',
      'Bachelor of Vocational & Technical Education (Design / TD)',
      'Bachelor of Business Administration & Creative Enterprise',
    ],
    careerPaths: [
      'Interior Architect & Spatial Designer',
      'CAD & Technical Product Illustrator',
      'Furniture & Industrial Design Entrepreneur',
      'Real Estate & Architectural Marketer',
      'Technical Drawing & Art Educator',
    ],
    admissionNote:
      'Bridges technical drafting, visual creativity, and commercial economics for Design Schools, Vocational Universities, and Real Estate.',
  },
  GeoArtEcon: {
    overview:
      'Combines Geography, Art & Design, and Economics—tailored for spatial design, urban aesthetics, landscape planning, tourism, and creative commerce.',
    universityCourses: [
      'Bachelor of Urban & Regional Planning',
      'Bachelor of Industrial & Fine Arts',
      'Bachelor of Landscape Design & Environmental Art',
      'Bachelor of Tourism & Hospitality Management',
      'Bachelor of Real Estate & Property Valuation',
    ],
    careerPaths: [
      'Urban Planner & Cartographic Illustrator',
      'Landscape & Environmental Designer',
      'Real Estate Developer & Design Consultant',
      'Tourism & Hospitality Creative Director',
      'Creative Entrepreneur & Brand Designer',
    ],
    admissionNote:
      'Balanced spatial, economic, and creative portfolio ideal for Urban Planning, Fine Art, Tourism, and Built Environment programmes.',
  },
  GEE: {
    overview:
      'Unites Geography, Economics, and Entrepreneurship for real estate enterprise, agribusiness, logistics, tourism management, and regional economic development.',
    universityCourses: [
      'Bachelor of Entrepreneurship & Small Business Management',
      'Bachelor of Urban Planning / Land Economics',
      'Bachelor of Tourism, Travel & Hospitality Management',
      'Bachelor of Procurement, Logistics & Supply Chain Management',
      'Bachelor of Agribusiness & Environmental Economics',
    ],
    careerPaths: [
      'Real Estate Entrepreneur & Property Manager',
      'Tourism & Hospitality Venture Founder',
      'Supply Chain & Logistics Director',
      'Environmental & Economic Consultant',
      'SME & Agribusiness Strategist',
    ],
    admissionNote:
      'Strongly positioned for Makerere University Business School (MUBS), Land Economics, Tourism, and Entrepreneurship degrees.',
  },
  HEG: {
    overview:
      'One of Uganda’s most versatile Humanities & Social Sciences combinations, opening virtually every Law, Business, Planning, and Governance university degree.',
    universityCourses: [
      'Bachelor of Laws (LLB)',
      'Bachelor of Economics & Development Economics',
      'Bachelor of Urban & Regional Planning / Land Economics',
      'Bachelor of Business Administration & Commerce',
      'Bachelor of International Relations & Diplomacy',
    ],
    careerPaths: [
      'Advocate, Magistrate & Legal Counsel',
      'Economist & Policy Advisor',
      'Urban Planner & Real Estate Valuer',
      'Diplomat & Foreign Service Officer',
      'Corporate Executive & Financial Manager',
    ],
    admissionNote:
      'Top-ranked Arts combination for Makerere Law School (with strong pre-entry performance), Economics, Urban Planning, and Public Administration.',
  },
  HEL: {
    overview:
      'Combines analytical History and Economics with Literature’s critical reading and writing mastery—ideal for Law, Media, Diplomacy, and Corporate Leadership.',
    universityCourses: [
      'Bachelor of Laws (LLB)',
      'Bachelor of Journalism & Communication',
      'Bachelor of Arts in Economics & Social Sciences',
      'Bachelor of International Relations & Diplomatic Studies',
      'Bachelor of Arts with Education (History / Literature / Economics)',
    ],
    careerPaths: [
      'Attorney, Legal Researcher & Judge',
      'Broadcast Journalist, Editor & Media Director',
      'Public Relations & Corporate Communications Lead',
      'Diplomat & Policy Analyst',
      'Author, Publisher & Academic',
    ],
    admissionNote:
      'Literature and History sharpen persuasive argumentation and legal reasoning, making HEL a classic pathway to Law and Journalism.',
  },
  HED: {
    overview:
      'Rooted in History, Economics, and Divinity, cultivating ethical leadership, governance insight, and social-economic analysis for Law and Public Service.',
    universityCourses: [
      'Bachelor of Laws (LLB)',
      'Bachelor of Social Work & Social Administration (SWASA)',
      'Bachelor of Ethics & Human Rights / Development Studies',
      'Bachelor of Public Administration & Governance',
      'Bachelor of Commerce / Business Administration',
    ],
    careerPaths: [
      'Lawyer, Human Rights Advocate & Legal Advisor',
      'Social Worker & NGO Programme Director',
      'Civil Servant & Public Policy Specialist',
      'Business Administrator & Ethics Officer',
      'Chaplain, Counselor & Educator',
    ],
    admissionNote:
      'Strong Humanities foundation weighted favorably for Law, SWASA, Development Studies, and Human Resource Management.',
  },
  HEI: {
    overview:
      'Integrates History, Economics, and Islamic Studies to build strong grounding in ethics, jurisprudence, governance, and socio-economic development.',
    universityCourses: [
      'Bachelor of Laws (LLB) & Comparative Jurisprudence',
      'Bachelor of Islamic Banking & Finance',
      'Bachelor of Public Administration & Development Studies',
      'Bachelor of Social Work & Social Administration',
      'Bachelor of Arts with Education',
    ],
    careerPaths: [
      'Legal Practitioner & Sharia / Financial Advisor',
      'Islamic Banking & Microfinance Specialist',
      'Community Development & NGO Manager',
      'Public Administrator & Educator',
      'Policy & Ethics Consultant',
    ],
    admissionNote:
      'Provides direct eligibility for Humanities, Law, Finance, and Education degree programmes across public and private universities.',
  },
  HEEnt: {
    overview:
      'Unites History and Economics with practical Entrepreneurship for future founders, corporate strategists, procurement leaders, and commercial lawyers.',
    universityCourses: [
      'Bachelor of Entrepreneurship & Small Business Management',
      'Bachelor of Business Administration / Commerce (BCom)',
      'Bachelor of Procurement & Supply Chain Management',
      'Bachelor of Laws (LLB)',
      'Bachelor of Economics & Finance',
    ],
    careerPaths: [
      'Business Founder & Venture Strategist',
      'Corporate Finance & Commercial Banker',
      'Procurement & Logistics Director',
      'Corporate & Commercial Lawyer',
      'Management Consultant',
    ],
    admissionNote:
      'Especially valued at Makerere University Business School (MUBS) and faculties of Commerce, Entrepreneurship, and Business Computing.',
  },
  HEA: {
    overview:
      'Pairs History and Economics with Art & Design, blending creative visual direction with commercial acumen for branding, architecture-adjacent design, and cultural enterprise.',
    universityCourses: [
      'Bachelor of Industrial & Fine Arts',
      'Bachelor of Graphic Design & Visual Communication',
      'Bachelor of Business Administration & Marketing',
      'Bachelor of Interior & Product Design',
      'Bachelor of Heritage & Museum Studies',
    ],
    careerPaths: [
      'Creative Director & Brand Strategist',
      'Graphic, UI/UX & Product Designer',
      'Art Entrepreneur & Gallery Curator',
      'Marketing & Advertising Executive',
      'Fine Arts Educator',
    ],
    admissionNote:
      'Connects Margaret Trowell School of Industrial & Fine Arts pathways with strong business and economics versatility.',
  },
  EGA: {
    overview:
      'Combines Economics, Geography, and Art & Design—tailored for spatial design, urban aesthetics, landscape architecture, and creative commerce.',
    universityCourses: [
      'Bachelor of Industrial & Fine Arts',
      'Bachelor of Urban & Regional Planning',
      'Bachelor of Landscape Design & Environmental Art',
      'Bachelor of Tourism & Hospitality Management',
      'Bachelor of Real Estate & Property Management',
    ],
    careerPaths: [
      'Spatial & Interior Designer',
      'Urban Planner & Cartographic Illustrator',
      'Real Estate Developer & Design Consultant',
      'Creative Entrepreneur & Brand Designer',
      'Tourism & Hospitality Creative Lead',
    ],
    admissionNote:
      'Balanced spatial, economic, and creative portfolio ideal for Fine Art, Urban Planning, and Design programmes.',
  },
  FHL: {
    overview:
      'A prestigious Languages & Humanities combination uniting French, History, and Literature for diplomacy, international NGOs, translation, and global media.',
    universityCourses: [
      'Bachelor of International Relations & Diplomatic Studies',
      'Bachelor of Journalism, Media & Mass Communication',
      'Bachelor of Arts in Languages & Translation Studies',
      'Bachelor of Laws (LLB)',
      'Bachelor of Tourism & Foreign Languages',
    ],
    careerPaths: [
      'Diplomat & Embassy Attache',
      'Bilingual Translator & Conference Interpreter',
      'International Journalist & Media Producer',
      'International NGO & UN Programme Officer',
      'Foreign Language Educator',
    ],
    admissionNote:
      'Bilingual French fluency alongside Literature and History creates standout eligibility for diplomatic, UN, and international hospitality careers.',
  },
  KHL: {
    overview:
      'Pairs Kiswahili with History and Literature—positioning graduates at the forefront of East African regional integration, media, law, and cultural leadership.',
    universityCourses: [
      'Bachelor of Arts in Kiswahili & East African Studies',
      'Bachelor of Journalism & Communication',
      'Bachelor of Laws (LLB)',
      'Bachelor of International Business & Regional Trade',
      'Bachelor of Arts with Education',
    ],
    careerPaths: [
      'East African Community (EAC) Policy & Trade Officer',
      'Swahili & English Broadcast Journalist',
      'Advocate & Cross-Border Legal Consultant',
      'Translator, Editor & Author',
      'Secondary School & University Educator',
    ],
    admissionNote:
      'Kiswahili is an official EAC & African Union working language, boosting employability across regional government, trade, and media bodies.',
  },
};

const SUBJECT_COURSE_MAP: Record<string, { courses: string[]; careers: string[]; strength: string }> = {
  History: {
    courses: ['Bachelor of Laws (LLB)', 'International Relations & Diplomacy', 'Public Administration'],
    careers: ['Lawyer / Legal Counsel', 'Diplomat & Policy Analyst', 'Public Sector Administrator'],
    strength: 'historical analysis, governance, and legal reasoning',
  },
  Economics: {
    courses: ['Bachelor of Economics / BCom', 'Business Administration & Finance', 'Development Economics'],
    careers: ['Economist & Financial Analyst', 'Banker & Investment Advisor', 'Business Strategist'],
    strength: 'economic policy, market analysis, and financial decision-making',
  },
  Geography: {
    courses: ['Urban & Regional Planning', 'Environmental Management', 'Tourism & Hospitality Management'],
    careers: ['Urban & Land Planner', 'Environmental Consultant', 'GIS & Tourism Specialist'],
    strength: 'spatial planning, environmental systems, and resource management',
  },
  Literature: {
    courses: ['Journalism & Mass Communication', 'Bachelor of Laws (LLB)', 'Literature & Publishing'],
    careers: ['Journalist & Media Editor', 'Corporate Communications Lead', 'Author & Legal Writer'],
    strength: 'persuasive writing, critical inquiry, and media communication',
  },
  Divinity: {
    courses: ['Social Work & Social Administration (SWASA)', 'Ethics & Human Rights', 'Development Studies'],
    careers: ['Human Rights & NGO Advocate', 'Social Worker & Counselor', 'Ethics & Community Leader'],
    strength: 'ethical governance, human rights, and community leadership',
  },
  Islam: {
    courses: ['Islamic Banking & Finance', 'Comparative Law & Jurisprudence', 'Social Administration'],
    careers: ['Ethical Finance Specialist', 'Legal & Community Advisor', 'NGO & Education Leader'],
    strength: 'moral jurisprudence, community ethics, and social stewardship',
  },
  Entrepreneurship: {
    courses: ['Entrepreneurship & Small Business Management', 'Procurement & Supply Chain', 'Marketing & Commerce'],
    careers: ['Startup Founder & SME Director', 'Procurement & Logistics Manager', 'Brand & Sales Strategist'],
    strength: 'venture creation, enterprise management, and commercial strategy',
  },
  'Art & Design': {
    courses: ['Bachelor of Industrial & Fine Arts', 'Graphic, Fashion & Interior Design', 'Visual Communication'],
    careers: ['Graphic & UI/UX Designer', 'Creative Art Director', 'Interior & Product Designer'],
    strength: 'visual design, studio craftsmanship, and creative direction',
  },
  Luganda: {
    courses: ['African Languages & Linguistics', 'Mass Communication & Broadcasting', 'Education & Cultural Heritage'],
    careers: ['Broadcast Presenter & Producer', 'Translator & Cultural Specialist', 'Educator & Archivist'],
    strength: 'indigenous linguistics, cultural heritage, and community media',
  },
  French: {
    courses: ['International Relations & Diplomacy', 'Foreign Languages & Translation', 'Global Tourism Management'],
    careers: ['Diplomat & UN Liaison Officer', 'French-English Interpreter', 'International Hospitality Manager'],
    strength: 'international diplomacy, bilingual fluency, and global affairs',
  },
  Kiswahili: {
    courses: ['Kiswahili & Regional Integration Studies', 'Broadcast Journalism', 'Cross-Border Trade & Education'],
    careers: ['EAC Regional Officer', 'Swahili Media Broadcaster', 'Educator & Translator'],
    strength: 'East African communication, regional commerce, and media',
  },
};

export function getCombinationGuidance(combo: ALevelCombination): CombinationCareerGuidance {
  const explicit = EXPLICIT_COMBINATION_GUIDANCE[combo.code];
  if (explicit) {
    return explicit;
  }

  const [s1, s2, s3] = combo.subjects;
  const profiles = [s1, s2, s3].map((subject) => SUBJECT_COURSE_MAP[subject]).filter(Boolean);

  const uniqueCourses: string[] = [];
  const uniqueCareers: string[] = [];

  for (const profile of profiles) {
    for (const course of profile.courses) {
      if (!uniqueCourses.includes(course) && uniqueCourses.length < 5) {
        uniqueCourses.push(course);
      }
    }
    for (const career of profile.careers) {
      if (!uniqueCareers.includes(career) && uniqueCareers.length < 5) {
        uniqueCareers.push(career);
      }
    }
  }

  if (!uniqueCourses.includes('Bachelor of Arts with Education')) {
    uniqueCourses.push('Bachelor of Arts with Education');
  }

  const strengths = profiles.map((p) => p.strength);
  const overview = `Combines ${s1}, ${s2}, and ${s3}—integrating ${strengths.join('; ')} for versatile Arts, Humanities, Law, Communication, and Enterprise university degrees.`;

  return {
    overview,
    universityCourses: uniqueCourses.slice(0, 5),
    careerPaths: uniqueCareers.slice(0, 5),
    admissionNote: `Paired with ${combo.subsidiary}, this ${combo.code} combination fulfills standard UNEB UACE principal-pass requirements for Arts, Humanities, Management, and Education programmes.`,
  };
}


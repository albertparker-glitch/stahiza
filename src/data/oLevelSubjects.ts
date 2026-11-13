import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Beaker,
  BookMarked,
  BookOpen,
  BookText,
  Briefcase,
  Calculator,
  Dna,
  DraftingCompass,
  Dumbbell,
  Globe,
  HeartHandshake,
  Landmark,
  Languages,
  Laptop,
  MessageSquare,
  MessagesSquare,
  Palette,
  Sprout,
  Utensils,
} from 'lucide-react';

export interface OLevelSubject {
  code: string;
  name: string;
  category: 'Compulsory Core' | 'Elective & Applied';
  focus: string;
  assessment: string;
  icon: LucideIcon;
}

export const O_LEVEL_SUBJECTS: OLevelSubject[] = [
  // Compulsory Core Subjects
  {
    code: 'ENG',
    name: 'English Language',
    category: 'Compulsory Core',
    focus: 'Grammar, comprehension, summary, oral fluency, and formal/creative writing across all subjects.',
    assessment: 'UNEB UCE Written Papers & Continuous School Assessment',
    icon: BookText,
  },
  {
    code: 'MTC',
    name: 'Mathematics',
    category: 'Compulsory Core',
    focus: 'Algebra, geometry, trigonometry, probability, statistics, and real-world quantitative problem-solving.',
    assessment: 'UNEB UCE Papers 1 & 2 + Project Work',
    icon: Calculator,
  },
  {
    code: 'BIO',
    name: 'Biology',
    category: 'Compulsory Core',
    focus: 'Cell structure, human physiology, genetics, ecology, and hands-on biological laboratory practicals.',
    assessment: 'UNEB UCE Theory & Laboratory Practical Exam',
    icon: Dna,
  },
  {
    code: 'CHEM',
    name: 'Chemistry',
    category: 'Compulsory Core',
    focus: 'Atomic bonding, chemical reactions, qualitative & volumetric analysis, and industrial chemistry.',
    assessment: 'UNEB UCE Theory & Chemistry Lab Practical',
    icon: Beaker,
  },
  {
    code: 'PHY',
    name: 'Physics',
    category: 'Compulsory Core',
    focus: 'Mechanics, heat, optics, electricity, magnetism, waves, and experimental lab measurements.',
    assessment: 'UNEB UCE Theory & Physics Lab Practical',
    icon: Atom,
  },
  {
    code: 'GEO',
    name: 'Geography',
    category: 'Compulsory Core',
    focus: 'Physical landforms, climate, map reading, fieldwork, and East African & global human geography.',
    assessment: 'UNEB UCE Papers 1 & 2 + Fieldwork Study',
    icon: Globe,
  },
  {
    code: 'HIST',
    name: 'History & Political Education',
    category: 'Compulsory Core',
    focus: 'East African heritage, governance, constitutionalism, pan-Africanism, and modern world affairs.',
    assessment: 'UNEB UCE Historical & Civic Analysis Papers',
    icon: Landmark,
  },
  {
    code: 'ENT',
    name: 'Entrepreneurship Education',
    category: 'Compulsory Core',
    focus: 'Business ideation, basic accounting, financial literacy, marketing, and enterprise management.',
    assessment: 'UNEB UCE Theory & Practical Business Project',
    icon: Briefcase,
  },
  {
    code: 'PE',
    name: 'Physical Education',
    category: 'Compulsory Core',
    focus: 'Physical conditioning, sports rules, athletics, teamwork, and personal health & wellness.',
    assessment: 'Continuous Practical Sports & Fitness Assessment',
    icon: Dumbbell,
  },
  {
    code: 'CRE',
    name: 'Christian Religious Education (CRE)',
    category: 'Compulsory Core',
    focus: 'Christian ethics, scripture interpretation, family life, social justice, and moral leadership.',
    assessment: 'UNEB UCE Ethics & Scripture Papers',
    icon: HeartHandshake,
  },
  {
    code: 'IRE',
    name: 'Islamic Religious Education (IRE)',
    category: 'Compulsory Core',
    focus: 'Islamic morals, Quranic teachings, Hadith, jurisprudence, and civic responsibility.',
    assessment: 'UNEB UCE Theory & Moral Studies Papers',
    icon: BookOpen,
  },

  // Elective, Vocational & Language Subjects
  {
    code: 'ICT',
    name: 'ICT / Computer Studies',
    category: 'Elective & Applied',
    focus: 'Word processing, spreadsheets, databases, presentations, web design, and computer hardware.',
    assessment: 'UNEB UCE Theory & Computer Lab Practical Exam',
    icon: Laptop,
  },
  {
    code: 'AGRIC',
    name: 'Agriculture',
    category: 'Elective & Applied',
    focus: 'Crop husbandry, livestock management, soil science, farm tools, and sustainable agribusiness.',
    assessment: 'UNEB UCE Theory & School Farm Practical',
    icon: Sprout,
  },
  {
    code: 'TD',
    name: 'Technical Drawing',
    category: 'Elective & Applied',
    focus: 'Geometric constructions, orthographic & isometric projections, and foundational engineering drafting.',
    assessment: 'UNEB UCE Mechanical & Building Drawing Papers',
    icon: DraftingCompass,
  },
  {
    code: 'ART',
    name: 'Art & Design',
    category: 'Elective & Applied',
    focus: 'Still life drawing, painting, graphic communication, textiles, sculpture, and studio craft.',
    assessment: 'UNEB UCE Studio Practicals & Art History',
    icon: Palette,
  },
  {
    code: 'FN',
    name: 'Nutrition & Food Technology',
    category: 'Elective & Applied',
    focus: 'Human nutrition, balanced meal preparation, food hygiene, preservation, and culinary science.',
    assessment: 'UNEB UCE Theory & Cookery Practical Exam',
    icon: Utensils,
  },
  {
    code: 'LIT',
    name: 'Literature in English',
    category: 'Elective & Applied',
    focus: 'Novel, drama, and poetry appreciation, African & world literature, and critical essay writing.',
    assessment: 'UNEB UCE Literary Texts & Appreciation Exam',
    icon: BookMarked,
  },
  {
    code: 'LUG',
    name: 'Luganda',
    category: 'Elective & Applied',
    focus: 'Luganda grammar, composition, translation, proverbs, and cultural oral & written literature.',
    assessment: 'UNEB UCE Language & Literature Papers',
    icon: MessageSquare,
  },
  {
    code: 'KIS',
    name: 'Kiswahili',
    category: 'Elective & Applied',
    focus: 'East African functional communication, Kiswahili grammar, reading comprehension, and composition.',
    assessment: 'UNEB UCE Language & Oral Fluency Assessment',
    icon: MessagesSquare,
  },
  {
    code: 'FRE',
    name: 'French',
    category: 'Elective & Applied',
    focus: 'Foundational French speaking, listening, reading comprehension, grammar, and global culture.',
    assessment: 'UNEB UCE Written & Oral Language Exam',
    icon: Languages,
  },
];

export const O_LEVEL_CORE_SUBJECTS = O_LEVEL_SUBJECTS.filter((s) => s.category === 'Compulsory Core');
export const O_LEVEL_ELECTIVE_SUBJECTS = O_LEVEL_SUBJECTS.filter((s) => s.category === 'Elective & Applied');

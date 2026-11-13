import { getSupabasePublicUrl, getSupabaseOthersUrl } from '../lib/supabase';

export interface FacilityPhoto {
  url: string;
  caption: string;
  fallbackUrl?: string;
}

export interface CampusFacility {
  id: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
  fallbackImg?: string;
  gallery: FacilityPhoto[];
}

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'science-labs',
    title: 'Modern Science Labs',
    desc: 'Equipped Physics, Chemistry, and Biology laboratories for hands-on experiments and UNEB practical exams.',
    tag: 'Physics, Chem & Biology',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    fallbackImg: '/pages/images/odeke.jpeg',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Equipped UNEB Physics & Chemistry Practical Stations',
        fallbackUrl: '/pages/images/odeke.jpeg'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hands-on Science Apparatus & Reagents Demonstration'
      },
      {
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
        caption: 'Biology Specimen Analysis & Scientific Research'
      }
    ]
  },
  {
    id: 'computer-lab',
    title: 'Computer Laboratory',
    desc: 'High-speed internet workstations for ICT practicals, coding, and national examinations.',
    tag: 'ICT & Digital Research',
    img: getSupabaseOthersUrl('complab.jpeg'),
    fallbackImg: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: getSupabaseOthersUrl('complab.jpeg'),
        caption: 'STAHIZA Modern High-Speed Computer Laboratory',
        fallbackUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
        caption: 'Digital Workstations for UNEB ICT Practicals'
      },
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student Coding, Digital Research & E-Learning'
      }
    ]
  },
  {
    id: 'dormitories',
    title: 'Comfortable Dormitories',
    desc: 'Secure, warden-supervised boarding residences with running water and quiet study areas.',
    tag: 'Boarding & Resident Life',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImg: '/pages/images/bena.jpeg',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Secure & Spacious Student Boarding Quarters',
        fallbackUrl: '/pages/images/bena.jpeg'
      },
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        caption: 'Supervised Evening Study Desks & Restful Living'
      }
    ]
  },
  {
    id: 'dining-hall',
    title: 'Spacious Dining Hall',
    desc: 'Nutritious, balanced meals prepared under strict culinary hygiene standards.',
    tag: 'Food & Nutrition Center',
    img: getSupabaseOthersUrl('fnst.jpeg'),
    fallbackImg: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: getSupabaseOthersUrl('fnst.jpeg'),
        caption: 'STAHIZA Main Student Dining & Nutrition Complex',
        fallbackUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spacious Seating & Orderly Meal Serving Hall'
      },
      {
        url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&q=80',
        caption: 'Clean Food Service & Quality Student Catering'
      }
    ]
  },
  {
    id: 'sports-grounds',
    title: 'Sports Grounds & Courts',
    desc: 'Full-size football pitch, basketball, and netball courts home to national champions.',
    tag: 'Football, Netball & Courts',
    img: getSupabaseOthersUrl('hand.jpeg'),
    fallbackImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: getSupabaseOthersUrl('hand.jpeg'),
        caption: 'STAHIZA National Championship Handball & Sports Arena',
        fallbackUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Full-Size Football Pitch & Athletics Track'
      },
      {
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tournament Basketball & Netball Courts'
      }
    ]
  },
  {
    id: 'library',
    title: 'School Library & Resource Center',
    desc: 'Curriculum textbooks, encyclopedias, past UNEB papers, and dedicated silent study zones.',
    tag: 'Quiet Study & Archives',
    img: getSupabaseOthersUrl('dedication 2026 s4.jpeg'),
    fallbackImg: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: getSupabaseOthersUrl('dedication 2026 s4.jpeg'),
        caption: 'STAHIZA Candidate Dedication & Resource Center',
        fallbackUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Quiet Individual Study Desks & Reference Sections'
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Comprehensive UNEB Archives & National Curriculum Texts'
      }
    ]
  }
];

export const HERO_VIDEO_POSTER_URL = getSupabaseOthersUrl('dedication 2026 s4.jpeg');

export const CAMPUS_VIDEO_POSTERS: Record<string, string> = {
  life1: getSupabaseOthersUrl('hand.jpeg'),
  life2: getSupabaseOthersUrl('complab.jpeg'),
  life3: getSupabaseOthersUrl('dedication 2026 s4.jpeg'),
  life4: getSupabaseOthersUrl('mdd.jpeg'),
  life5: getSupabaseOthersUrl('best st.jpeg'),
  life6: getSupabaseOthersUrl('code.jpg'),
  life7: getSupabaseOthersUrl('fnst.jpeg'),
  life8: getSupabaseOthersUrl('scrablle.jpeg'),
};

export const YOUTUBE_POSTER_IDS = [
  // Campus Life Events
  'Pc0OiyHmoSI',
  '0MNWG5ejKh0',
  '0mREMbnzPSY',
  // Sports Highlights
  'xt0ocUlNoHs',
  '2k3VkRBNUnI',
  // Academics Highlights
  'L_k2lMeINqo',
  '6xILoTUTEME',
  'jubC506SVfI',
  'P6dxdxyeBko',
  '4ZXlyjdoJOg'
];

export function getHeroPreloadImageUrls(dynamicHeroUrls: string[] = []): string[] {
  const baseUrls = [
    getSupabasePublicUrl('badge.png'),
    '/pages/images/badge.png',
    HERO_VIDEO_POSTER_URL
  ];
  return Array.from(new Set([...baseUrls, ...dynamicHeroUrls].filter(Boolean)));
}

export function getFacilityGalleryImageUrls(): string[] {
  const urls: string[] = [];
  for (const facility of CAMPUS_FACILITIES) {
    if (facility.img) urls.push(facility.img);
    if (facility.fallbackImg) urls.push(facility.fallbackImg);
    for (const photo of facility.gallery) {
      if (photo.url) urls.push(photo.url);
      if (photo.fallbackUrl) urls.push(photo.fallbackUrl);
    }
  }
  return Array.from(new Set(urls));
}

export function getCampusVideoPosterUrls(): string[] {
  const localPosters = Object.values(CAMPUS_VIDEO_POSTERS);
  const ytPosters = YOUTUBE_POSTER_IDS.map((id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`);
  return Array.from(new Set([...localPosters, ...ytPosters].filter(Boolean)));
}

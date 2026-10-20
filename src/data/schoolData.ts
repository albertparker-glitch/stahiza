import { supabase, getSupabasePublicUrl, getSupabaseOthersUrl, getSupabaseAcademicsUrl } from '../lib/supabase';

export interface Leader {
  role: string;
  name: string;
  img: string;
}

export interface TopStudent {
  name: string;
  level: 'O-Level' | 'A-Level';
  combinationOrStream: string;
  pointsOrAs: string;
  img: string;
}

export const FALLBACK_LEADERS: Leader[] = [
  {
    role: "Headteacher",
    name: "Mr. Kurahuka Ostricast",
    img: getSupabasePublicUrl("ostricast.jpeg")
  },
  {
    role: "Deputy Headteacher",
    name: "Mrs. Mbabazi Bena",
    img: getSupabasePublicUrl("bena.jpeg")
  },
  {
    role: "Deputy Headteacher (Academics)",
    name: "Mr. Odeke Leonard",
    img: getSupabasePublicUrl("odeke.jpeg")
  },
  {
    role: "Dean Arts",
    name: "Mr. Kyeyune Andrew",
    img: getSupabasePublicUrl("odeke.jpeg")
  },
  {
    role: "Dean Sciences",
    name: "Mr. Waiswa Adi",
    img: getSupabasePublicUrl("odeke.jpeg")
  },
  {
    role: "DOS",
    name: "Mr. Kahesi Hillary",
    img: getSupabasePublicUrl("hillary.jpeg")
  },
  {
    role: "Prefects",
    name: "STAHIZA Cabinet 2025-2026",
    img: getSupabasePublicUrl("prefects2025.png")
  },
  {
    role: "#Top",
    name: "Head Prefects",
    img: getSupabasePublicUrl("top.jpeg")
  },
  {
    role: "UNSA Presidents 2024, 2025, 2026, 2027",
    name: "Sharif, Wasswa, Brian, Mugisha",
    img: getSupabasePublicUrl("unsap.jpeg")
  },
];

export const FALLBACK_MARQUEE_STAFF: Leader[] = [
  {
    role: "Staff / Teacher",
    name: "Girls Fc Trophy",
    img: getSupabaseOthersUrl("hand.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Best student Term 2, 2026",
    img: getSupabaseOthersUrl("best st.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Scrabble Team",
    img: getSupabaseOthersUrl("scrablle.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Dedication 2026 s4",
    img: getSupabaseOthersUrl("dedication 2026 s4.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Muslims Success to S4",
    img: getSupabaseOthersUrl("mus.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Coding Championns",
    img: getSupabaseOthersUrl("code.jpg")
  },
  {
    role: "Staff / Teacher",
    name: "Computer Lab",
    img: getSupabaseOthersUrl("complab.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Food $ Nutrition",
    img: getSupabaseOthersUrl("fnst.jpeg")
  },
  {
    role: "Staff / Teacher",
    name: "Music Dance $ Drama",
    img: getSupabaseOthersUrl("mdd.jpeg")
  },
];

export const FALLBACK_TOP_STUDENTS: TopStudent[] = [
  // A-Level Top 10 (Maroon Theme)
  { name: "Nanteza Mary", level: "A-Level", combinationOrStream: "PEM/ICT", pointsOrAs: "20 Points (20/20)", img: getSupabaseAcademicsUrl("student1.jpeg") },
  { name: "Mwesigwa Ronald", level: "A-Level", combinationOrStream: "BCM/ICT", pointsOrAs: "19 Points", img: getSupabaseAcademicsUrl("student2.jpeg") },
  { name: "Akwero Patricia", level: "A-Level", combinationOrStream: "HEG/ICT", pointsOrAs: "19 Points", img: getSupabaseAcademicsUrl("student3.jpeg") },
  { name: "Kigozi Brian", level: "A-Level", combinationOrStream: "PEM/M", pointsOrAs: "18 Points", img: getSupabaseAcademicsUrl("student4.jpeg") },
  { name: "Nakato Shamim", level: "A-Level", combinationOrStream: "BCM/P", pointsOrAs: "18 Points", img: getSupabaseAcademicsUrl("student5.jpeg") },
  { name: "Okello Emmanuel", level: "A-Level", combinationOrStream: "PCM/ICT", pointsOrAs: "17 Points", img: getSupabaseAcademicsUrl("student6.jpeg") },
  { name: "Namubiru Joan", level: "A-Level", combinationOrStream: "PEM/ICT", pointsOrAs: "17 Points", img: getSupabaseAcademicsUrl("student7.jpeg") },
  { name: "Byaruhanga Denis", level: "A-Level", combinationOrStream: "HEG/E", pointsOrAs: "17 Points", img: getSupabaseAcademicsUrl("student8.jpeg") },
  { name: "Atuhaire Brenda", level: "A-Level", combinationOrStream: "BCM/ICT", pointsOrAs: "16 Points", img: getSupabaseAcademicsUrl("student9.jpeg") },
  { name: "Ssemwogerere Ivan", level: "A-Level", combinationOrStream: "PEM/M", pointsOrAs: "16 Points", img: getSupabaseAcademicsUrl("student10.jpeg") },

  // O-Level Top 10 (Navy Blue Theme)
  { name: "Mukasa Joshua", level: "O-Level", combinationOrStream: "Senior Four West", pointsOrAs: "9 D1s (Aggregate 8)", img: getSupabaseAcademicsUrl("ostricast.jpeg") },
  { name: "Tusiime Carol", level: "O-Level", combinationOrStream: "Senior Four East", pointsOrAs: "9 D1s (Aggregate 9)", img: getSupabaseAcademicsUrl("bena.jpeg") },
  { name: "Kibirige Simon", level: "O-Level", combinationOrStream: "Senior Four North", pointsOrAs: "8 D1s, 1 D2", img: getSupabaseAcademicsUrl("odeke.jpeg") },
  { name: "Najjuma Diana", level: "O-Level", combinationOrStream: "Senior Four South", pointsOrAs: "8 D1s, 1 D2", img: getSupabaseAcademicsUrl("hillary.jpeg") },
  { name: "Lubega Aaron", level: "O-Level", combinationOrStream: "Senior Four West", pointsOrAs: "7 D1s, 2 D2s", img: getSupabaseAcademicsUrl("top.jpeg") },
  { name: "Namukasa Prossy", level: "O-Level", combinationOrStream: "Senior Four East", pointsOrAs: "7 D1s, 2 D2s", img: getSupabaseAcademicsUrl("unsap.jpeg") },
  { name: "Wasswa Frank", level: "O-Level", combinationOrStream: "Senior Four North", pointsOrAs: "6 D1s, 3 D2s", img: getSupabaseAcademicsUrl("student1.jpeg") },
  { name: "Nambatya Sumaya", level: "O-Level", combinationOrStream: "Senior Four South", pointsOrAs: "6 D1s, 3 D2s", img: getSupabaseAcademicsUrl("student2.jpeg") },
  { name: "Mugerwa Eric", level: "O-Level", combinationOrStream: "Senior Four West", pointsOrAs: "6 D1s, 2 D2s", img: getSupabaseAcademicsUrl("student3.jpeg") },
  { name: "Apio Rachel", level: "O-Level", combinationOrStream: "Senior Four East", pointsOrAs: "5 D1s, 4 D2s", img: getSupabaseAcademicsUrl("student4.jpeg") },
];

export async function fetchLeaders(): Promise<Leader[]> {
  if (!supabase) {
    return FALLBACK_LEADERS;
  }

  try {
    const { data, error } = await supabase
      .from('leaders')
      .select('role, name, img_url');

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch leaders error or empty, using fallback:', error);
      return FALLBACK_LEADERS;
    }

    return data.map((item: any) => {
      const rawImg = item.img_url || item.img || "odeke.jpeg";
      const imgUrl = rawImg.startsWith('http') ? rawImg : getSupabasePublicUrl(rawImg);
      return {
        role: item.role,
        name: item.name,
        img: imgUrl
      };
    });
  } catch (err) {
    console.error('Supabase exception, using fallback leaders:', err);
    return FALLBACK_LEADERS;
  }
}

export async function fetchMarqueeStaff(): Promise<Leader[]> {
  if (!supabase) {
    return FALLBACK_MARQUEE_STAFF;
  }

  try {
    const { data: files, error } = await supabase.storage
      .from('IMAGES')
      .list('others', {
        limit: 50,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error || !files || files.length === 0) {
      return FALLBACK_MARQUEE_STAFF;
    }

    const validFiles = files.filter(f => f.name && f.name !== '.emptyFolderPlaceholder');
    if (validFiles.length === 0) {
      return FALLBACK_MARQUEE_STAFF;
    }

    const staffList = validFiles.map(file => {
      const fileName = file.name;
      const matched = FALLBACK_MARQUEE_STAFF.find(s => s.img.includes(fileName));
      if (matched) {
        return matched;
      }
      const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      return {
        role: "Staff Member",
        name: formattedName,
        img: getSupabaseOthersUrl(fileName)
      };
    });

    return staffList.length > 0 ? staffList : FALLBACK_MARQUEE_STAFF;
  } catch (err) {
    console.error('Fetch marquee staff storage error:', err);
    return FALLBACK_MARQUEE_STAFF;
  }
}

export async function fetchTopStudents(): Promise<TopStudent[]> {
  if (!supabase) {
    return FALLBACK_TOP_STUDENTS;
  }

  try {
    const { data: files, error } = await supabase.storage
      .from('IMAGES')
      .list('academics', {
        limit: 50,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error || !files || files.length === 0) {
      return FALLBACK_TOP_STUDENTS;
    }

    const validFiles = files.filter(f => f.name && f.name !== '.emptyFolderPlaceholder');
    if (validFiles.length === 0) {
      return FALLBACK_TOP_STUDENTS;
    }

    return validFiles.map((file, idx) => {
      const fileName = file.name;
      const matched = FALLBACK_TOP_STUDENTS.find(s => s.img.includes(fileName));
      if (matched) return matched;

      const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const level = idx < 10 ? 'A-Level' : 'O-Level';
      return {
        name: formattedName,
        level,
        combinationOrStream: level === 'A-Level' ? 'PEM/ICT' : 'Senior Four West',
        pointsOrAs: level === 'A-Level' ? '18 Points' : '8 D1s',
        img: getSupabaseAcademicsUrl(fileName)
      };
    });
  } catch (err) {
    console.error('Fetch top students storage error:', err);
    return FALLBACK_TOP_STUDENTS;
  }
}

export interface CampusVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  tag: string;
}

export interface SchoolVideoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

export const FALLBACK_CAMPUS_VIDEOS: CampusVideo[] = [
  {
    id: "vid-campus-aerial",
    title: "STAHIZA Campus & Gate Aerial Tour",
    videoUrl: getSupabaseOthersUrl("back.mp4"),
    thumbnailUrl: getSupabasePublicUrl("badge.png"),
    tag: "Campus Life"
  },
  {
    id: "vid-sports-champions",
    title: "USSSA National Soccer & Sports Champions",
    videoUrl: getSupabaseOthersUrl("sports.mp4"),
    thumbnailUrl: getSupabaseOthersUrl("hand.jpeg"),
    tag: "Sports Excellence"
  },
  {
    id: "vid-science-labs",
    title: "UNEB Science Practical Experiments",
    videoUrl: getSupabaseOthersUrl("labs.mp4"),
    thumbnailUrl: getSupabaseOthersUrl("complab.jpeg"),
    tag: "Academics"
  }
];

export async function fetchCampusVideos(): Promise<CampusVideo[]> {
  const videos = await fetchSchoolVideos();
  return videos.map(v => ({
    id: v.id,
    title: v.title,
    videoUrl: v.url,
    thumbnailUrl: v.thumbnail || getSupabasePublicUrl("badge.png"),
    tag: v.category
  }));
}

export const FALLBACK_VIDEOS: SchoolVideoItem[] = [
  {
    id: "vid-campus-aerial",
    title: "STAHIZA Campus & Gate Aerial Tour",
    category: "Campus Life",
    url: getSupabaseOthersUrl("back.mp4"),
    thumbnail: getSupabasePublicUrl("badge.png"),
    duration: "0:45"
  },
  {
    id: "vid-sports-champions",
    title: "USSSA National Soccer & Sports Champions",
    category: "Sports Excellence",
    url: getSupabaseOthersUrl("sports.mp4"),
    thumbnail: getSupabaseOthersUrl("hand.jpeg"),
    duration: "1:20"
  },
  {
    id: "vid-science-labs",
    title: "UNEB Science Practical Experiments",
    category: "Academics",
    url: getSupabaseOthersUrl("labs.mp4"),
    thumbnail: getSupabaseOthersUrl("complab.jpeg"),
    duration: "1:05"
  },
  {
    id: "vid-mdd-gala",
    title: "Music, Dance & Drama Cultural Festival",
    category: "Talents & Culture",
    url: getSupabaseOthersUrl("mdd.mp4"),
    thumbnail: getSupabaseOthersUrl("mdd.jpeg"),
    duration: "2:10"
  },
  {
    id: "vid-speech-day",
    title: "Annual Dedication & Speech Day Assembly",
    category: "School Traditions",
    url: getSupabaseOthersUrl("assembly.mp4"),
    thumbnail: getSupabaseOthersUrl("dedication 2026 s4.jpeg"),
    duration: "1:40"
  }
];

export async function fetchSchoolVideos(): Promise<SchoolVideoItem[]> {
  if (!supabase) {
    return FALLBACK_VIDEOS;
  }

  try {
    // Check both 'others' and 'videos' folders in IMAGES bucket
    const { data: files, error } = await supabase.storage
      .from('IMAGES')
      .list('others', {
        limit: 50,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error || !files || files.length === 0) {
      return FALLBACK_VIDEOS;
    }

    const videoExts = ['.mp4', '.webm', '.mov', '.m4v'];
    const videoFiles = files.filter(f => 
      f.name && 
      f.name !== '.emptyFolderPlaceholder' && 
      videoExts.some(ext => f.name.toLowerCase().endsWith(ext))
    );

    if (videoFiles.length === 0) {
      // If no mp4 found directly in 'others', check if 'back.mp4' is accessible
      return FALLBACK_VIDEOS;
    }

    const list: SchoolVideoItem[] = videoFiles.map((file, idx) => {
      const fileName = file.name;
      const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      return {
        id: `supabase-vid-${idx}`,
        title: formattedTitle,
        category: "STAHIZA Media",
        url: getSupabaseOthersUrl(fileName),
        thumbnail: getSupabasePublicUrl("badge.png"),
        duration: "Live Clip"
      };
    });

    return list.length > 0 ? list : FALLBACK_VIDEOS;
  } catch (err) {
    console.error('Fetch school videos storage error:', err);
    return FALLBACK_VIDEOS;
  }
}

export const SCHOOL_CONTACTS = {
  phone1: "+256 772 831 704",
  phone2: "+256 782 316 838",
  email: "stahiza2020@gmail.com",
  location: "Along Entebbe Road, Zzana/Nyanama (≈8 km from Kampala city center)",
  box: "P.O. Box 22981 Kampala - Uganda",
  hours: "Mon – Fri: 7:30 AM – 5:00 PM, Sat: 9:00 AM – 1:00 PM"
};


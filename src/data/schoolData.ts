import { supabase, getSupabasePublicUrl, getSupabaseOthersUrl } from '../lib/supabase';

export interface Leader {
  role: string;
  name: string;
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

// Dedicated marquee  data completely independent of leadership data, extracting images from 'others' folder in IMAGES bucket
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

export interface CampusVideo {
  id: string;
  title: string;
  tag: string;
  duration?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export const FALLBACK_CAMPUS_VIDEOS: CampusVideo[] = [
  {
    id: 'back-tour',
    title: 'STAHIZA Campus Tour & Aerial Highlights',
    tag: 'Campus Overview',
    duration: '0:45',
    videoUrl: getSupabasePublicUrl('back.mp4'),
    thumbnailUrl: getSupabasePublicUrl('ostricast.jpeg')
  },
  {
    id: 'sports-usssa',
    title: 'USSSA National Champions in Action',
    tag: 'USSSA Champions',
    duration: '1:15',
    videoUrl: getSupabaseOthersUrl('hand.jpeg') ? getSupabasePublicUrl('back.mp4') : '/pages/images/back.mp4',
    thumbnailUrl: getSupabaseOthersUrl('hand.jpeg')
  },
  {
    id: 'sciences-lab',
    title: 'Modern Science Labs & UNEB Practicals',
    tag: 'Academics',
    duration: '0:50',
    videoUrl: getSupabasePublicUrl('back.mp4'),
    thumbnailUrl: getSupabaseOthersUrl('complab.jpeg')
  },
  {
    id: 'mdd-showcase',
    title: 'Music, Dance & Drama Cultural Festival',
    tag: 'Co-Curricular',
    duration: '1:30',
    videoUrl: getSupabasePublicUrl('back.mp4'),
    thumbnailUrl: getSupabaseOthersUrl('mdd.jpeg')
  },
  {
    id: 'best-students',
    title: 'Academic Distinction & UNEB Achievers',
    tag: 'Excellence',
    duration: '0:40',
    videoUrl: getSupabasePublicUrl('back.mp4'),
    thumbnailUrl: getSupabaseOthersUrl('best st.jpeg')
  },
  {
    id: 'scrabble-club',
    title: 'STAHIZA National Scrabble Champions',
    tag: 'Talent & Games',
    duration: '0:35',
    videoUrl: getSupabasePublicUrl('back.mp4'),
    thumbnailUrl: getSupabaseOthersUrl('scrablle.jpeg')
  }
];

export async function fetchCampusVideos(): Promise<CampusVideo[]> {
  if (!supabase) {
    return FALLBACK_CAMPUS_VIDEOS;
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
      return FALLBACK_CAMPUS_VIDEOS;
    }

    const videoFiles = files.filter(f => f.name && /\.(mp4|webm|mov|m4v)$/i.test(f.name));

    if (videoFiles.length > 0) {
      return videoFiles.map(file => {
        const fileName = file.name;
        const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        return {
          id: fileName,
          title: formattedName,
          tag: 'Campus Reel',
          duration: '1:00',
          videoUrl: getSupabaseOthersUrl(fileName),
          thumbnailUrl: getSupabaseOthersUrl(fileName.replace(/\.[^/.]+$/, ".jpeg"))
        };
      });
    }

    return FALLBACK_CAMPUS_VIDEOS;
  } catch (err) {
    console.error('Fetch campus videos error:', err);
    return FALLBACK_CAMPUS_VIDEOS;
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

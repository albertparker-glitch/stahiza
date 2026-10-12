import { supabase, getSupabasePublicUrl } from '../lib/supabase';

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
    name: "Mr. Kyeyune",
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
      // If rawImg is just a filename, convert it to Supabase public URL from IMAGES bucket
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

export const SCHOOL_CONTACTS = {
  phone1: "+256 772 831 704",
  phone2: "+256 782 316 838",
  email: "stahiza2020@gmail.com",
  location: "Along Entebbe Road, Zzana/Nyanama (≈8 km from Kampala city center)",
  box: "P.O. Box 22981 Kampala - Uganda",
  hours: "Mon – Fri: 7:30 AM – 5:00 PM, Sat: 9:00 AM – 1:00 PM"
};

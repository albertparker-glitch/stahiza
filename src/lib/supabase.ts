import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export function getSupabasePublicUrl(fileName: string): string {
  if (!supabaseUrl) return `/pages/images/${fileName}`;
  // Clean up leading slash if present
  const cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/${cleanName}`;
}

export function getSupabaseOthersUrl(fileName: string): string {
  if (!supabaseUrl) return `/pages/images/${fileName}`;
  const cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/others/${cleanName}`;
}

export function getSupabaseAcademicsUrl(fileName: string): string {
  if (!supabaseUrl) return `/pages/images/${fileName}`;
  const cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/academics/${cleanName}`;
}

export function getSupabaseVideosUrl(fileName: string): string {
  if (!supabaseUrl) return `/pages/images/${fileName}`;
  const cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/videos/${cleanName}`;
}

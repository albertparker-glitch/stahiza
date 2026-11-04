import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : '') || (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : '') || '';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : '') || (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_ANON_KEY : '') || '';

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
  let cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  if (!cleanName.includes('.')) {
    cleanName = `${cleanName}.mp4`;
  }
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/videos/${cleanName}`;
}

export function getSupabaseVideoUrl(path: string = 'video/back4.mp4'): string {
  if (!supabaseUrl) return `/pages/images/${path.replace(/^.*\//, '')}`;
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  cleanPath = cleanPath.replace(/^images\//i, '');
  return `${supabaseUrl}/storage/v1/object/public/IMAGES/${cleanPath}`;
}


import { AdmissionApplication, ApplicationStatus } from '../types/admission';

const STORAGE_KEY = 'stahiza_admission_applications_v2';

const INITIAL_SEED_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'STH-2026-1024',
    studentName: 'Mukasa Denis',
    gender: 'Male',
    dob: '2010-04-12',
    targetClass: 'S.1',
    residenceType: 'Boarding',
    parentName: 'Mukasa Joseph',
    parentPhone: '+256 772 123 456',
    parentEmail: 'mukasa.j@gmail.com',
    previousSchool: 'Kampala Parents Primary School',
    gradesAggregate: 'Aggregate 7 (PLE)',
    address: 'Zzana, Wakiso',
    submittedAt: '2026-11-04 14:30',
    status: 'Pending Review',
    notes: 'Awaiting primary leaving certificate verification'
  },
  {
    id: 'STH-2026-2048',
    studentName: 'Namubiru Joan',
    gender: 'Female',
    dob: '2008-09-20',
    targetClass: 'S.5',
    residenceType: 'Boarding',
    parentName: 'Namubiru Sarah',
    parentPhone: '+256 782 987 654',
    parentEmail: 'namubiru.s@yahoo.com',
    previousSchool: 'Standard High School Zzana (O-Level)',
    gradesAggregate: '18 Points (UCE)',
    address: 'Entebbe Road, Zzana',
    submittedAt: '2026-11-03 09:15',
    status: 'Approved',
    notes: 'Approved by Headteacher Kurahuka Ostricast'
  }
];

export function getApplications(): AdmissionApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPLICATIONS));
      return INITIAL_SEED_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse local applications store:', err);
    return INITIAL_SEED_APPLICATIONS;
  }
}

export function saveApplications(apps: AdmissionApplication[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    // Trigger custom event for real-time reactivity across components
    window.dispatchEvent(new CustomEvent('stahiza_applications_updated'));
  } catch (err) {
    console.error('Failed to save application to local storage:', err);
  }
}

export function generateRefCode(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `STH-2026-${randomDigits}`;
}

export function submitNewApplication(
  data: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>
): AdmissionApplication {
  const apps = getApplications();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newApp: AdmissionApplication = {
    ...data,
    id: generateRefCode(),
    submittedAt: formattedDate,
    status: 'Pending Review'
  };

  const updated = [newApp, ...apps];
  saveApplications(updated);
  return newApp;
}

export function findApplication(query: string): AdmissionApplication | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  
  const apps = getApplications();
  return apps.find(
    app => app.id.toLowerCase() === q || app.parentEmail.toLowerCase() === q || app.studentName.toLowerCase().includes(q)
  );
}

export function updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): AdmissionApplication | undefined {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return undefined;

  apps[idx] = {
    ...apps[idx],
    status,
    notes: notes !== undefined ? notes : apps[idx].notes
  };

  saveApplications(apps);
  return apps[idx];
}

export function deleteApplication(id: string): void {
  const apps = getApplications();
  const filtered = apps.filter(a => a.id !== id);
  saveApplications(filtered);
}

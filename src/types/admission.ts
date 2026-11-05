export type ClassLevel = 'S.1' | 'S.2' | 'S.3' | 'S.4' | 'S.5' | 'S.6';
export type ResidenceType = 'Boarding' | 'Day';
export type ApplicationStatus = 'Pending Review' | 'Approved';

export interface AdmissionApplication {
  id: string; // e.g. STH-2026-7842
  studentName: string;
  gender: 'Male' | 'Female';
  dob?: string;
  targetClass: ClassLevel;
  residenceType: ResidenceType;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousSchool: string;
  gradesAggregate?: string;
  address?: string;
  submittedAt: string;
  status: ApplicationStatus;
  notes?: string;
}

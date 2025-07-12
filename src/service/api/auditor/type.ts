// Auditor Information
export type AuditorType = {
  auditor_id: number;
  user_id: number;
  name: string;
  register_id: string;
  description: string;
  created_date: string;
  updated_date: string;
};

// API Response Types for Auditor
export type AuditorResponseType = {
  message: string;
  auditor_id: number;
};
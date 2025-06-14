export type ProductType = {
  product_id?: number;
  company_id: number;
  product_name_th: string;
  product_name_en: string;
  scope: "B2B" | "B2C";
  FU_value: number;
  FU_th: string;
  FU_en: string;
  PU_value: number;
  PU_th: string;
  PU_en: string;
  sale_ratio: number;
  product_techinfo: string[] | null;
  pcr_reference: string;
  collect_data_start: Date | string | null;
  collect_data_end: Date | string | null;
  product_photo: File | string;
  auditor_id: number | null;
  verify_status: "unverified" | "verified" | "draft";
  submitted_round: string;
  submitted_date: Date | string | null;
  created_date?: string | null;
  updated_date?: string | null;
};

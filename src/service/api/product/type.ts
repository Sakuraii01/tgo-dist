export type ProductType = {
  product_id?: number;
  company_id: number;
  product_name_th: string;
  product_name_en: string;
  scope: "B2B" | "B2C";
  FU_value: number;
  FU_th: number;
  FU_en: number;
  PU_value: number;
  PU_th: number;
  PU_en: number;
  sale_ratio: number;
  product_techinfo: string[] | string | null;
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
  editor_name?: string;
  product_techinfo_array?: string[];
  photo_name?: string;
  photo_path?: string;
};

export type ProductResponseType = {
  message: string;
  product_id: number;
};

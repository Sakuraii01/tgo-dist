// type.ts (abbreviated version with just the relevant types)

// Product detail structure returned by the API
export interface ProductDetailType {
  auditor: {
    auditor_id: number;
    user_id?: number;
    name: string;
    register_id?: string;
    description?: string;
    created_date?: string;
    updated_date?: string;
  };
  product: Array<{
    product_id: number;
    company_id: number;
    product_name_th: string;
    product_name_en: string;
    scope: "B2B" | "B2C";
    FU_value: number | null;
    FU_th: string;
    FU_en: string;
    PU_value: number;
    PU_th: string;
    PU_en: string;
    sale_ratio: string;
    product_techinfo: string | null;
    pcr_reference: string;
    collect_data_start: string;
    collect_data_end: string;
    product_photo: string | null;
    auditor_id: number;
    verify_status: "Pending" | "Under" | "Approved" | "Rejected";
    submitted_round: string | null;
    submitted_date: string;
    created_date: string | null;
    updated_date: string | null;
    products_status: number;
  }>;
  status: {
    status_id: number;
    auditor_id: number;
    company_id: number;
    product_id: number;
    status: number;
    created_at: string;
    updated_at: string;
  };
  comments: Array<{
    comment_id?: number;
    auditor_id?: number;
    company_id?: number;
    product_id?: number;
    comment: string;
    comment_company: string;
    created_at: string;
    created_at_company: string;
    updated_at?: string;
  }>;
}

// Single product type
export interface ProductType {
  product_id: number;
  company_id: number;
  product_name_th: string;
  product_name_en: string;
  scope: "B2B" | "B2C";
  FU_value: number | null;
  FU_th: string;
  FU_en: string;
  PU_value: number;
  PU_th: string;
  PU_en: string;
  sale_ratio: string;
  product_techinfo: string | null;
  pcr_reference: string;
  collect_data_start: string;
  collect_data_end: string;
  product_photo: string | null;
  auditor_id: number;
  verify_status: "Pending" | "Under" | "Approved" | "Rejected";
  submitted_round: string | null;
  submitted_date: string;
  created_date: string | null;
  updated_date: string | null;
  products_status: number;
  photo_path?: string;
}

export type ProductListType = {
  auditor_id: string | number;
  auditor: AuditorType;
  products: ProductsGroupType[];
};

export type ProductGroupType = {
  products_status: number;
  items: ProductType[];
};

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

// Products grouped by status
export type ProductsGroupType = {
  products_status: number; // 0 = unverified, 1 = verified, etc.
  items: ProductType[];
};
// Auditor Report (contains auditor info + grouped products)
export type AuditorReportType = {
  auditor_id: string;
  auditor: AuditorType;
  products: ProductsGroupType[];
};

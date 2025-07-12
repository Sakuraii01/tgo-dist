import type{ AuditorType } from "../type";

// Individual Product
export type ProductType = {
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
  verify_status: "Pending" | "Under" | "Approved" | "Rejected" ;
  submitted_round: string | null;
  submitted_date: string;
  created_date: string | null;
  updated_date: string | null;
  products_status?: number;
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

// Comment on a product
export type CommentType = {
  comments_id: number;
  auditor_id: number;
  company_id: number;
  product_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

// Product status tracking
export type StatusType = {
  status_id: number;
  auditor_id: number;
  company_id: number;
  product_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

// Product Detail (contains product + auditor + comments + status)
export type ProductDetailType = {
  auditor_id: string;
  auditor: AuditorType;
  product: ProductType;
  status: StatusType;
  comments: CommentType[];
};

// API Response Types
export type CommentResponseType = {
  message: string;
  comment_id: number;
};

export type StatusUpdateResponseType = {
  message: string;
  product_id: number;
  status: string;
};

export type ProductResponseType = {
  message: string;
  product_id: number;
};

// Utility Types
export type ProductScope = "B2B" | "B2C";

// Request Types
export type AddCommentRequest = {
  auditor_id: number;
  company_id: number;
  product_id: number;
  comment: string;
};

export type VerifyStatus = "Pending" | "Under" | "Approved" | "Rejected";

export type UpdateStatusRequest = {
  auditor_id: number;
  company_id: number;
  product_id: number;
  status: 0 | 1 | 2 | 3; // 0=รอพิจารณา, 1=ระหว่างพิจารณา, 2=อนุมัติ, 3=ปฏิเสธ
};

export type UpdateProductRequest = Partial<Omit<ProductType, 'product_id' | 'created_date' | 'updated_date'>>;
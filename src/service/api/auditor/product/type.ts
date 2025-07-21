import type { AuditorType,ProductType } from "../type";
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
  status: 1 | 2 | 3 | 4;
};

export type UpdateProductRequest = Partial<
  Omit<ProductType, "product_id" | "created_date" | "updated_date">
>;

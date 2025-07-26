export type CompanyType = {
  company_id: number;
  user_id: number;
  name: string;
  address: string;
  province_id: number;
  contact_no: string;
  industrial_id: string;
  industrial_name: string;
  created_date: Date | string;
  updated_date: Date | string;
};

export type ExcelType = {
  message: string;
  download_url: string;
};

export type ExcelGenType = {
  id: number;
  company_id: number;
  product_id: number;
  path_excel: string;
  created_at: string;
  updated_at: string;
};

export type AddExcelType = {
  path_excel: File;
};

export type LatestExcelType = {
  message: string;
  path_excel: string;
};

export type NotificationType = {
  company_id: number;
  notification: string;
  created_at: Date | string;
  updated_at: Date | string;
};

export type AddCommentRequest = {
  comment_id: number;
  comment_company: string;
};

export type CommentResponseType = {
  message: string;
  comment_id: number;
};

export type ListExcelType = {
  id: number;
  auditor_id: number;
  company_id: number;
  product_id: number;
  path_excel: string;
  version: number;
  created_at: Date | string;
  updated_at: Date | string;
};

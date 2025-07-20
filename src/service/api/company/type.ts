export type CompanyType = {
  company_id: number;
  user_id: number;
  name: string;
  address: string;
  province_id: number;
  contact_no: string;
  industrial_id: string;
  created_date: Date | string;
  updated_date: Date | string;
};

export type ExcelType ={
  message: string;
};

export type AddCommentRequest = {
  auditor_id: number;
  company_id: number;
  product_id: number;
  comment: string;
};

export type CommentResponseType = {
  message: string;
  comment_id: number;
};

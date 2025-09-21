export type CompanyType = {
  company_id: number;
  user_id: number;
  name: string;
  address: string;
  province_name: string;
  district_name: string;
  subdistrict_name: string;
  zipcode: number;
  province_id: number;
  district_id: number;
  subdistrict_id: number;
  contact_no: string;
  industrial_id: string;
  industrial_name: string;
  created_date: Date | string;
  updated_date: Date | string;
};

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

    FU_value: number | string;
    FU_th: string;
    FU_en: string;

    PU_value: number | string;
    PU_th: string;
    PU_en: string;

    sale_ratio: number | string;

    product_techinfo: string | string[] | null;
    product_techinfo_array?: string[];

    pcr_reference: string;

    collect_data_start: Date | string | null;
    collect_data_end: Date | string | null;

    product_photo: string | File | FormData | Blob;
    photo_name?: string;
    photo_path?: string;

    auditor_id: number | null;

    verify_status: "Draft" | "Pending" | "Under" | "Approved" | "Rejected";

    submitted_round: string;
    submitted_date: Date | string | null;

    created_date?: Date | string | null;
    updated_date?: Date | string | null;

    editor_name?: string;
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
    comments_id?: number;
    auditor_id?: number;
    company_id?: number;
    product_id?: number;

    comment: string;
    created_at: string;
    updated_at?: string;

    comment_company: string;
    created_at_company: string;
    update_at_company?: string;

    excel_old_id: string;
    old_excel_path: string;
    excel_new_id: string;
    new_excel_path: string;
  }>;
}


export type CompanyCommentType = {
  comments_id: number;
  auditor_id: number;
  company_id: number;
  product_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
    comment_company: string | null;
  updated_at_company: string | null;
  created_at_company: string | null;
  excel_old_id: number | null;
  excel_new_id: number | null;

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

import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import {
  type CompanyType,
  type ExcelType,
  type ExcelGenType,
  type AddCommentRequest,
  type CommentResponseType,
  type NotificationType,
  type LatestExcelType,
  type ListExcelType,
  type AddExcelType,
} from "./type";

export class CompanyService extends RemoteA {
  reqGetCompany = async (company_id: number): Promise<CompanyType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANY + `/${company_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetExcel = async (
    company_id: number,
    product_id: number
  ): Promise<ExcelType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL + `/${company_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetGenExcel = async (
    company_id: number,
    product_id: number
  ): Promise<ExcelGenType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.EXCEL_GENERATE}/${company_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetLatestExcel = async (company_id: number): Promise<LatestExcelType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL + `/${company_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetListExcel = async (
    auditor_id: number,
    product_id: number
  ): Promise<ListExcelType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL_DOWNLOAD + `/${auditor_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetNotification = async (
    auditor_id: number,
    product_id: number
  ): Promise<NotificationType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANY_NOTIFICATION + `/${auditor_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqUpdateCommentCompany = async (
  comment_id: number,
  comment_company: string,
  updated_at_company: string,
  created_at_company: string
): Promise<any> => {
  const response = await this.getAxiosInstance().put(
    `${PROTECTED_PATH.AUDITOR}/comment/${comment_id}`,
    {
      comment_company,
      updated_at_company,
      created_at_company
    }
  );
  return response.data;
};

  reqAddFile = async (formData: FormData,auditor_id: number,product_id: number): Promise<ExcelType> => {
  const response = await this.getAxiosInstance().post(
    `${PROTECTED_PATH.EXCEL}/${auditor_id}/${product_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  );
  return response.data;
};


}

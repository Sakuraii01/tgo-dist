import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import {
  type CompanyType,
  type ExcelType,
  type ExcelGenType,
  type NotificationType,
  type LatestExcelType,
  type ListExcelType,
} from "./type";

import { useToken } from "../../../utils/localStorage";

import type { AxiosResponse } from "axios";
export class CompanyService extends RemoteA {
  token = useToken();
  company_id = this.token?.company[0]?.company_id;
  reqGetCompany = async (company_id: number): Promise<CompanyType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANY + `/${company_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetExcel = async (product_id: number): Promise<ExcelType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL + `/${this.company_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetGenExcel = async (product_id: number): Promise<ExcelGenType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.EXCEL_GENERATE}/${this.company_id}/${product_id}`
    );
    const { data } = response;
    return data[0] as ExcelGenType;
  };

  reqGetLatestExcel = async (auditor_id:number,product_id: number): Promise<LatestExcelType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL_DOWNLOAD + `/${auditor_id}/${product_id}`
    );
    const { data } = response;
    return data[0];
  };

  reqGetListExcel = async (
    auditor_id: number,
    product_id: number
  ): Promise<ListExcelType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL_DOWNLOAD + `/${auditor_id}/${product_id}`
    );
    const { data } = response;
    return data[0];
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

  reqPostNotification = async (
    auditor_id: number,
    product_id: number
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.COMPANY_NOTIFICATION,
      {
        auditor_id: auditor_id,
        company_id: this.company_id,
        product_id: product_id,
      }
    );
    const { data } = response;
    return data;
  };
  reqUpdateCommentCompany = async (
    comment_id: number,
    comment_company: string
  ): Promise<any> => {
    const response = await this.getAxiosInstance().put(
      `${PROTECTED_PATH.AUDITOR}/comment/${comment_id}`,
      {
        comment_company: comment_company,
      }
    );
    return response.data;
  };

  reqAddFile = async (
    auditor_id: number,
    product_id: number
  ): Promise<ExcelType> => {
    const response = await this.getAxiosInstance().get(
      `http://178.128.123.212:5000/api/v1/excel/auditor/${auditor_id}/${product_id}`
    );
    return response.data;
  };

  reqPostFile = async (
    formData: FormData,
    auditor_id: number,
    product_id: number
  ): Promise<ExcelType> => {
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

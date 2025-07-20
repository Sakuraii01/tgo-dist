import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import {
  type CompanyType,
  type ExcelType,
  type AddCommentRequest,
  type CommentResponseType,
  type NotificationType,
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
    product_id: number,
    auditor_id: number
  ): Promise<ExcelType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.EXCEL + `/${auditor_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetNotification = async (
    company_id: number
  ): Promise<NotificationType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANY_NOTIFICATION + `/${company_id}`
    );
    const { data } = response;
    return data;
  };

  reqAddComment = async (
    commentData: AddCommentRequest
  ): Promise<CommentResponseType> => {
    const response = await this.getAxiosInstance().post(
      `${PROTECTED_PATH.AUDITOR}/comment/${commentData.company_id}`,
      commentData
    );
    const { data } = response;
    return data;
  };
}

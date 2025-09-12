import { RemoteA } from "../../remote";
import { PROTECTED_PATH } from "../../../constants/api.route";
import type { CompanyInfo, UserInfo, Login, VerifierInfo } from "./type";
import { useToken } from "../../../utils/localStorage";

export class UserService extends RemoteA {
  token = useToken();
  company_id = this?.token?.company?.[0]?.company_id;
  reqPostUser = async (entity: UserInfo) => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.USER,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostCompany = async (entity: CompanyInfo) => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.COMPANY,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPutCompany = async (entity: CompanyInfo) => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.COMPANY + "/" + this.company_id,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostLogin = async (entity: Login) => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.LOGIN,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostVerifier = async (entity: VerifierInfo) => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.AUDITORS,
      entity
    );

    const { data } = response;
    return data;
  };
}

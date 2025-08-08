import { RemoteA } from "../../remote";
import { PROTECTED_PATH } from "../../../constants/api.route";
import type { CompanyInfo, UserInfo, Login, VerifierInfo } from "./type";

export class UserService extends RemoteA {
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

import { RemoteA } from "../../remote";
import { PROTECTED_PATH } from "../../../constants/api.route";
import type { CompanyInfo, UserInfo, Login } from "./type";

export class UserService extends RemoteA {
  reqPostCompanyUser = async (entity: {
    user: UserInfo;
    company: CompanyInfo;
  }) => {
    const user_response = await this.getAxiosInstance().post(
      PROTECTED_PATH.USER,
      entity.user
    );
    const company_response = await this.getAxiosInstance().post(
      PROTECTED_PATH.COMPANY,
      entity.company
    );

    return {
      user_response,
      company_response,
    };
  };
  reqPostLogin = async (entity: Login) => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.LOGIN,
      entity
    );
    const { data } = response;
    return data;
  };
}

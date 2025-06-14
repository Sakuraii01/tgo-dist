import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import { type CompanyType } from "./type";

export class CompanyService extends RemoteA {
  reqGetCompany = async (company_id: number): Promise<CompanyType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANY + `/${company_id}`
    );
    const { data } = response;
    return data;
  };
}

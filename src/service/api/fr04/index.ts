import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type { FR04ReportType, FR04_1Type } from "./type";
export class Fr04Service extends RemoteA {
  reqGetFr04_1 = async (
    company_id: number,
    product_id: number
  ): Promise<FR04_1Type[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_FORM + `/${company_id}` + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFR04Report = async (product_id: number): Promise<FR04ReportType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_REPORT + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2 = async (product_id: number): Promise<FR04ReportType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_2_FORM + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
}

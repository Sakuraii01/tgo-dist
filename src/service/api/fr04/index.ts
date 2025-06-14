import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import { type FR04DataType } from "./type";
export class Fr04Service extends RemoteA {
  reqGetFr04_1 = async (product_id: number): Promise<FR04DataType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_FORM + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2 = async (product_id: number): Promise<FR04DataType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_2_FORM + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
}

import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  FR04_1Type,
  FR04_1ItemType,
  FR04_3Type,
  FR04_1ItemInfoType,
  FR04_2ItemInfoType,
  FR04_2ItemItemInfo,
} from "./type";
import { type AxiosResponse } from "axios";
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
  reqGetFR04Item = async (
    life_cycle_phase: number,
    company_id: number,
    product_id: number,
    class_type: string,
    item_id: number
  ): Promise<FR04_1ItemInfoType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1 +
        `/${life_cycle_phase}/${company_id}/${product_id}/${class_type}/${item_id}`
    );
    const { data } = response;
    return data;
  };

  reqPostFr04_1 = async (entity: FR04_1ItemType): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_1_ITEM,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPutFr04_1 = async (
    item_id: number,
    entity: FR04_1ItemType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR04_1_ITEM + `/${item_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2 = async (
    company_id: number,
    product_id: number
  ): Promise<FR04_1Type[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_FORM + `/${company_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2Item = async (
    life_cycle_phase: number,
    company_id: number,
    product_id: number,
    class_type: string,
    item_id: number
  ): Promise<FR04_2ItemInfoType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_2_ITEM +
        `/${life_cycle_phase}/${company_id}/${product_id}/${class_type}/${item_id}`
    );
    const { data } = response;
    return data;
  };
  reqPostFr04_2 = async (
    entity: FR04_2ItemItemInfo
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_2_ITEM,
      entity
    );
    const { data } = response;
    return data;
  };

  reqPutFr04_2 = async (
    item_id: number,
    entity: FR04_2ItemItemInfo
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR04_2_ITEM + `/${item_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_3 = async (
    company_id: number,
    product_id: number
  ): Promise<FR04_3Type> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_3_REPORT + `/${company_id}` + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
}

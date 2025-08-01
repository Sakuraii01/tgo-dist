import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  FR04_1Type,
  FR04_1ItemType,
  FR04_3Type,
  FR04_1ItemInfoType,
  FR04_2ItemInfoType,
  FR04_2ItemItemInfo,
  FR04ReportType,
} from "./type";
import { type AxiosResponse } from "axios";
import { useToken } from "../../../utils/localStorage";
export class Fr04Service extends RemoteA {
  token = useToken();
  company_id = this.token?.company[0]?.company_id;

  reqGetFr04_1 = async (product_id: number): Promise<FR04_1Type[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_FORM + `/${this.company_id}` + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFR04Item = async (
    life_cycle_phase: number,
    product_id: number,
    class_type: string,
    item_id: number
  ): Promise<FR04_1ItemInfoType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1 +
        `/${life_cycle_phase}/${this.company_id}/${product_id}/${class_type}/${item_id}`
    );
    const { data } = response;
    return data;
  };

  reqPostFr04_1 = async (entity: FR04_1ItemType): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_1_ITEM,
      { ...entity, company_id: this.company_id }
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
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_1Report = async (product_id: number): Promise<FR04ReportType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_REPORT + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2Report = async (product_id: number): Promise<FR04ReportType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_2_FORM + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2 = async (product_id: number): Promise<FR04_1Type[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_1_FORM + `/${this.company_id}/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_2Item = async (
    life_cycle_phase: number,
    product_id: number,
    class_type: string,
    item_id: number
  ): Promise<FR04_2ItemInfoType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR04_2 +
        `/${life_cycle_phase}/${this.company_id}/${product_id}/${class_type}/${item_id}`
    );
    const { data } = response;
    return data;
  };
  reqPostFr04_2 = async (
    entity: FR04_2ItemItemInfo
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_2_ITEM,
      { ...entity, company_id: this.company_id }
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
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };
  reqGetFr04_3 = async (product_id: number): Promise<FR04_3Type> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.SELF_COLLECT_LIST +
        `/${this.company_id}` +
        `/${product_id}`
    );
    const { data } = response;
    return data;
  };

  reqPostSumFR04_1 = async (product_id: number): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_1_SUM,
      { product_id: product_id }
    );
    const { data } = response;
    return data;
  };
  reqPutSumFR04_1 = async (
    report_id: number,
    product_id: number
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR04_1_SUM,
      { report41_sum_id: report_id, product_id: product_id }
    );
    const { data } = response;
    return data;
  };
  reqPostSumFR04_2 = async (product_id: number): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR04_2_SUM,
      { product_id: product_id }
    );
    const { data } = response;
    return data;
  };
  reqPutSumFR04_2 = async (
    report_id: number,
    product_id: number
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR04_2_SUM,
      { report42_sum_id: report_id, product_id: product_id }
    );
    const { data } = response;
    return data;
  };
}

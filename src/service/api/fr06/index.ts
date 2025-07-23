import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type { FR06Report, FR06_2Report, FR06_1Sum4142 } from "./type";
import type { AxiosResponse } from "axios";
export class Fr06Service extends RemoteA {
  reqGetFr06_1 = async (product_id: number): Promise<FR06Report> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR06_1 + `/${product_id}`
    );
    const { data } = response;

    return data[0] as FR06Report;
  };
  reqPostFr06_1 = async (entity: FR06Report): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR06_1,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPutFr06_1 = async (
    entity: FR06Report,
    product_id: number
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR06_1 + `/${product_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetFr06_2 = async (product_id: number): Promise<FR06_2Report> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR06_2 + `/${product_id}`
    );
    const { data } = response;
    return data[0] as FR06_2Report;
  };
  reqPostFr06_2 = async (entity: FR06_2Report): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.FR06_2,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPutFr06_2 = async (
    entity: FR06_2Report,
    product_id: number
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.FR06_2 + `/${product_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetFr06_1Sum4142 = async (product_id: number): Promise<FR06_1Sum4142> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.FR06_1SUM4142 + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
}

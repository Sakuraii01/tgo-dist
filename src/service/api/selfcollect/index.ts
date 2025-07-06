import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type { SelfCollectType } from "./type";
import type { AxiosResponse } from "axios";
export class SelfCollectService extends RemoteA {
  reqGetSelfCollectList = async (
    company_id: number
  ): Promise<SelfCollectType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.SELF_COLLECT_LIST + `/${company_id}`
    );
    const { data } = response;
    return data;
  };
  reqPostSelfCollect = async (
    entity: SelfCollectType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.SELF_COLLECT,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPutSelfCollect = async (
    self_collect_id: number,
    entity: SelfCollectType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.SELF_COLLECT + `/${self_collect_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
}

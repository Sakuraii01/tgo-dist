import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  SelfCollectListType,
  SelfCollectProcessEntityType,
  SelfCollectItemListType,
  SelfCollectProcessItemType,
} from "./type";
import type { AxiosResponse } from "axios";
import { useToken } from "../../../utils/localStorage";
export class SelfCollectService extends RemoteA {
  token = useToken();
  company_id = this.token?.company[0]?.company_id;
  reqGetSelfCollectList = async (): Promise<SelfCollectListType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.SELF_COLLECT_LIST + `/${this.company_id}`
    );
    const { data } = response;
    return data;
  };
  reqPostSelfCollect = async (
    entity: SelfCollectListType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.SELF_COLLECT,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };
  reqPutSelfCollect = async (
    self_collect_id: number,
    entity: SelfCollectListType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.SELF_COLLECT + `/${self_collect_id}`,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };

  reqPostSelfCollectProcess = async (
    entity: SelfCollectProcessEntityType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.SELF_COLLECT_PROCESS,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };

  reqGetSelfCollectProcessItem = async (
    process_id: number
  ): Promise<SelfCollectItemListType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.SELF_COLLECT_PROCESS_LIST +
        `/${this.company_id}/${process_id}`
    );
    const { data } = response;
    return data;
  };
  reqGetSelfCollectProcessPerItem = async (
    item_id: number
  ): Promise<SelfCollectProcessItemType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.SELF_COLLECT_PROCESS_ITEM + `/${item_id}`
    );
    const { data } = response;
    return data;
  };

  reqPostCollectProcessPerItem = async (
    entity: SelfCollectProcessItemType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.SELF_COLLECT_PROCESS_ITEM,
      entity
    );
    const { data } = response;
    return data;
  };

  reqPutSelfCollectProcessPerItem = async (
    item_id: number,
    entity: SelfCollectProcessItemType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.SELF_COLLECT_PROCESS_ITEM + `/${item_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqDeleteSelfCollectProcessPerItem = async (item_id: number) => {
    const response = await this.getAxiosInstance().delete(
      PROTECTED_PATH.SELF_COLLECT_PROCESS_ITEM + `/${item_id}`
    );
    const { data } = response;
    return data;
  };
}

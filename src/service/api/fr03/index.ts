import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import { type AxiosResponse } from "axios";
import type {
  OutputProcessType,
  InputProcessType,
  WasteProcessType,
  ProcessType,
  ProcessDTO,
  InputCategoryDropdown,
  WasteCategoryDropdown,
} from "./type";

export class ProcessService extends RemoteA {
  reqGetProcess = async (
    // company_id: number,
    product_id: number
  ): Promise<ProcessType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.OVERALL + `/${product_id}`
    );
    const { data } = response;
    return data.processes;
  };
  reqPutProcessByID = async (
    process_id: number,
    entity: {
      process_name: string;
    }
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.PROCESS + `/${process_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostProcess = async (entity: ProcessDTO): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.PROCESS,
      entity
    );
    const { data } = response;
    return data;
  };
  reqDeleteProcessByID = async (process_id: number): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().delete(
      PROTECTED_PATH.PROCESS + `/${process_id}`
    );
    const { data } = response;
    return data;
  };
}

export class OutputProcessService extends RemoteA {
  reqGetOutputProcess = async (): Promise<OutputProcessType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.OUTPUT_PROCESS
    );
    const { data } = response;
    return data;
  };
  reqPutOutputProcessByID = async (
    process_id: number,
    entity: OutputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.OUTPUT_PROCESS + `/${process_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostOutputProcess = async (
    entity: OutputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.OUTPUT_PROCESS,
      entity
    );
    const { data } = response;
    return data;
  };
}
export class InputProcessService extends RemoteA {
  reqGetInputProcess = async (): Promise<InputProcessType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.INPUT_PROCESS
    );
    const { data } = response;
    return data;
  };
  reqPutInputProcessByID = async (
    process_id: number,
    entity: InputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.INPUT_PROCESS + `/${process_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostInputProcess = async (
    entity: InputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.INPUT_PROCESS,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetInputCatergory = async (): Promise<InputCategoryDropdown[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.INPUT_CATEGORY
    );
    const { data } = response;
    return data;
  };
}
export class WasteProcessService extends RemoteA {
  reqGetWasteProcess = async (): Promise<WasteProcessType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.WASTE_PROCESS
    );
    const { data } = response;
    return data;
  };
  reqPutWasteProcessByID = async (
    process_id: number,
    entity: WasteProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.WASTE_PROCESS + `/${process_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostWasteProcess = async (
    entity: WasteProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.WASTE_PROCESS,
      entity
    );
    const { data } = response;
    return data;
  };
  reqGetWasteCategory = async (): Promise<WasteCategoryDropdown[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.WASTE_CATEGORY
    );
    const { data } = response;
    return data;
  };
}

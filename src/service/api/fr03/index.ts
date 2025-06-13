import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import { type AxiosResponse } from "axios";
import {
  type OutputProcessType,
  type InputProcessType,
  type WasteProcessType,
  type ProcessType,
} from "./type";

export class ProcessService extends RemoteA {
  reqGetProcess = async (
    company_id: number,
    product_id: number
  ): Promise<ProcessType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.PROCESS + `/${company_id}/${product_id}`
    );
    const { data } = response;
    return data.processes as ProcessType[];
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
  reqPutOutputProcessByID = async (
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
  reqPostOutputProcess = async (
    entity: OutputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.INPUT_PROCESS,
      entity
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
    entity: OutputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.WASTE_PROCESS + `/${process_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostWasteProcess = async (
    entity: OutputProcessType
  ): Promise<AxiosResponse> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.WASTE_PROCESS,
      entity
    );
    const { data } = response;
    return data;
  };
}

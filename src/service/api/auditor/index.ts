import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";

import type { AuditorType } from "./type";

export class AuditorService extends RemoteA {
  reqGetAuditorList = async (): Promise<AuditorType[]> => {
    const response = await this.getAxiosInstance().get(PROTECTED_PATH.AUDITORS);
    const { data } = response;
    return data;
  };
}

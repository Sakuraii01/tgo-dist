import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type { AuditorType, AuditorReportType } from "./type";

export class AuditorService extends RemoteA {
  // Get auditor info by ID
  reqGetAuditor = async (auditorId: number): Promise<AuditorType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR}/${auditorId}`
    );
    const { data } = response;
    return data;
  };

  reqGetAllProducts = async (
    auditorId?: number
  ): Promise<AuditorReportType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR}/report/${auditorId}`
    );
    const { data } = response;
    return data;
  };
}

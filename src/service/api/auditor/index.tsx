import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  AuditorType,
  AuditorResponseType,
} from "./type";

export class AuditorService extends RemoteA {
  // Get auditor info by ID
  reqGetAuditor = async (auditorId: number): Promise<AuditorType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR}/${auditorId}`
    );
    const { data } = response;
    return data;
  };

  // Update auditor information
  reqUpdateAuditor = async (
    auditorId: number,
    auditorData: Partial<AuditorType>
  ): Promise<AuditorResponseType> => {
    const response = await this.getAxiosInstance().put(
      `${PROTECTED_PATH.AUDITOR}/${auditorId}`,
      auditorData
    );
    const { data } = response;
    return data;
  };

  // Create new auditor
  reqCreateAuditor = async (auditorData: Omit<AuditorType, 'auditor_id' | 'created_date' | 'updated_date'>): Promise<AuditorResponseType> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.AUDITOR,
      auditorData
    );
    const { data } = response;
    return data;
  };

  // Delete auditor
  reqDeleteAuditor = async (auditorId: number): Promise<{ message: string }> => {
    const response = await this.getAxiosInstance().delete(
      `${PROTECTED_PATH.AUDITOR}/${auditorId}`
    );
    const { data } = response;
    return data;
  };
}
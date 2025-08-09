import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  UnitsDrowpdownType,
  RegisterRounedType,
  TGOEFDropdownType,
  TGOEFCategoryType,
  TGOVehiclesWithEFType,
  ProvinceType,
  DistrincType,
  SubDistricType,
  IndustryType,
  PCRType,
} from "./type";

export class UnitsDropdownService extends RemoteA {
  reqGetUnits = async (): Promise<UnitsDrowpdownType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.UNITS_DROPDOWN
    );
    const { data } = response;
    return data;
  };
}

export class RegisterRoundDropdownService extends RemoteA {
  reqGetRegisterRound = async (): Promise<RegisterRounedType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.REGISTER_ROUND_DROPDOWN
    );
    const { data } = response;
    return data;
  };
}

export class TGOEFDropdownService extends RemoteA {
  reqGetTGOEF = async (): Promise<TGOEFDropdownType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.TGO_EF_DROPDOWN
    );
    const { data } = response;
    return data;
  };
  reqGetTGOcategory = async (): Promise<TGOEFCategoryType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.TGO_EF_DROPDOWN_CATEGORY
    );
    const { data } = response;
    return data;
  };
  reqGetTGOEFSubcategory = async (
    categoryId: number
  ): Promise<TGOEFCategoryType[]> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.TGO_EF_DROPDOWN_CATEGORY}/${categoryId}`
    );
    const { data } = response;
    return data;
  };
  reqGetTGOEFBySubcategory = async (
    categoryID: number,
    subcategoryId: number
  ): Promise<TGOEFDropdownType[]> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.TGO_EF_DROPDOWN_CATEGORY}/${categoryID}/${subcategoryId}`
    );
    const { data } = response;
    return data;
  };
  reqGetPCRService = async (): Promise<PCRType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.PRC_DROPDOWN
    );
    const { data } = response;

    return [...data.ข้อกำหนดระดับประเทศ, ...data.ข้อกำหนดทั่วไป];
  };
}

export class TGOVehiclesService extends RemoteA {
  reqGetTGOVehiclesWithEF = async (): Promise<TGOVehiclesWithEFType[]> => {
    const response = await this.getAxiosInstance().get(PROTECTED_PATH.VEHICLES);
    const { data } = response;
    return data;
  };
}

export class AddressService extends RemoteA {
  reqGetProvince = async (): Promise<ProvinceType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.ADDRESS_DROPDOWN
    );
    const { data } = response;
    return data;
  };
  reqGetDistrict = async (entity: {
    province: string;
  }): Promise<DistrincType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.ADDRESS_DROPDOWN + `/${entity.province}`
    );
    const { data } = response;
    return data;
  };
  reqGetSubDistrict = async (entity: {
    provice: string;
    district: string;
  }): Promise<SubDistricType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.ADDRESS_DROPDOWN + `/${entity.provice}/${entity.district}`
    );
    const { data } = response;
    return data;
  };
}

export class IndustryService extends RemoteA {
  reqGetIndustry = async (): Promise<IndustryType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.INDUSTRIAL
    );
    const { data } = response;
    return data;
  };
}

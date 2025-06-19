import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";
import type {
  UnitsDrowpdownType,
  RegisterRounedType,
  TGOEFDropdownType,
  TGOEFCategoryType,
  TGOEFSubcategoryType,
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
  ): Promise<TGOEFSubcategoryType[]> => {
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
}

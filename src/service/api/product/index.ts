import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";

import type { ProductType, ProductResponseType } from "./type";
import { useToken } from "../../../utils/localStorage";

export class ProductService extends RemoteA {
  token = useToken();
  company_id = this.token?.company[0]?.company_id;
  reqGetAllProducts = async (): Promise<ProductType[]> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.COMPANT_PRODUCT + `/${this.company_id}`
    );
    const { data } = response;
    return data;
  };

  reqGetProduct = async (product_id: number): Promise<ProductType> => {
    const response = await this.getAxiosInstance().get(
      PROTECTED_PATH.PRODUCT + `/${product_id}`
    );
    const { data } = response;
    return data;
  };
  reqPostProduct = async (
    entity: ProductType
  ): Promise<ProductResponseType> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.PRODUCT,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };
  reqPutProduct = async (
    product_id: number,
    entity: ProductType
  ): Promise<ProductResponseType> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.PRODUCT + `/${product_id}`,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };

  reqPutProductPicture = async (
    product_id: number,
    entity: FormData
  ): Promise<ProductResponseType> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.PRODUCT + `/${product_id}`,
      { ...entity, company_id: this.company_id }
    );
    const { data } = response;
    return data;
  };
}

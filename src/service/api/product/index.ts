import { PROTECTED_PATH } from "../../../constants/api.route";
import { RemoteA } from "../../remote";

import type { ProductType, ProductResponseType } from "./type";

export class ProductService extends RemoteA {
  reqGetAllProducts = async (): Promise<ProductType[]> => {
    const response = await this.getAxiosInstance().get(PROTECTED_PATH.PRODUCT);
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
  reqPutProduct = async (
    product_id: number,
    entity: ProductType
  ): Promise<ProductResponseType> => {
    const response = await this.getAxiosInstance().put(
      PROTECTED_PATH.PRODUCT + `/${product_id}`,
      entity
    );
    const { data } = response;
    return data;
  };
  reqPostProduct = async (
    entity: ProductType
  ): Promise<ProductResponseType> => {
    const response = await this.getAxiosInstance().post(
      PROTECTED_PATH.PRODUCT,
      entity
    );
    const { data } = response;
    return data;
  };
}

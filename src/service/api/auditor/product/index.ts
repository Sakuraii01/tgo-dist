import { PROTECTED_PATH } from "../../../../constants/api.route";
import { RemoteA } from "../../../remote";
import type { ProductType, ProductDetailType } from "../type";
import type { AddCommentRequest, CommentResponseType } from "./type";

export class ProductService extends RemoteA {

  reqGetProductDetail = async (
    productId: number
  ): Promise<ProductDetailType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.PRODUCT}/${productId}`
    );
    console.log("Response from reqGetProductDetail:", response);

    return response.data;
  };

  reqGetAProductDetail = async (
    auditorId: number,
    productId: number
  ): Promise<ProductDetailType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR_PRODUCT}/${auditorId}/${productId}`
    );
    console.log("Response from reqGetProductDetail:", response);

    return response.data;
  };

  reqGetProduct = async (productId: number): Promise<ProductType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.PRODUCT}/${productId}`
    );
    const { data } = response;
    return data;
  };

  reqAddComment = async (
    commentData: AddCommentRequest
  ): Promise<CommentResponseType> => {
    const response = await this.getAxiosInstance().post(
      `${PROTECTED_PATH.AUDITOR_COMMENT}`,
      commentData
    );
    const { data } = response;
    return data;
  };

  reqUpdateProductStatus = async (
    auditorId: number,
    productId: number,
    statusId: number,
    newStatus: number
  ): Promise<any> => {
    const response = await this.getAxiosInstance().put(
      `${PROTECTED_PATH.AUDITOR_PRODUCT}/status/${auditorId}/${productId}/${statusId}`,
      { status: newStatus }
    );
    const { data } = response;
    return data;
  };
}

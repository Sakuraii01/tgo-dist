import { PROTECTED_PATH } from "../../../../constants/api.route";
import { RemoteA } from "../../../remote";
import type {
  ProductType,
  ProductDetailType,
} from "../type";
import type { AddCommentRequest, CommentResponseType } from "./type";

import type { AuditorReportType } from "../type";

export class ProductService extends RemoteA {
  // Get all products for an auditor (same as report for now)
 

  // Get specific product detail with comments and status
  reqGetProductDetail = async (
    auditorId: number,
    productId: number
  ): Promise<ProductDetailType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR_PRODUCT}/${auditorId}/${productId}`
      // `http://178.128.123.212:5000/api/v1/1/7`
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

  // Add comment to a product
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

  // Update product status
  reqUpdateProductStatus = async (
    auditorId: number,
    productId: number,
    statusId: number,
    newStatus: number
  ): Promise<any> => {
    const response = await this.getAxiosInstance().put(
      `${PROTECTED_PATH.AUDITOR_PRODUCT}status/${auditorId}/${productId}/${statusId}`,
      { status: newStatus }
    );
    const { data } = response;
    return data;
  };

  // Update review status - CORRECTED to use getAxiosInstance()
  // reqUpdateReviewStatus = async (
  //   auditorId: number,
  //   productId: number,
  //   reviewIndex: number,
  //   status: string,
  //   newDate?: string
  // ): Promise<void> => {
  //   try {
  //     const response = await this.getAxiosInstance().put(
  //       `${PROTECTED_PATH.AUDITOR}/product/reviews/${auditorId}/${productId}/${reviewIndex}/status`, 
  //       {
  //         status,
  //         newDate
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating review status:', error);
  //     throw error;
  //   }
  // };

  // Create new review - CORRECTED to use getAxiosInstance()
  // reqCreateNewReview = async (
  //   auditorId: number,
  //   productId: number,
  //   newIndex: number,
  //   auditDate: string
  // ): Promise<void> => {
  //   try {
  //     const response = await this.getAxiosInstance().post(
  //       `${PROTECTED_PATH.AUDITOR}/product/reviews/${auditorId}/${productId}`, 
  //       {
  //         index: newIndex,
  //         dateAuditor: auditDate,
  //         status: 'pending'
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating new review:', error);
  //     throw error;
  //   }
  // };
}
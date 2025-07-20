import { PROTECTED_PATH } from "../../../../constants/api.route";
import { RemoteA } from "../../../remote";
import type {
  AuditorReportType,
  ProductDetailType,
  CommentResponseType,
  AddCommentRequest,
} from "./type";

export class ProductService extends RemoteA {
  // Get all products for an auditor (same as report for now)
  reqGetAllProducts = async (
    auditorId?: number
  ): Promise<AuditorReportType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR}/report/${auditorId}`);
    const { data } = response;
    return data;
  };

  // Get specific product detail with comments and status
  reqGetProductDetail = async (
    auditorId: number,
    productId: number
  ): Promise<ProductDetailType> => {
    const response = await this.getAxiosInstance().get(
      `${PROTECTED_PATH.AUDITOR}/product/${auditorId}/${productId}`
    );
    const { data } = response;
    return data;
  };

  // Add comment to a product
  reqAddComment = async (
    commentData: AddCommentRequest
  ): Promise<CommentResponseType> => {
    const response = await this.getAxiosInstance().post(
      `${PROTECTED_PATH.AUDITOR}/comment`,
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
      `${PROTECTED_PATH.AUDITOR}/product/status/${auditorId}/${productId}/${statusId}`,
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
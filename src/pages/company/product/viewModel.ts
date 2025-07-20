import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type { ExcelType } from "../../../service/api/company/type";
import type { ProductDetailType } from "../../../service/api/auditor/product/type";
// import { useAuth } from "../../../auth/useAuth";

const useProductDetail = (productId: number, auditorId: number) => {
  const [productDetail, setProductDetail] = useState<ProductDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const productService = new ProductService();
  // const auth = useAuth();

  const fetchProductDetail = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {

      const data = await productService.reqGetProductDetail(
        auditorId,
        productId
      );
      setProductDetail(data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
      setError("Failed to fetch product detail");
      setProductDetail(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchExcel = async (productId: number, auditorId: number) => {
    if (!productId) {
      setError("Product ID is required");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const companyService = new CompanyService();
      // ใช้ companyService เพื่อดาวน์โหลด Excel
      const data = await companyService.reqGetExcel(productId, auditorId);
      return data;
    } catch (error) {
      console.error("Error fetching Excel:", error);
      setError("Failed to fetch Excel file");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    productDetail,
    loading,
    error,
    fetchExcel,
    refetch: fetchProductDetail,
  };
};

export default useProductDetail;

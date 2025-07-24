import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type {
  ProductDetailType,
  ProductType,
} from "../../../service/api/auditor/type";

const useViewModel = (auditorId: number, productId: number) => {
  const [productDetail, setProductDetail] = useState<
    ProductDetailType | undefined
  >(undefined);

  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );
  // const token = JSON.parse(localStorage.getItem("token") || "{}");
  const companyService = new CompanyService();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();
  const [excelLink, setExcelLink] = useState<string | null>(null);

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

  const fetchProductData = async () => {
    if (!productId) return;

    try {
      const data = await productService.reqGetProduct(productId);
      setProductData(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      // We don't set an error state here to not override more critical errors
    }
  };

  const fetchExcel = async () => {
    if (!productId) {
      setError("Product ID is required");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await companyService.reqGetExcel(productId);
      return data;
    } catch (error) {
      console.error("Error fetching Excel:", error);
      setError("Failed to fetch Excel file");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestExcel = async () => {
    if (!productId) return;

    try {
      const data = await companyService.reqGetLatestExcel(auditorId, productId);

      setExcelLink(data.path_excel);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };

  const fetchGenExcel = async () => {
    if (!productId) return;

    try {
      const data = await companyService.reqGetGenExcel(productId);

      setExcelLink(data.path_excel);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };

  const fetchUploadExcel = async () => {
    if (!productId) return;
    try {
      const data = await companyService.reqGetGenExcel(productId);
      console.log("Generated Excel data:", data);
      setExcelLink(data.path_excel);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchProductData();
  }, [productId]);

  return {
    productData,
    productDetail,
    loading,
    error,
    fetchExcel,
    fetchLatestExcel,
    fetchGenExcel,
    fetchUploadExcel,
    excelLink,
    loadingExcel: loading,
    errorExcel: error,
    refetch: fetchProductDetail,
  };
};

export default useViewModel;

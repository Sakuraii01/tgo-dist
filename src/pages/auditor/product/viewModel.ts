import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type {
  ProductDetailType,
  ProductType,
} from "../../../service/api/auditor/type";
import type { ListExcelType } from "../../../service/api/company/type";

const useViewModel = (
  auditorId: number,
  productId: number,
) => {
  const [productDetail, setProductDetail] = useState<
    ProductDetailType | undefined
  >(undefined);
//  const token = JSON.parse(localStorage.getItem("token") || "{}");
const companyService = new CompanyService();

  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );
  const [excelList, setExcelList] = useState<ListExcelType[]>([]);
  const [excelLink, setExcelLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

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

  const fetchGenExcel = async () => {
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



  const fetchLatestExcel = async () => {
    if (!productId) return;

    try {
      const data = await companyService.reqGetLatestExcel(auditorId,productId);
      console.log("Generated Excel data:", data);
      setExcelLink(data.path_excel);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };

   const fetchListExcel = async () => {
    setLoading(true);
    setError(null);

    try {
      // const companyService = new CompanyService();
      const excelList: ListExcelType[] = await companyService.reqGetListExcel(
        auditorId,
        productId
      );
      console.log("auditorId:" ,auditorId, "prId:" ,productId, excelList);
      return excelList; 
    } catch (error) {
      console.error("Error fetching Excel list:", error);
      setError("Failed to fetch Excel file list");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadExcelList = async () => {
      const list = await fetchListExcel();
      setExcelList(list);
    };
    loadExcelList();
  }, []);

  useEffect(() => {
    fetchProductDetail();
    fetchProductData();
  }, [productId]);

  return {
    productData,
    productDetail,
    fetchLatestExcel,
    loading,
    error,
    fetchExcel,
    fetchGenExcel,
    refetch: fetchProductDetail,
    excelList,
    excelLink,
    loadingExcel: loading,
    errorExcel: error,
  };
};

export default useViewModel;

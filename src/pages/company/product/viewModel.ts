import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type {
  ProductDetailType,
  ProductType,
} from "../../../service/api/auditor/type";
import type { CompanyCommentType,ListExcelType} from "../../../service/api/company/type";


const useViewModel = (auditorId: number, productId: number) => {
  const [productDetail, setProductDetail] = useState<
    ProductDetailType | undefined
  >(undefined);

  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );

  const [commentData, setCommentData] = useState<CompanyCommentType[]>([]);
  // const token = JSON.parse(localStorage.getItem("token") || "{}");
  const companyService = new CompanyService();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [excelLink, setExcelLink] = useState<string | null>(null);
    const [excelList, setExcelList] = useState<ListExcelType[]>([]);
  

  const fetchProductDetail = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await productService.reqGetProductDetail(
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

  // const fetchProductList = async () => {
  //   const data = await companyService.reqGetAllProducts();
  //   setProductList(data);
  // };

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

  const fetchComment = async () => {
    if (!auditorId && !productId) return;

    try {
      const data = await companyService.reqGetComment(auditorId,productId);
      setCommentData(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      // We don't set an error state here to not override more critical errors
    }
  };

  const fetchListExcel = async () => {
  setLoading(true);
  setError(null);

  try {
    const list: ListExcelType[] = await companyService.reqGetListExcel(
      auditorId,
      productId
    );
    console.log("auditorId:", auditorId, "prId:", productId, list);
    setExcelList(list); // เก็บผลลัพธ์ลง state
    return list; // ถ้าต้องการ return list ด้วย
  } catch (error) {
    console.error("Error fetching Excel list:", error);
    setError("Failed to fetch Excel file list");
    return []; // ถ้าเกิด error คืน array ว่าง
  } finally {
    setLoading(false);
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
     fetchComment();
     fetchListExcel();
     
  }, [auditorId, productId]);


  return {
    commentData,
    productData,
    productList,
    productDetail,
    loading,
    error,
    fetchComment,
    fetchExcel,
    fetchLatestExcel,
    fetchGenExcel,
    fetchUploadExcel,
    fetchProductData,
    excelLink,
    excelList,
    loadingExcel: loading,
    errorExcel: error,
    refetch: fetchProductDetail,
  };
};

export default useViewModel;

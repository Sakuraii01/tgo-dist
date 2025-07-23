// viewModel.ts
import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type {
  ProductDetailType,
  ProductType,
} from "../../../service/api/auditor/type";
import type { ListExcelType } from "../../../service/api/company/type";
import { Handle } from "@xyflow/react";

// Custom hook for managing product detail data
const useViewModel = (
  auditorId: number,
  productId: number,
  companyId: number
) => {
  // State for storing product details, including comments and status
  const [productDetail, setProductDetail] = useState<
    ProductDetailType | undefined
  >(undefined);

  // State for storing basic product data
  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );

  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [excelList, setExcelList] = useState<ListExcelType[]>([]);
  // Service instance
  const productService = new ProductService();

  // Function to fetch detailed product information including comments and status
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

  // Function to fetch just the product data
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

  // Function to fetch Excel file for a product
  const fetchExcel = async () => {
    if (!productId) {
      setError("Product ID is required");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const companyService = new CompanyService();
      const data = await companyService.reqGetExcel(companyId, productId);
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
    if (!productId) {
      setError("Product ID is required");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const companyService = new CompanyService();
      const data = await companyService.reqGetGenExcel(companyId, productId);
      return data;
    } catch (error) {
      console.error("Error fetching Excel:", error);
      setError("Failed to fetch Excel file");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the latest Excel file
  const fetchLatestExcel = async () => {
    if (!companyId) {
      setError("Company ID is required");
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const companyService = new CompanyService();
      const data = await companyService.reqGetLatestExcel(companyId);
      return data;
    } catch (error) {
      console.error("Error fetching latest Excel:", error);
      setError("Failed to fetch latest Excel file");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchListExcel = async () => {
    if (!companyId) {
      setError("Company ID is required");
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const companyService = new CompanyService();
      const excelList: ListExcelType[] = await companyService.reqGetListExcel(
        auditorId,
        productId
      );
      return excelList; // ✅ ไม่ต้อง sort ไม่ต้องกรอง เอาทั้งหมดมาเลย
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
    const loadExcelList = async () => {
      const list = await fetchListExcel();
      setExcelList(list);
    };
    loadExcelList();
  }, [companyId, productId, auditorId]); // เพิ่ม dependency

  // Fetch data when the component mounts or when productId changes
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
    fetchListExcel,
    fetchGenExcel,
    excelList, // เพิ่มตรงนี้
    loadingExcel: loading, // เปลี่ยนชื่อถ้าจะดี แนะนำใช้แยกกัน แต่ตอนนี้ return loading state เดียวกันได้
    errorExcel: error, // ถ้าแยก error ก็แยกด้วย (แต่ตัวนี้คุณใช้ state เดียวกัน)
    refetch: fetchProductDetail,
    // uploadExcel,
  };
};

export default useViewModel;

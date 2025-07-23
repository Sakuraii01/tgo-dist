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
  companyId: number
) => {
  const [productDetail, setProductDetail] = useState<
    ProductDetailType | undefined
  >(undefined);

  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [excelList, setExcelList] = useState<ListExcelType[]>([]);
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

  const fetchLatestExcel = async () => {
    if (!companyId) {
      setError("Company ID is required");
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const companyService = new CompanyService();
      const data = await companyService.reqGetLatestExcel(companyId, productId);
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
  }, [companyId, productId, auditorId]);

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
    excelList, 
    loadingExcel: loading, 
    errorExcel: error,
    refetch: fetchProductDetail,
  };
};

export default useViewModel;

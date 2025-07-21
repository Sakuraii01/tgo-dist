// viewModel.ts
import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";
import type { ProductDetailType, ProductType } from "../../../service/api/auditor/type";

// Custom hook for managing product detail data
const useViewModel = (auditorId: number, productId: number) => {
  // State for storing product details, including comments and status
  const [productDetail, setProductDetail] = useState<ProductDetailType | undefined>(undefined);
  
  // State for storing basic product data
  const [productData, setProductData] = useState<ProductType | undefined>(undefined);
  
  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
      const data = await productService.reqGetProductDetail(auditorId, productId);
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
  const fetchExcel = async (productId: number, auditorId: number) => {
    if (!productId) {
      setError("Product ID is required");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const companyService = new CompanyService();
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

  // Fetch data when the component mounts or when productId changes
  useEffect(() => {
    fetchProductDetail();
    fetchProductData();
  }, [productId]);

  // Return all the necessary state and functions
  return {
    productData,        // Basic product info
    productDetail,      // Detailed product info including comments and status
    loading,            // Loading state
    error,              // Error state
    fetchExcel,         // Function to fetch Excel
    refetch: fetchProductDetail, // Function to refetch product details
  };
};

export default useViewModel;
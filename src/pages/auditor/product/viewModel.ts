import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/auditor/product";
import type{ ProductDetailType } from "../../../service/api/auditor/product/type";
// import { useAuth } from "../../../auth/useAuth";

const useProductDetail = (productId: number, auditorId:number) => {
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
      // Get auditor ID from auth or use default
      // const auditorId = auth?.user?.auditor_id;
      // const auditorId = localStorage.getItem(auditorId);

      
      const data = await productService.reqGetProductDetail(auditorId, productId);
      setProductDetail(data);
    } catch (error) {
      console.error('Error fetching product detail:', error);
      setError('Failed to fetch product detail');
      setProductDetail(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  return { 
    productDetail, 
    loading, 
    error, 
    refetch: fetchProductDetail 
  };
};

export default useProductDetail;
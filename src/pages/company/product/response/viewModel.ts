// viewModel.ts
import { useState, useEffect } from 'react';
import { ProductService } from "../../../../service/api/auditor/product";
import type { ProductDetailType } from '../../../../service/api/auditor/product/type';

const useViewModel = (productId: number | null) => {
  const [productDetail, setProductDetail] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();
  
  const fetchProductDetail = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const auditorId = 1;
      const data = await productService.reqGetProductDetail(auditorId, productId);
      
      console.log("API data:", data);
      
      setProductDetail(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product details');
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  };
  
    useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);
  
  return {
    productDetail,
    loading,
    error,
    refetch: fetchProductDetail
  };
};

export default useViewModel;
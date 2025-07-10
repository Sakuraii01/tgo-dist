import { useState, useEffect } from "react";
import { ProductService } from "../../../service/api/product";
import { type ProductType } from "../../../service/api/product/type";
const useViewModel = (product_id: number) => {
  const [productData, setProductData] = useState<ProductType>();
  const productService = new ProductService();
  const fetchProductData = () => {
    productService.reqGetProduct(product_id).then((data) => {
      setProductData(data);
    });
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  return { productData };
};
export default useViewModel;

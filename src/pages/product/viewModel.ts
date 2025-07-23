import { useState, useEffect } from "react";
import { ProductService } from "../../service/api/product";
import { type ProductType } from "../../service/api/product/type";
import { CompanyService } from "../../service/api/company";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const useViewModel = (product_id: number) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductType>();
  const [excelLink, setExcelLink] = useState<string | null>(null);
  const productService = new ProductService();
  const companyService = new CompanyService();

  const fetchProductData = async () => {
    await productService.reqGetProduct(product_id).then((data) => {
      setProductData(data);
    });
  };
  const fetchGenExcel = async () => {
    if (!product_id) return;

    try {
      const data = await companyService.reqGetGenExcel(
        productData?.company_id || 0,
        product_id
      );

      setExcelLink(data.path_excel);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };
  const sendExcelToAuditor = async () => {
    if (!product_id) return;

    try {
      await companyService.reqGetExcel(
        productData?.auditor_id || 0,
        product_id
      );
      await companyService.reqPostNotification(
        productData?.auditor_id || 0,
        product_id
      );
      navigate(PROTECTED_PATH.DASHBOARD);
    } catch (error) {
      console.error("Error fetching generated Excel:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  return { productData, fetchGenExcel, excelLink, sendExcelToAuditor };
};
export default useViewModel;

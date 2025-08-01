import { useState, useEffect } from "react";
import { ProductService } from "../../service/api/product";
import { type ProductType } from "../../service/api/product/type";
import { CompanyService } from "../../service/api/company";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const useViewModel = (product_id: number) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductType>();
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
      //generate excel first
      await companyService.reqGetCompanyGenerateExcel(product_id);
      //can download
      const data = await companyService.reqGetGenExcel(product_id);

      return data.path_excel;
    } catch {
      console.error("Error fetching generated Excel");
      return null;
    }
  };

  const sendExcelToAuditor = async () => {
    if (!product_id) return;

    try {
      await companyService.reqGetExcel(product_id);
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
  return { productData, fetchGenExcel, sendExcelToAuditor };
};
export default useViewModel;

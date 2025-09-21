import { useState, useEffect } from "react";
import { ProductService } from "../../service/api/product";
import { type ProductType } from "../../service/api/product/type";
import { CompanyService } from "../../service/api/company";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";

import { Fr06Service } from "../../service/api/fr06";
import type { FR06_1Sum4142 } from "../../service/api/fr06/type";

const useViewModel = (product_id: number) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductType>();
  const [fr06Sum4142, setFr06Sum4142] = useState<FR06_1Sum4142>();
  const fr06Service = new Fr06Service();
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
  const fetchFr06Service = async () => {
    await fr06Service
      .reqGetFr06_1Sum4142(product_id)
      .then((res) => {
        setFr06Sum4142(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
    fetchFr06Service();
  }, []);
  return { fr06Sum4142, productData, fetchGenExcel, sendExcelToAuditor };
};
export default useViewModel;

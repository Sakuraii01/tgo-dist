import { useState, useEffect } from "react";
import { type ProductType } from "../../service/api/product/type";
import { ProductService } from "../../service/api/product";
import { CompanyService } from "../../service/api/company";
import { type CompanyType } from "../../service/api/company/type";
const useViewModel = () => {
  const productService = new ProductService();
  const companyService = new CompanyService();
  const [companyData, setCompanyData] = useState<CompanyType>();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [tab, setTab] = useState(0);
  const handleTabChange = (newValue: number) => {
    setTab(newValue);
  };
  const fetchProductList = async () => {
    const data = await productService.reqGetAllProducts();
    setProductList(data);
  };
  useEffect(() => {
    fetchProductList();
    companyService.reqGetCompany(1005).then((data) => {
      setCompanyData(data);
    });
  }, []);
  return {
    productList,
    tab,
    companyData,
    handleTabChange,
  };
};
export default useViewModel;

import { useState, useEffect } from "react";
import type {
  ProductType,
  AuditorReportType,
} from "../../service/api/auditor/type";
import { AuditorService } from "../../service/api/auditor";
import type { AuditorType } from "../../service/api/auditor/type";
import type { CompanyType } from "../../service/api/company/type";
import { useSearchParams } from "react-router-dom";

const useViewModel = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const auditorService = new AuditorService();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [auditorData, setAuditorData] = useState<AuditorType>();
  const [companyData] = useState<CompanyType>();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [auditorReportData, setAuditorReportData] =
    useState<AuditorReportType>();

  const auditor_id = searchParams.get("user_id");
//const auditor_id = 1;
 const auditorId = Number(auditor_id);

  const handleTabChange = (newValue: number) => {
    setTab(newValue);
  };

  const fetchAuditorData = async (auditorId: number) => {
    try {
      const data = await auditorService.reqGetAuditor(auditorId);
      setAuditorData(data);
    } catch (error) {
      console.error("Error fetching auditor data:", error);
    }
  };

  const fetchProductList = async () => {
    try {
      const allProducts: ProductType[] = [];
      const reportData = await auditorService.reqGetAllProducts(auditorId);
      await fetchAuditorData(auditorId);
      setLoading(true);
      setError(null);
      setAuditorReportData(reportData);

      if (reportData?.products && Array.isArray(reportData.products)) {
        reportData.products.forEach((group) => {
          if (group.items && Array.isArray(group.items)) {
            group.items.forEach((item) => {
              allProducts.push({
                ...item,
                products_status:
                  item.products_status !== undefined
                    ? item.products_status
                    : group.products_status,
              });
            });
          }
        });
      }

      setProductList(allProducts);
    } catch (error) {
      console.error("Error fetching product list:", error);
      setError("Failed to fetch product list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return {
    auditorData,
    productList,
    tab,
    companyData,
    auditorReportData,
    loading,
    error,
    handleTabChange,
    refetch: fetchProductList,
  };
};

export default useViewModel;

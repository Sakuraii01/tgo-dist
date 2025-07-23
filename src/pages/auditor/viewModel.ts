import { useState, useEffect } from "react";
import type {
  ProductType,
  AuditorReportType,
} from "../../service/api/auditor/type";
import { AuditorService } from "../../service/api/auditor";
import type { AuditorType } from "../../service/api/auditor/type";
import { CompanyService } from "../../service/api/company";
import type { CompanyType } from "../../service/api/company/type";
// import { useAuth } from "../../auth/useAuth";

// Get auditor ID from auth or use default
// const auditorId = auth?.user?.auditor_id;
// const auditorId = localStorage.getItem(auditorId);
const auditorId = 1;
const companyId = 1005;

const useViewModel = () => {
  const auditorService = new AuditorService();
  const companyService = new CompanyService();
  // const auth = useAuth();

  const [auditorData, setAuditorData] = useState<AuditorType>();
  const [companyData, setCompanyData] = useState<CompanyType>();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [auditorReportData, setAuditorReportData] =
    useState<AuditorReportType>();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setLoading(true);
      setError(null);

      // Fetch auditor info
      await fetchAuditorData(auditorId);

      // Fetch products report
      const reportData = await auditorService.reqGetAllProducts(auditorId);

      // Store the complete report data
      setAuditorReportData(reportData);

      // Flatten all products from all groups
      const allProducts: ProductType[] = [];

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

  const fetchCompanyData = async () => {
    try {
      const data = await companyService.reqGetCompany(companyId);
      setCompanyData(data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
    fetchCompanyData();
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

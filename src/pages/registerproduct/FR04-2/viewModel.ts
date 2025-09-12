import { ProductService } from "../../../service/api/product";
import type { ProductType } from "../../../service/api/product/type";
import { Fr04Service } from "../../../service/api/fr04";
import type {
  FR04_1Type,
  FR04_2ItemItemInfo,
  FR04ReportType,
} from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
import { TGOVehiclesService } from "../../../service/api/dropdown";
import { TGOEFDropdownService } from "../../../service/api/dropdown";
import type {
  TGOVehiclesWithEFType,
  TGOEFDropdownType,
} from "../../../service/api/dropdown/type";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import Swal from "sweetalert2";

const useViewModel = (id: number) => {
  const tgoEfService = new TGOEFDropdownService();
  const navigate = useNavigate();
  const fr04Service = new Fr04Service();
  const productService = new ProductService();
  const tgoVehiclesService = new TGOVehiclesService();
  const [productInfo, setProductInfo] = useState<ProductType>();
  const [addItem, setAddItem] = useState(false);
  const [fr04Data, setFr04Data] = useState<FR04_1Type[] | null>(null);

  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [fr04LifeCycleData, setFr04LifeCycleData] = useState<FR04ReportType>();

  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);
  const [tab, setTab] = useState(1);
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);
  const fetchTGOEFDropdown = async () => {
    const data = await tgoEfService.reqGetTGOEF();
    setTgoEfDropdown(data);
  };
  const fetchLifeCycleData = async () => {
    const data = await fr04Service.reqGetFr04_2Report(id);
    setFr04LifeCycleData(data);
  };
  const fetchTgoVehicles = async () => {
    const data = await tgoVehiclesService.reqGetTGOVehiclesWithEF();
    setTgoVehicles(data);
  };
  const handleSetAddItem = (item: boolean) => {
    setAddItem(item);
  };
  const handleSubmit = async (
    method: "POST" | "PUT",
    entity: FR04_2ItemItemInfo,
    item_id?: number
  ) => {
    try {
      if (method === "POST") {
        await fr04Service.reqPostFr04_2(entity);
      } else {
        await fr04Service.reqPutFr04_2(item_id || 0, entity);
      }
    } catch (err) {
      console.error(err);
    }
    // window.location.reload();
  };

  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_2(id);
    setFr04Data(data);
    await productService
      .reqGetProduct(id)
      .then((res) => setProductInfo(res))
      .catch((err) => console.log(err));
    await fetchTGOEFDropdown();
  };
  const handleNavigateto06_1 = async () => {
    try {
      const report_sum_id = await fr04Service
        .reqGetFr04_2Report(id)
        .then((data) => {
          return data?.report42Sum?.[0]?.report42_sum_id;
        });
      if (!report_sum_id) {
        await fr04Service.reqPostSumFR04_2(id);
      } else {
        await fr04Service.reqPutSumFR04_2(report_sum_id, id);
      }
      navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR06_1 + `?id=${id}`);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "ไม่สามารถไปขั้นตอนถัดไปได้",
        text: "กรุณากรอกข้อมูลอย่างน้อย 1 รายการ",
        icon: "warning",
        confirmButtonText: "ปิด",
        confirmButtonColor: "#0190c3",
        customClass: {
          title: "swal-title-custom",
          htmlContainer: "swal-text-custom",
        },
      });
    }
  };
  useEffect(() => {
    fetchfr04Data();
    fetchTgoVehicles();
    fetchLifeCycleData();
  }, []);
  return {
    addItem,
    fr04Data,
    tab,
    handleSubmit,
    tgoVehicles,
    tgoEfDropdown,
    handleTabChange,
    handleNavigateto06_1,
    handleSetAddItem,
    fr04LifeCycleData,
    productInfo,
  };
};
export default useViewModel;

import { Fr04Service } from "../../../service/api/fr04";
import type {
  FR04_1Type,
  FR04_2ItemItemInfo,
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
const useViewModel = (id: number) => {
  const tgoEfService = new TGOEFDropdownService();
  const navigate = useNavigate();
  const fr04Service = new Fr04Service();
  const tgoVehiclesService = new TGOVehiclesService();
  const [addItem, setAddItem] = useState(false);
  const [fr04Data, setFr04Data] = useState<FR04_1Type[] | null>(null);
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);

  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);
  const [tab, setTab] = useState(1);
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);
  const fetchTGOEFDropdown = async () => {
    const data = await tgoEfService.reqGetTGOEF();
    setTgoEfDropdown(data);
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
    if (method === "POST") {
      await fr04Service.reqPostFr04_2(entity);
    } else {
      await fr04Service.reqPutFr04_2(item_id || 0, entity);
    }
    window.location.reload();
  };

  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_2(id);
    setFr04Data(data);
    await fetchTGOEFDropdown();
  };
  const handleNavigateto04_3 = async () => {
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
    navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_3 + `?id=${id}`);
  };
  useEffect(() => {
    fetchfr04Data();
    fetchTgoVehicles();
  }, []);
  return {
    addItem,
    fr04Data,
    tab,
    handleSubmit,
    tgoVehicles,
    tgoEfDropdown,
    handleTabChange,
    handleNavigateto04_3,
    handleSetAddItem,
  };
};
export default useViewModel;

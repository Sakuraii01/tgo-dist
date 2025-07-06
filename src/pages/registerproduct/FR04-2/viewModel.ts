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
const useViewModel = (id: number) => {
  const tgoEfService = new TGOEFDropdownService();
  const fr04Service = new Fr04Service();
  const tgoVehiclesService = new TGOVehiclesService();
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
  const handleSubmit = (
    method: "POST" | "PUT",
    entity: FR04_2ItemItemInfo,
    item_id?: number
  ) => {
    if (method === "POST") {
      fr04Service.reqPostFr04_2(entity);
    } else {
      fr04Service.reqPutFr04_2(item_id || 0, entity);
      // fr04Service.reqPutFr04_2(
      //   entity.life_cycle_phase,
      //   1005,
      //   entity.product_id,
      //   entity.production_class,
      //   item_id || 0
      // );
    }
  };

  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_2(1005, id);
    setFr04Data(data);
    await fetchTGOEFDropdown();
  };
  useEffect(() => {
    fetchfr04Data();
    fetchTgoVehicles();
  }, []);
  return {
    fr04Data,
    tab,
    handleSubmit,
    tgoVehicles,
    tgoEfDropdown,
    handleTabChange,
  };
};
export default useViewModel;

import { Fr04Service } from "../../../service/api/fr04";
import { type FR04ReportType } from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
import { TGOVehiclesService } from "../../../service/api/dropdown";
import type { TGOVehiclesWithEFType } from "../../../service/api/dropdown/type";
const useViewModel = (id: number) => {
  const fr04Service = new Fr04Service();
  const tgoVehiclesService = new TGOVehiclesService();
  const [fr04Data, setFr04Data] = useState<FR04ReportType>();

  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);
  const [tab, setTab] = useState(1);
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);
  const fetchTgoVehicles = async () => {
    const data = await tgoVehiclesService.reqGetTGOVehiclesWithEF();
    setTgoVehicles(data);
  };
  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_2(id);
    setFr04Data(data);
  };
  useEffect(() => {
    fetchfr04Data();
    fetchTgoVehicles();
  }, []);
  return {
    fr04Data,
    tab,
    tgoVehicles,
    handleTabChange,
  };
};
export default useViewModel;

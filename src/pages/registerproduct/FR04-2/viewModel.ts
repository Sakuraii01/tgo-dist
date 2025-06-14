import { Fr04Service } from "../../../service/api/fr04";
import { type FR04DataType } from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
const useViewModel = () => {
  const fr04Service = new Fr04Service();
  const [fr04Data, setFr04Data] = useState<FR04DataType>();
  const [tab, setTab] = useState(1);
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);

  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_2(7);
    setFr04Data(data);
  };
  useEffect(() => {
    fetchfr04Data();
  }, []);
  return {
    fr04Data,
    tab,
    handleTabChange,
  };
};
export default useViewModel;

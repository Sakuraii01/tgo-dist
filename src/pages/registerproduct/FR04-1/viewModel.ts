import { Fr04Service } from "../../../service/api/fr04";
import { TGOEFDropdownService } from "../../../service/api/dropdown";
import type {
  TGOEFDropdownType,
  TGOEFCategoryType,
} from "../../../service/api/dropdown/type";
import type {
  FR04_1Type,
  FR04_1ItemType,
} from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
const useViewModel = (id: number) => {
  const fr04Service = new Fr04Service();
  const tgoEfService = new TGOEFDropdownService();
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [tgoEfSubcategoryDropdown, setTgoEfSubcategoryDropdown] = useState<
    TGOEFCategoryType[] | null
  >(null);
  const [tgoEfSourceRef, setTgoEfSourceRef] = useState<TGOEFDropdownType[]>([]);
  const [fr04Data, setFr04Data] = useState<FR04_1Type[]>([]);

  const [tab, setTab] = useState(1);
  const fetchTGOEFDropdown = async () => {
    const data = await tgoEfService.reqGetTGOEF();
    setTgoEfDropdown(data);
  };
  const fetchTGOEFSubcategory = async (categoryId: number) => {
    const data = await tgoEfService.reqGetTGOEFSubcategory(categoryId);

    setTgoEfSubcategoryDropdown(data);
  };
  const fetchTGOEFBySubcategory = async (
    categoryID: number,
    subcategoryId: number
  ) => {
    const data = await tgoEfService.reqGetTGOEFBySubcategory(
      categoryID,
      subcategoryId
    );
    setTgoEfSourceRef(data);
  };
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);

  const handleSubmit = async (
    method: "PUT" | "POST",
    data: FR04_1ItemType,
    item_id?: number
  ) => {
    console.log("submit", data);
    if (method === "POST") {
      await fr04Service.reqPostFr04_1(data);
    } else {
      await fr04Service.reqPutFr04_1(item_id || 0, data);
    }
  };
  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_1(1005, id);
    setFr04Data(data);

    await fetchTGOEFDropdown();
  };

  useEffect(() => {
    fetchfr04Data();
  }, []);
  return {
    fr04Data,
    tab,
    tgoEfDropdown,
    tgoEfSubcategoryDropdown,
    tgoEfSourceRef,
    fetchTGOEFBySubcategory,
    fetchTGOEFSubcategory,
    fetchTGOEFDropdown,
    handleTabChange,
    handleSubmit,
  };
};
export default useViewModel;

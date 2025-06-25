import { Fr04Service } from "../../../service/api/fr04";
import { TGOEFDropdownService } from "../../../service/api/dropdown";
import type {
  TGOEFDropdownType,
  TGOEFCategoryType,
} from "../../../service/api/dropdown/type";
import type {
  FR04_1Type,
  FR04ReportType,
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
  const [fr04Report, setFr04Report] = useState<FR04ReportType>();
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

  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_1(1005, id);
    setFr04Data(data);
    const report = await fr04Service.reqGetFR04Report(id);
    setFr04Report(report);
    await fetchTGOEFDropdown();
  };
  const initialValues = {
    LCISource: "",
    TGOEFCategory: "",
    TGOEFSubcategory: "",
    EFSource: "",
    EFSourceRef: "",
    EF: "",
    ratio: "",
    description: "",
  };
  useEffect(() => {
    fetchfr04Data();
  }, []);
  return {
    fr04Data,
    fr04Report,
    tab,
    initialValues,
    tgoEfDropdown,
    tgoEfSubcategoryDropdown,
    tgoEfSourceRef,
    fetchTGOEFBySubcategory,
    fetchTGOEFSubcategory,
    fetchTGOEFDropdown,
    handleTabChange,
  };
};
export default useViewModel;

import { Fr04Service } from "../../../service/api/fr04";
import { TGOEFDropdownService } from "../../../service/api/dropdown";
import type {
  TGOEFDropdownType,
  TGOEFCategoryType,
  TGOEFSubcategoryType,
} from "../../../service/api/dropdown/type";
import { type FR04DataType } from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
const useViewModel = () => {
  const fr04Service = new Fr04Service();
  const tgoEfService = new TGOEFDropdownService();
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >(null);
  const [tgoEfCategoryDropdown, setTgoEfCategoryDropdown] = useState<
    TGOEFCategoryType[] | null
  >(null);
  const [tgoEfSubcategoryDropdown, setTgoEfSubcategoryDropdown] = useState<
    TGOEFSubcategoryType[] | null
  >(null);
  const [tgoEfSourceRef, setTgoEfSourceRef] = useState<TGOEFDropdownType[]>([]);
  const [fr04Data, setFr04Data] = useState<FR04DataType>();
  const [tab, setTab] = useState(1);
  const fetchTGOEFDropdown = async () => {
    const data = await tgoEfService.reqGetTGOEF();
    setTgoEfDropdown(data);
  };
  const fetchTGOcategoryDropdown = async () => {
    const data = await tgoEfService.reqGetTGOcategory();
    setTgoEfCategoryDropdown(data);
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
    const data = await fr04Service.reqGetFr04_1(7);
    setFr04Data(data);
    await fetchTGOEFDropdown();
  };
  const initialValues = {
    LCISource: "",
    TGOEFCategory: "",
    TGOEFSubcategory: "",
    EFSource: "",
    EFSourceRef: "",
    ratio: "",
    description: "",
  };
  useEffect(() => {
    fetchfr04Data();
  }, []);
  return {
    fr04Data,
    tab,
    initialValues,
    tgoEfDropdown,
    tgoEfCategoryDropdown,
    tgoEfSubcategoryDropdown,
    tgoEfSourceRef,
    fetchTGOEFBySubcategory,
    fetchTGOEFSubcategory,
    fetchTGOcategoryDropdown,
    fetchTGOEFDropdown,
    handleTabChange,
  };
};
export default useViewModel;

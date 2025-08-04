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
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { SelfCollectService } from "../../../service/api/selfcollect";
import type { SelfCollectListType } from "../../../service/api/selfcollect/type";
const useViewModel = (id: number) => {
  const fr04Service = new Fr04Service();
  const tgoEfService = new TGOEFDropdownService();
  const selfCollectService = new SelfCollectService();

  const navigate = useNavigate();
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [selfCollectDropdown, setSelfCollectDropdown] = useState<
    SelfCollectListType[]
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
  const fetchSelfCollectDropdown = async () => {
    const data = await selfCollectService.reqGetSelfCollectList();
    setSelfCollectDropdown(data);
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
    if (method === "POST") {
      await fr04Service.reqPostFr04_1(data);
    } else {
      await fr04Service.reqPutFr04_1(item_id || 0, data);
    }
    window.location.reload();
  };
  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_1(id);
    setFr04Data(data);

    await fetchTGOEFDropdown();
    await fetchSelfCollectDropdown();
  };
  const handleNavigateto04_2 = async () => {
    const report_sum_id = await fr04Service
      .reqGetFr04_1Report(id)
      .then((data) => {
        return data?.report41Sum?.[0]?.report41_sum_id;
      });
    if (!report_sum_id) {
      await fr04Service.reqPostSumFR04_1(id);
    } else {
      await fr04Service.reqPutSumFR04_1(report_sum_id, id);
    }
    navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_2 + `?id=${id}`);
  };

  const handleNavigateto03 = async () => {
    const report_sum_id = await fr04Service
      .reqGetFr04_1Report(id)
      .then((data) => {
        return data?.report41Sum?.[0]?.report41_sum_id;
      });
    if (!report_sum_id) {
      await fr04Service.reqPostSumFR04_1(id);
    } else {
      await fr04Service.reqPutSumFR04_1(report_sum_id, id);
    }
    navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR03 + `?id=${id}`);
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
    selfCollectDropdown,
    handleNavigateto04_2,
    fetchTGOEFBySubcategory,
    fetchTGOEFSubcategory,
    fetchTGOEFDropdown,
    handleTabChange,
    handleSubmit,
    handleNavigateto03,
  };
};
export default useViewModel;

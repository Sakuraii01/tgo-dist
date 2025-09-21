import { ProductService } from "../../../service/api/product";
import type { ProductType } from "../../../service/api/product/type";
import { Fr04Service } from "../../../service/api/fr04";
import { TGOEFDropdownService } from "../../../service/api/dropdown";
import type {
  TGOEFDropdownType,
  TGOEFCategoryType,
} from "../../../service/api/dropdown/type";
import type {
  FR04_1Type,
  FR04_1ItemType,
  FR04ReportType,
} from "../../../service/api/fr04/type";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { SelfCollectService } from "../../../service/api/selfcollect";
import type { SelfCollectListType } from "../../../service/api/selfcollect/type";
import { UnitsDropdownService } from "../../../service/api/dropdown";
import Swal from "sweetalert2";

const useViewModel = (id: number) => {
  const fr04Service = new Fr04Service();
  const tgoEfService = new TGOEFDropdownService();
  const productService = new ProductService();
  const selfCollectService = new SelfCollectService();
  const unitService = new UnitsDropdownService();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState<ProductType>();
  const [addItem, setAddItem] = useState(false);
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [unitList, setUnitList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selfCollectDropdown, setSelfCollectDropdown] = useState<
    SelfCollectListType[]
  >([]);
  const [tgoEfSubcategoryDropdown, setTgoEfSubcategoryDropdown] = useState<
    TGOEFCategoryType[] | null
  >(null);
  const [tgoEfSourceRef, setTgoEfSourceRef] = useState<TGOEFDropdownType[]>([]);
  const [fr04Data, setFr04Data] = useState<FR04_1Type[]>([]);
  const [fr04LifeCycleData, setFr04LifeCycleData] = useState<FR04ReportType>();

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
  const fetchLifeCycleData = async () => {
    const data = await fr04Service.reqGetFr04_1Report(id);
    setFr04LifeCycleData(data);
  };
  const handleTabChange = useCallback((newValue: number) => {
    setTab(newValue);
  }, []);

  const handleSubmit = async (
    method: "PUT" | "POST",
    data: FR04_1ItemType,
    item_id?: number
  ) => {
    try {
      if (method === "POST") {
        await fr04Service.reqPostFr04_1(data);
      } else {
        await fr04Service.reqPutFr04_1(item_id || 0, data);
      }
    } catch (err) {
      console.error(err);
    }
    // window.location.reload();
  };
  const handleDeleteItem = async (item_id: number) => {
    await fr04Service.reqDeleteFr04_1(item_id);
    window.location.reload();
  };
  const fetchfr04Data = async () => {
    const data = await fr04Service.reqGetFr04_1(id);
    setFr04Data(data);

    await productService
      .reqGetProduct(id)
      .then((res) => setProductInfo(res))
      .catch((err) => console.log(err));
    await fetchTGOEFDropdown();
    await fetchSelfCollectDropdown();
  };
  const handleNavigateto04_2 = async () => {
    try {
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
    } catch (error) {
      console.error("Error in handleNavigateto04_2:", error);
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

  const handleNavigateto03 = async () => {
    try {
      const report_sum_id = await fr04Service
        .reqGetFr04_1Report(id)
        .then((data) => data?.report41Sum?.[0]?.report41_sum_id);

      if (!report_sum_id) {
        await fr04Service.reqPostSumFR04_1(id);
      } else {
        await fr04Service.reqPutSumFR04_1(report_sum_id, id);
      }
    } catch (error) {
      console.error("Error in handleNavigateto03:", error);
    } finally {
      navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR03 + `?id=${id}`);
    }
  };

  const handleSetAddItem = (item: boolean) => {
    setAddItem(item);
  };
  const handleAddItemB2C = async (
    name: string,
    life_cycle_phase: number,
    process_id: number
  ) => {
    const data: FR04_1ItemType = {
      company_id: 0,
      product_id: id,
      process_id: process_id,
      item_process_id: 0,
      life_cycle_phase: life_cycle_phase,
      production_class: null,
      item_name: name,
      item_unit: "",
      item_quantity: 0,
      lci_source_period: "",
      ef: 0,
      ef_source: "NA",
      ef_source_ref: "",
      transport_type: "",
      ratio: 0,
      ghg_emission: 0,
      ghg_emission_proportion: 0,
      cut_off: 0,
      description: "",
    };

    await fr04Service.reqPostFr04_1(data);
    await fr04Service.reqPostFr04_2({
      product_id: data.product_id,
      process_id: data.process_id,
      item_process_id: data.item_process_id,
      life_cycle_phase: data.life_cycle_phase,
      production_class: "input",
      item_name: data.item_name,
    } as any);
    // window.location.reload();
  };

  useEffect(() => {
    const fetchUnitlist = async () => {
      const unitListData = await unitService.reqGetUnits().then((data) =>
        data.map((item) => ({
          value: item.product_unit_name_en,
          label: item.product_unit_name_en,
        }))
      );
      setUnitList(unitListData);
    };
    fetchLifeCycleData();
    fetchfr04Data();
    fetchUnitlist();
  }, []);
  return {
    productInfo,
    unitList,
    fr04Data,
    addItem,
    tab,
    tgoEfDropdown,
    tgoEfSubcategoryDropdown,
    tgoEfSourceRef,
    selfCollectDropdown,
    fr04LifeCycleData,
    handleSetAddItem,
    handleNavigateto04_2,
    fetchTGOEFBySubcategory,
    fetchTGOEFSubcategory,
    fetchTGOEFDropdown,
    handleTabChange,
    handleSubmit,
    handleNavigateto03,
    handleAddItemB2C,
    handleDeleteItem,
  };
};
export default useViewModel;

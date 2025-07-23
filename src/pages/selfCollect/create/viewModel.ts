import { SelfCollectService } from "../../../service/api/selfcollect";
import type {
  SelfCollectItemListType,
  SelfCollectProcessItemType,
} from "../../../service/api/selfcollect/type";

import { useState, useEffect } from "react";

const useViewModel = (id: number) => {
  const selfCollectService = new SelfCollectService();
  const [selfcollectProcessItemList, setSelfCollectProcessItemList] =
    useState<SelfCollectItemListType>();
  const fetchSelfCollect = async () => {
    const data = await selfCollectService.reqGetSelfCollectProcessItem(
      1005,
      id
    );
    setSelfCollectProcessItemList(data);
  };
  const handleFormSubmit = async (
    entity: SelfCollectProcessItemType,
    item_id?: number
  ) => {
    if (item_id) {
      await selfCollectService
        .reqPutSelfCollectProcessPerItem(item_id, {
          cfp_report43_selfcollect_efs_id:
            entity.cfp_report43_selfcollect_efs_id,
          self_collect_id: entity.self_collect_id,
          item_name: entity.item_name || "",
          item_type: entity.item_type || "",
          item_unit: entity.item_unit || "",
          item_qty: entity.item_qty || 0,
          item_fu_qty: entity.item_fu_qty || 0,
          item_source: entity.item_source,

          item_ef: entity.item_ef || 0,
          item_ef_source: entity.item_ef_source || "",
          item_ef_source_ref: entity.item_ef_source_ref || "",

          type2_vehicle: entity.type2_vehicle || "",
          type2_distance: entity.type2_distance || 0,
          type2_outbound_load: entity.type2_outbound_load || 0,
          type2_return_load: entity.type2_return_load || 0,

          type2_vehicle_return: entity.type2_vehicle_return || "",
          type2_outbound_load_percent: entity.type2_outbound_load_percent || 0,
          type2_return_load_percent: entity.type2_return_load_percent || 0,

          type2_outbound_ef: entity.type2_outbound_ef || 0,
          type2_return_ef: entity.type2_return_ef || 0,
          type2_ef_source: entity.type2_ef_source || "",
          type2_ef_source_ref: entity.type2_ef_source_ref || "",

          transport_emission: 0,
          total_emission: 0,
          proportion: null,
          ratio: 0,
          cut_off: 0,
          type1_gas: null,
          type1_gas_unit: null,
          type1_gas_qty: null,
          type1_ef: null,
          type1_ef_source: null,
          item_emission: 0,
          transport_type: "",
          add_on_detail: "",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await selfCollectService
        .reqPostCollectProcessPerItem({
          cfp_report43_selfcollect_efs_id:
            entity.cfp_report43_selfcollect_efs_id,
          self_collect_id: id,
          item_name: entity.item_name || "",
          item_type: entity.item_type || "",
          item_unit: entity.item_unit || "",
          item_qty: entity.item_qty || 0,
          item_fu_qty: entity.item_fu_qty || 0,
          item_source: entity.item_source,

          item_ef: entity.item_ef || 0,
          item_ef_source: entity.item_ef_source || "",
          item_ef_source_ref: entity.item_ef_source_ref || "",

          type2_vehicle: entity.type2_vehicle || "",
          type2_distance: entity.type2_distance || 0,
          type2_outbound_load: entity.type2_outbound_load || 0,
          type2_return_load: entity.type2_return_load || 0,

          type2_vehicle_return: entity.type2_vehicle_return || "",
          type2_outbound_load_percent: entity.type2_outbound_load_percent || 0,
          type2_return_load_percent: entity.type2_return_load_percent || 0,

          type2_outbound_ef: entity.type2_outbound_ef || 0,
          type2_return_ef: entity.type2_return_ef || 0,
          type2_ef_source: entity.type2_ef_source || "",
          type2_ef_source_ref: entity.type2_ef_source_ref || "",

          transport_emission: 0,
          total_emission: 0,
          proportion: null,
          ratio: 0,
          cut_off: 0,
          type1_gas: null,
          type1_gas_unit: null,
          type1_gas_qty: null,
          type1_ef: null,
          type1_ef_source: null,
          item_emission: 0,
          transport_type: "",
          add_on_detail: "",
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchSelfCollect();
  }, []);

  return { selfcollectProcessItemList, handleFormSubmit };
};
export default useViewModel;

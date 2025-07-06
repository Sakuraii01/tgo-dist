import { SelfCollectService } from "../../../service/api/selfcollect";
import type { SelfCollectType } from "../../../service/api/selfcollect/type";
import {
  TGOEFDropdownService,
  UnitsDropdownService,
  TGOVehiclesService,
} from "../../../service/api/dropdown";
import type { SelfCollectItemType } from "../../../service/api/selfcollect/type";

import type {
  TGOVehiclesWithEFType,
  TGOEFDropdownType,
} from "../../../service/api/dropdown/type";
import { useState, useEffect } from "react";
type FormValues = {
  selfCollectName: string;
  input: SelfCollectItemType[];
  output: SelfCollectItemType[];
};
const useViewModel = (id: number) => {
  const selfCollectService = new SelfCollectService();
  const tGOVehiclesService = new TGOVehiclesService();
  const tGOEFDropdownService = new TGOEFDropdownService();
  const unitsDropdownService = new UnitsDropdownService();

  const initialValues: FormValues = {
    selfCollectName: "",
    input: [
      {
        item_name: "",
        item_type: "input",
        item_unit: "",
        item_qty: "",
        item_fu_qty: "",
        item_source: "",
        item_ef: "",
        item_ef_source: "",
        item_ef_source_ref: "",
        type2_distance: 0,
        type2_outbound_load: "",
        type2_return_load: "",
        type2_vehicle: "",
        type2_outbound_load_percent: 0,
        type2_return_load_percent: 0,
        type2_outbound_ef: 0,
        type2_return_ef: 0,
        type2_ef_source: "",
        type2_ef_source_ref: "",
        transport_emission: 0,
        total_emission: 0,
        proportion: 0,
        ratio: 0,
        cut_off: 0,
        type1_gas: null,
        type1_gas_unit: null,
        type1_gas_qty: null,
        type1_ef: "",
        type1_ef_source: 0,
        item_emission: null,
        transport_type: "",
        add_on_detail: "",
      },
    ],
    output: [
      {
        item_name: "",
        item_type: "input",
        item_unit: "",
        item_qty: "",
        item_fu_qty: "",
        item_source: "",
        item_ef: "",
        item_ef_source: "",
        item_ef_source_ref: "",
        type2_distance: 0,
        type2_outbound_load: "",
        type2_return_load: "",
        type2_vehicle: "",
        type2_outbound_load_percent: 0,
        type2_return_load_percent: 0,
        type2_outbound_ef: 0,
        type2_return_ef: 0,
        type2_ef_source: "",
        type2_ef_source_ref: "",
        transport_emission: 0,
        total_emission: 0,
        proportion: 0,
        ratio: 0,
        cut_off: 0,
        type1_gas: null,
        type1_gas_unit: null,
        type1_gas_qty: null,
        type1_ef: "",
        type1_ef_source: 0,
        item_emission: null,
        transport_type: "",
        add_on_detail: "",
      },
    ],
  };
  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);

  const [unitsDropdown, setUnitsDropdown] = useState<string[]>([]);
  const fetchUnitsDropdown = async () => {
    const data = await unitsDropdownService.reqGetUnits();
    setUnitsDropdown(data.map((unit) => unit.product_unit_abbr_eng));
  };

  const vehicles = new TGOVehiclesService();
  const [vehiclesDropdown, setVehiclesDropdown] = useState<
    TGOVehiclesWithEFType[]
  >([]);
  const fetchVehiclesDropdown = async () => {
    const data = await vehicles.reqGetTGOVehiclesWithEF();
    setVehiclesDropdown(data);
  };

  const handleOnSubmit = (entity: SelfCollectType) => {
    if (!id) {
      selfCollectService
        .reqPostSelfCollect(entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      selfCollectService
        .reqPutSelfCollect(id, entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fetchVehiclesDropdown();
    fetchUnitsDropdown();
    tGOVehiclesService
      .reqGetTGOVehiclesWithEF()
      .then((res) => {
        setTgoVehicles(res);
      })
      .catch((error) => {
        console.log(error);
      });
    tGOEFDropdownService
      .reqGetTGOEF()
      .then((res) => {
        setTgoEfDropdown(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    handleOnSubmit,
    initialValues,
    tgoEfDropdown,
    tgoVehicles,
    vehiclesDropdown,
    unitsDropdown,
  };
};
export default useViewModel;

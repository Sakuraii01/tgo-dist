import { type ProductType } from "../product/type";
import { type CompanyType } from "../company/type";
export type ItemProcessType = {
  report_41_id: number;
  company_id: number;
  product_id: number;
  process_id: number;
  life_cycle_phase: number;
  production_class: string;
  item_name: string;
  item_unit: string;
  item_quantity: number;
  lci_source_period: string;
  ef: number;
  ef_source: string;
  ef_source_ref: string;
  transport_type: string;
  ratio: number;
  ghg_emission: number;
  ghg_emission_proportion: number;
  cut_off: number;
  description: string;
  created_date: string;
  updated_date: string;
  process_name: string;
};
export type ItemTransportType = {
  report_42_id: number;
  company_id: number;
  product_id: number;
  process_id: number;
  production_class: string;
  life_cycle_phase: number;
  item_name: string;
  item_unit: string;
  item_fu_qty: number;
  distance: number;
  distance_source: string;
  calculate_type: string;
  type1_gas: null;
  type1_gas_unit: null;
  type1_gas_qty: null;
  type1_ef: null;
  type1_ef_source: null;
  type2_outbound_load: number;
  type2_return_load: number;
  type2_vehicle: string;
  type2_outbound_load_percent: number;
  type2_return_load_percent: number;
  type2_outbound_ef: number;
  type2_return_ef: number;
  type2_ef_source: string;
  type2_ef_source_ref: string;
  ratio: number;
  transport_emission: number;
  cut_off: null;
  add_on_detail: null;
  created_date: string;
  updated_date: string;
  process_name: string;
};
export type ProcessType = {
  process_name: string;
  product: {
    production_class: string;
    items: ItemProcessType[] | ItemTransportType[] | [];
  }[];
};
export type FR04DataType = {
  form41?: {
    life_cycle_phase: number;
    process: ProcessType[];
  }[];
  form42?: {
    life_cycle_phase: number;
    process: ProcessType[];
  }[];
  company: CompanyType;
  product: ProductType;
  process: [
    {
      process_id: number;
      product_id: number;
      ordering: number;
      process_name: string;
      mass_balanced: number;
      created_date: string;
      updated_date: string;
    }
  ];
  report41Sum: {
    report41_sum_id: number;
    product_id: number;
    sum_lc1_FU_qty: number;
    sum_lc1_emission: number;
    sum_lc1_emission_proportion: number;
    sum_lc2_FU_qty: number;
    sum_lc2_emission: number;
    sum_lc2_emission_proportion: 1;
    sum_lc3_FU_qty: null;
    sum_lc3_emission: null;
    sum_lc3_emission_proportion: null;
    sum_lc4_FU_qty: null;
    sum_lc4_emission: null;
    sum_lc4_emission_proportion: null;
    sum_lc5_FU_qty: null;
    sum_lc5_emission: null;
    sum_lc5_emission_proportion: null;
    total_sum_emission: number;
    created_date: string;
    updated_date: string;
  }[];
};

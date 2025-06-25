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
export type InputProcessType = {
  input_process_id: number;
  process_id: number;
  input_cat_id: number;
  input_name: string;
  input_unit: string;
  input_quantity: number;
  chemical_reaction: number;
  created_date: string | Date;
  updated_date: string | Date;
  input_title_id: number | null;
  input_title: string | null;
  input_cat_name_TH: string | null;
  input_cat_name: string | null;
};
export type OutputProcessType = {
  output_process_id: number;
  process_id: number;
  output_cat_id: number;
  output_name: string;
  output_unit: string;
  output_quantity: number;
  finish_output: number;
  packaging_output: number;
  created_date: string | Date;
  updated_date: string | Date;
  output_cat_name: string;
};
export type WasteProcessType = {
  waste_process_id: number;
  process_id: number;
  waste_cat_id: number;
  waste_name: string;
  waste_unit: string;
  waste_qty: number;
  created_date: string | Date;
  updated_date: string | Date;
  waste_cat_name: string;
  life_cycle_phase: number;
};
export type ReportSum = {
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
};
export type ProcessType = {
  process_id: number;
  product_id: number;
  ordering: number;
  process_name: string;
  mass_balanced: number;
  created_date: string | Date;
  updated_date: string | Date;
  life_cycle_phase: number;
  input: InputProcessType[];
  output?: OutputProcessType[];
  waste?: WasteProcessType[];
};
export type FR04ReportType = {
  form41: {
    life_cycle_phase: number;
    process: {
      process_name: string;
      product: { production_class: string; items: ItemProcessType[] }[];
    }[];
  }[];
  form42: {
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
  report41Sum: ReportSum[];
};

export type FR04_1Type = {
  life_cycle_phase: number;
  processes: ProcessType[];
};

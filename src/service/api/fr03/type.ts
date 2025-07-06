export type OutputProcessType = {
  output_process_id?: number;
  process_id: number;
  output_cat_id: number;
  output_name: string;
  output_unit: string;
  output_quantity: number;
  finish_output: number;
  packaging_output: number;
  created_date?: Date | null;
  updated_date?: Date | null;
  output_cat_name?: string;
};

export type InputProcessType = {
  input_process_id?: number;
  process_id: number;
  input_title_id?: number | null;
  input_cat_id: number;
  input_cat_name_TH?: string;
  input_name: string;
  input_unit: string;
  input_quantity: number;
  chemical_reaction: number;
  created_date?: Date | null;
  updated_date?: Date | null;
};

export type WasteProcessType = {
  waste_process_id?: number;
  process_id: number;
  waste_cat_id: number;
  waste_name: string;
  waste_unit: string;
  waste_qty?: number;
  created_date?: Date | null;
  updated_date?: Date | null;
  waste_cat_name?: string;
  life_cycle_phase?: number;
};

export type ProcessType = {
  process_id: number;
  product_id: number;
  ordering: number;
  process_name: string;
  mass_balanced: number;
  created_date: Date | null;
  updated_date: Date | null;
  input: InputProcessType[];
  output: OutputProcessType[];
  waste: WasteProcessType[];
};

export type ProcessDTO = {
  process_id?: number;
  product_id: number;
  ordering?: number;
  process_name: string;
  mass_balanced?: number;
  created_date?: string;
  updated_date?: string;
};

export type InputCategoryDropdown = {
  input_cat_id: number;
  category_names: string;
  Notes: string;
};
export type WasteCategoryDropdown = {
  waste_cat_id: 1;
  waste_cat_name: "ผลิตภัณฑ์ร่วม";
};

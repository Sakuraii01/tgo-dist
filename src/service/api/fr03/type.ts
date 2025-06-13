export type OutputProcessType = {
  output_process_id?: number;
  process_id: number;
  output_cat_id: number;
  output_name: string;
  output_unit: string;
  output_quantity: number;
  life_cycle_phase: number;
  created_date?: Date | null;
  updated_date?: Date | null;
  output_cat_name: string;
};

export type InputProcessType = {
  input_process_id?: number;
  process_id: number;
  input_cat_id: number;
  input_name: string;
  input_unit: string;
  input_quantity: number;
  chemical_reaction: boolean | 0 | 1;
  created_date?: Date | null;
  updated_date?: Date | null;
  input_title_id: number;
  input_cat_name_TH: string;
};

export type WasteProcessType = {
  waste_process_id?: number;
  process_id: number;
  waste_cat_id: number;
  waste_name: string;
  waste_unit: string;
  waste_quantity: number;
  created_date?: Date | null;
  updated_date?: Date | null;
  waste_cat_name: string;
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

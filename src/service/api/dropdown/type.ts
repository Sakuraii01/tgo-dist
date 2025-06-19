export type UnitsDrowpdownType = {
  product_unit_id: number;
  product_unit_name_th: string;
  product_unit_name_en: string;
  product_unit_abbr_th: string;
  product_unit_abbr_eng: string;
};

export type RegisterRounedType = {
  quarter: string;
  start: string;
  end: string;
};

export type TGOEFDropdownType = {
  ef_id: number;
  item: string;
  item_detail: string;
  unit: string;
  ef: string;
  ef_source_ref: string;
  tgo_updated: string;
  tgo_ef_subcat_id: number;
  created_date: string | Date;
  updated_date: string | Date;
};
export type TGOEFCategoryType = {
  tgo_ef_cat_id: number;
  tgo_ef_cat_name: string;
  created_date: string;
  updated_date: string;
};
export type TGOEFSubcategoryType = {
  tgo_ef_subcat_id: number;
  tgo_ef_subcat_name: string;
  tgo_ef_cat_id: number;
  created_date: string;
  updated_date: string;
};

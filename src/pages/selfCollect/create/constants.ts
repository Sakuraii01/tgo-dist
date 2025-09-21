export const VEHICLE_EF_OPTIONS = [
  { label: "TGO EF", value: "TG_ef" },
  { label: "Int. DB", value: "Int_DB" },
] as const;

export const EF_SOURCE_OPTIONS = [
  { label: "Self collect", value: "Self collect" },
  { label: "Supplier", value: "Supplier" },
  { label: "PCR Gen.", value: "PCR Gen" },
  { label: "TGO EF", value: "TGO EF" },
  { label: "Int. DB", value: "Int. DB" },
  { label: "Others", value: "Other" },
] as const;

export type VehicleEfSourceValue = (typeof VEHICLE_EF_OPTIONS)[number]["value"];
export type EfSourceValue = (typeof EF_SOURCE_OPTIONS)[number]["value"];

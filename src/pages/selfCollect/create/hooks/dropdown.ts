// getDropdowns.ts
import { SelfCollectService } from "../../../../service/api/selfcollect";
import type {
  TGOVehiclesWithEFType,
  TGOEFDropdownType,
} from "../../../../service/api/dropdown/type";
import {
  TGOEFDropdownService,
  UnitsDropdownService,
  TGOVehiclesService,
} from "../../../../service/api/dropdown";
import type { SelfCollectListType } from "../../../../service/api/selfcollect/type";

export type UnitsDropdownItem = { label: string; values: string };

export type DropdownsResult = {
  tgoEfDropdown: TGOEFDropdownType[];
  tgoVehicles: TGOVehiclesWithEFType[];
  vehiclesDropdown: TGOVehiclesWithEFType[]; // alias = tgoVehicles
  unitsDropdown: UnitsDropdownItem[];
  selfCollectDropdown: SelfCollectListType[];
};

// ------- module-level cache & de-dup -------
let cache: DropdownsResult | null = null;
let pending: Promise<DropdownsResult> | null = null;

function mapUnits(units: any[]): UnitsDropdownItem[] {
  return units.map((u: any) => ({
    label: u.product_unit_name_en,
    values: String(u.product_unit_id),
  }));
}

function clone(d: DropdownsResult): DropdownsResult {
  return {
    tgoEfDropdown: [...d.tgoEfDropdown],
    tgoVehicles: [...d.tgoVehicles],
    vehiclesDropdown: [...d.vehiclesDropdown],
    unitsDropdown: [...d.unitsDropdown],
    selfCollectDropdown: [...d.selfCollectDropdown],
  };
}

/** ดึง dropdown แบบฟังก์ชันธรรมดา (ไม่มี React hooks) */
export async function getDropdowns(
  forceRefresh = false
): Promise<DropdownsResult> {
  if (!forceRefresh && cache) return clone(cache);
  if (pending) return pending;

  const vehiclesSvc = new TGOVehiclesService();
  const efSvc = new TGOEFDropdownService();
  const unitSvc = new UnitsDropdownService();
  const scSvc = new SelfCollectService();

  pending = (async () => {
    const [vehicles, units, ef, sc] = await Promise.all([
      vehiclesSvc.reqGetTGOVehiclesWithEF(),
      unitSvc.reqGetUnits(),
      efSvc.reqGetTGOEF(),
      scSvc.reqGetSelfCollectList(),
    ]);

    cache = {
      tgoEfDropdown: ef,
      tgoVehicles: vehicles,
      vehiclesDropdown: vehicles,
      unitsDropdown: mapUnits(units),
      selfCollectDropdown: sc,
    };
    return clone(cache);
  })();

  try {
    return await pending;
  } finally {
    pending = null;
  }
}

export function clearDropdownsCache() {
  cache = null;
}

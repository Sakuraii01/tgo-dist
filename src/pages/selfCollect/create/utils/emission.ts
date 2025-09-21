import type { TGOVehiclesWithEFType } from "../../../../service/api/dropdown/type";
import type { SelfCollectListType } from "../../../../service/api/selfcollect/type";
import type { TGOEFDropdownType } from "../../../../service/api/dropdown/type";
import { extractWeightFromDetail } from "./parsing";
import { toNumber } from "./number";

export type EfPick = {
  source: string | undefined; // "TGO EF" | "Self collect" | ...
  sourceRef: string | number | undefined; // ef_id or self_collect_id or free text
  explicitEf?: number | string | null; // direct numeric input if not using catalog
};

export const resolveItemEf = (
  pick: EfPick,
  tgoEfDropdown: TGOEFDropdownType[] | null,
  selfCollectDropdown: SelfCollectListType[] | null
): number => {
  if (pick.source === "TGO EF") {
    const ef = tgoEfDropdown?.find(
      (d) => d.ef_id === Number(pick.sourceRef)
    )?.ef;
    return toNumber(ef, 0);
  }
  if (pick.source === "Self collect") {
    const ef = selfCollectDropdown?.find(
      (d) => d.self_collect_id === Number(pick.sourceRef)
    )?.self_collect_ef;
    return toNumber(ef, 0);
  }
  return toNumber(pick.explicitEf, 0);
};

export const computeItemFUQty = (
  itemQty: unknown,
  fu: unknown,
  lastProdValue: unknown
): number => {
  const qty = toNumber(itemQty);
  const fuVal = toNumber(fu);
  const last = toNumber(lastProdValue, 1);
  console.log("qty", qty, "fuval", fuVal, "last", last);

  if (last === 0) return 0;
  return (qty * fuVal) / last; // ton/FU or unit/FU depending on unit
};

export const computeItemEmission = (
  itemFuQty: unknown,
  ef: unknown
): number => {
  return toNumber(itemFuQty) * toNumber(ef);
};

export const computeTkm = (
  distanceKm: unknown,
  fuTonPerFU: unknown
): number => {
  return toNumber(distanceKm) * toNumber(fuTonPerFU);
};

export const resolveVehicleEf = (
  vehicles: TGOVehiclesWithEFType[],
  vehicleId: unknown
): number => {
  const v = vehicles.find((x) => x.ef_id === Number(vehicleId));
  return toNumber(v?.ef, 0);
};

export const resolveVehicleEfRef = (
  vehicles: TGOVehiclesWithEFType[],
  vehicleId: unknown
): string => {
  const v = vehicles.find((x) => x.ef_id === Number(vehicleId));
  return v?.ef_source_ref ?? "-";
};
/**
 * Outbound: emission = tkm * EF
 * Return: when using TG_ef, original code derived a pseudo "km" = tkm / weight(ton),
 * then emission = (tkm/weight) * EF. We keep that behavior for compatibility.
 */
export const computeTransportEmissions = (
  params: {
    efSource: string | undefined; // "TG_ef" | "Int_DB" | other
    distanceKm: unknown;
    fuTonPerFU: unknown; // label: ton/FU
    outbound: {
      vehicleId?: unknown;
      explicitEf?: unknown; // when not TG_ef
      explicitLoadTkm?: unknown; // when not TG_ef
    };
    returning: {
      vehicleId?: unknown;
      explicitEf?: unknown; // when not TG_ef
      explicitLoadKm?: unknown; // when not TG_ef
    };
  },
  vehicles: TGOVehiclesWithEFType[]
) => {
  const isTg = params.efSource === "TG_ef";
  const tkm = computeTkm(params.distanceKm, params.fuTonPerFU);

  // Outbound
  const outboundEf = isTg
    ? resolveVehicleEf(vehicles, params.outbound.vehicleId)
    : toNumber(params.outbound.explicitEf);

  const outboundLoadTkm = isTg
    ? tkm // computed from distance & FU
    : toNumber(params.outbound.explicitLoadTkm);

  const outboundEmission = outboundLoadTkm * outboundEf;

  // Return
  const returnEf = isTg
    ? resolveVehicleEf(vehicles, params.returning.vehicleId)
    : toNumber(params.returning.explicitEf);

  const returnLoadKm = isTg
    ? (() => {
        const v = vehicles.find(
          (x) => x.ef_id === Number(params.returning.vehicleId)
        );
        const weight = extractWeightFromDetail(v?.item_detail ?? "") ?? 0; // ton
        if (!weight) return 0;
        return tkm / weight; // original behavior
      })()
    : toNumber(params.returning.explicitLoadKm);

  const returnEmission = returnLoadKm * returnEf;

  return {
    outboundEmission,
    returnEmission,
    totalTransportEmission: outboundEmission + returnEmission,
    outboundEf,
    returnEf,
    outboundLoadTkm,
    returnLoadKm,
  } as const;
};

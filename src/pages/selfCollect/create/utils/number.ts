export const toNumber = (v: unknown, fallback = 0): number => {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : fallback;
};

export const fmt = (v: unknown, digits = 4): string => {
  const n = toNumber(v, NaN);
  return Number.isFinite(n) ? n.toFixed(digits) : "-";
};

export function commafy(input: number | bigint | string): string {
  const s = String(input).trim();
  if (!s) return "";
  // keep sign and decimal part separate
  const sign = s.startsWith("-") ? "-" : "";
  const [intPart, decPart] = s.replace(/^-/, "").split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined
    ? `${sign}${withCommas}.${decPart}`
    : `${sign}${withCommas}`;
}

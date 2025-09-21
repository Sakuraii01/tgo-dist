export const extractWeightFromDetail = (itemDetail: string): number | null => {
  if (!itemDetail) return null;
  const match = itemDetail.match(/น้ำหนักบรรทุกสูงสุด\s+(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
};

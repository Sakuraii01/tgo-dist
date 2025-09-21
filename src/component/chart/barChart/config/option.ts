export const options = {
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { stacked: false },
    y: {
      stacked: false,
      ticks: { stepSize: 250 },
      title: {
        display: true,
        text: "kgCO2eq", // ← ชื่อแกน Y
      },
    },
  },
  scaleLineColor: "white",
  barPercentage: 1,
  categoryPercentage: 0.3,
};

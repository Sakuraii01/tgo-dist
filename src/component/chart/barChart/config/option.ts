export const options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      ticks: {
        stepSize: 250,
      },
    },
  },
  scaleLineColor: "white",
  barPercentage: 1,
  categoryPercentage: 0.3,
};

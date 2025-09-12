import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { options } from "./config/option";
import type { ChartData } from "chart.js";

type BarChartData<TData = number[], TLabel = string> = ChartData<
  "bar",
  TData,
  TLabel
>;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface LineChartProps {
  data: BarChartData;
}

const BarChart = (props: LineChartProps) => {
  return (
    <div className="mx-auto my-7 w-4/5 h-[350px]">
      <Bar options={options} data={props.data} />
    </div>
  );
};

export default BarChart;

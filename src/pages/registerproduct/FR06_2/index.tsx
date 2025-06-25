import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
const FR06_2 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  return (
    <div>
      <ProcessStepper isActive={6} id={id} />
    </div>
  );
};
export default FR06_2;

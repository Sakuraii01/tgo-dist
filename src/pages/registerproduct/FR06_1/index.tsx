import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
const FR06_1 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  return (
    <div>
      <ProcessStepper isActive={5} id={id} />
    </div>
  );
};
export default FR06_1;

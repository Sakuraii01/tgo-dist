import { commafy } from "../../../../utils/comma";
export type MaterialCardProps = {
  title: string;
  unit: string;
  amount: number;
  type?: string;
  button: React.ReactNode;
  isLastProduct?: boolean;
};
export type InfoProps = {
  title: string;
  amount: number | string;
};
const Info = (props: InfoProps) => {
  return (
    <div className="font-medium">
      <label className="text-gray-300 text-xs">{props.title}</label>
      <p>{props.amount}</p>
    </div>
  );
};
export const MaterialCardItem = (props: MaterialCardProps) => {
  return (
    <div className="border-2 border-stroke rounded-lg py-3 px-5 w-full bg-white mb-2">
      <div className="mb-3 grid grid-cols-8 gap-3">
        <h3 className="font-semibold col-span-3">{props.title}</h3>
        <div className="col-span-2">
          <Info title="หน่วย" amount={props.unit} />
        </div>
        <div className="col-span-2">
          <Info title="ปริมาณ" amount={commafy(props.amount)} />
        </div>

        {props.type && <Info title="ประเภท" amount={props.type} />}
        <div className="ml-auto">{props.button}</div>
      </div>
      {props.isLastProduct && (
        <p className="mt-auto font-medium text-sm ml-auto text-primary w-fit">
          เป็นผลิตภัณฑ์สุดท้าย
        </p>
      )}
    </div>
  );
};

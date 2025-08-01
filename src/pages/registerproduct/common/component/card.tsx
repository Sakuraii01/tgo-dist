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
      <div className="mb-3 flex justify-between">
        <h3 className="font-semibold text-xl">{props.title}</h3>
        {props.button}
      </div>
      <div className="flex gap-6">
        <Info title="หน่วย" amount={props.unit} />
        <Info title="ปริมาณ" amount={props.amount} />
        {props.isLastProduct && (
          <p className="mt-auto font-medium text-sm ml-auto text-primary">
            เป็นผลิตภัณฑ์สุดท้าย
          </p>
        )}
        {props.type && <Info title="ประเภท" amount={props.type} />}
      </div>
    </div>
  );
};

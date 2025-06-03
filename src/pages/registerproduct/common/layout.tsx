import { Accordion } from "./component/accordion";
import { Stepper, Step, StepLabel, Tabs, Tab } from "@mui/material";
import { useState } from "react";

export type FR04LayoutProps = {
  isB2B: boolean;
  subMethod: string[];
  accordionTitle?: string[];
  form?: React.ReactNode;
  summary: {
    LCI_sum: string | number;
    multiply_sum: string | number;
    percentage_sum: string | number;
  };
};
export const steps = ["FR03", "FR04.1", "FR04.2"];
export const FR04Layout = (props: FR04LayoutProps) => {
  const [value, setValue] = useState("one");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-gray-50 mb-3">
        <div className="w-fit mx-auto">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value="one" label="การได้มาของวัตถุดิบ" />
            <Tab value="two" label="การผลิต" />

            {props.isB2B && <Tab value="three" label="การกระจายสินค้า" />}
            {props.isB2B && <Tab value="four" label="การใช้งาน" />}
            {props.isB2B && <Tab value="five" label="การจัดการซาก" />}
          </Tabs>
        </div>
      </div>
      <div className="flex">
        {(value === "one" || value === "two") && (
          <div className="w-1/4">
            <ul className="flex flex-col gap-2">
              {props.subMethod.map((data, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 px-4 py-3 border-y border-primary-2/10 hover:bg-gray-100 ${
                    index === 0 ? "bg-white" : "bg-stroke"
                  }`}
                >
                  <div
                    className={`rounded-full ${
                      index === 0
                        ? "bg-primary/10 border border-primary text-primary"
                        : "border-2 border-gray-300 text-gray-300"
                    }  font-semibold text-sm w-8 h-8 mr-4 flex items-center justify-center`}
                  >
                    {index + 1}
                  </div>
                  <p
                    className={`${
                      index === 0 ? "text-primary" : "text-gray-300"
                    } font-medium`}
                  >
                    {data}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-3/4 px-4 mx-auto">
          <div className="px-4 mt-3 pb-3 mb-3 border-b border-stroke">
            <button className="text-white bg-primary-2 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2">
              + เพิ่มรายการ
            </button>
          </div>
          <div>
            {props.accordionTitle?.map((data, index) => (
              <div key={index} className="mb-4">
                <Accordion title={data}>{props.form}</Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type stepperProps = {
  isActive: number;
};
export const ProcessStepper = (props: stepperProps) => {
  return (
    <div className="my-10">
      <Stepper activeStep={props.isActive}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

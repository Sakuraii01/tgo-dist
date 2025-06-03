import { TextField } from "@mui/material";
import {
  DeleteRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { MaterialCardItem } from "../common/component/card";
import { useState } from "react";
import { ProcessStepper } from "../common/layout";
const FR03 = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={0} />
      </div>
      <FR03Item order={1} />
      <FR03Item order={2} />
      <FR03Item order={3} />
      <div className="w-1/4 mx-auto">
        <button
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};
export default FR03;

type FR03ItemProps = {
  order: number;
};
const FR03Item = (props: FR03ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex max-w-5xl mx-auto my-3">
      <div className="rounded-full bg-primary/10 border border-primary text-primary font-semibold text-sm flex items-center justify-center w-8 h-8 mr-4">
        <p>{props.order}</p>
      </div>
      <div className="border border-gray-400 rounded-md pt-3 w-full">
        <div
          className={`flex ${
            isOpen ? "border-b" : ""
          } border-gray-400 pb-4 px-6`}
        >
          <div className="w-1/2">
            <TextField
              label="ชื่อกระบวนการ"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            />
          </div>
          <button className="border border-red-700 rounded-full text-red-700 font-semibold text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4">
            <DeleteRounded />
            <p>ลบกระบวนการ</p>
          </button>
          <div onClick={toggleAccordion} className="ml-auto my-auto">
            {isOpen ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </div>
        </div>
        {isOpen && (
          <>
            <div className="px-6 py-4">
              <button className="text-white bg-primary-2 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2">
                <p>+ เพิ่มรายการ</p>
              </button>
            </div>
            <div className="border-t border-gray-400 bg-gray-100 flex gap-2 px-5 py-4">
              <div className="rounded-md bg-white border border-gray-400 p-4 w-full">
                <div>
                  <h5 className="text-black font-medium text-lg mb-4">
                    สารขาเข้า
                  </h5>
                </div>
                <div className="font-medium">
                  <div className="mb-6">
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>วัตถุดิบ</p>
                    </div>
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                      type="Material (M)"
                    />
                  </div>
                  <div>
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>ทรัพยากร และวัสดุช่วยการผลิต</p>
                    </div>
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                      type="Material (M)"
                    />
                    <div className="my-2">
                      <MaterialCardItem
                        title="Ammonium Nitrate"
                        unit="kg"
                        amount={100}
                        type="Material (M)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ผลิตภัณฑ์ระหว่างทาง
                    </h5>
                  </div>
                  <div className="font-medium flex flex-col gap-2">
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                    />
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                    />
                    <div className="my-2">
                      <MaterialCardItem
                        title="Ammonium Nitrate"
                        unit="kg"
                        amount={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ของเสีย/สารขาออก
                    </h5>
                  </div>
                  <div className="font-medium">
                    <p className="ms-3">-</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

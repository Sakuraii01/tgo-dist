import { FR04Layout } from "../common/layout";
import { Autocomplete, TextField } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { ProcessStepper } from "../common/layout";
const FR04_1 = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={1} />
      </div>
      <FR04Layout
        isB2B={false}
        subMethod={[
          "กระบวนการทำเหมือง",
          "กระบวนการเตรียมวัตถุดิบ",
          "กระบวนการผลิตปูนเม็ดดิบ",
        ]}
        accordionTitle={FR04_1Data.accordionTitle}
        form={
          <div className="flex flex-col gap-3">
            <FR04_1Form />
          </div>
        }
        summary={FR04_1Data.summary}
      />
    </div>
  );
};
export default FR04_1;

const FR04_1Data = {
  isB2B: true,
  subMethod: ["Ammonium Nitrate", "Urea", "Potassium Nitrate"],
  accordionTitle: ["Ammonium Nitrate", "Diesel (ANFO)", "Diesel"],
  form: <></>,
  summary: {
    LCI_sum: 0.3486,
    multiply_sum: 0.381,
    percentage_sum: "1.00",
  },
};

const FR04_1Form = () => {
  return (
    <div className="flex flex-col gap-4 font-medium">
      <div>
        <p>LCI</p>
        <div className="flex gap-8">
          <div>
            <label className="text-sm text-gray-300">หน่วย</label>
            <p>kg</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ปริมาณ</label>
            <p>1,219</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ปริมาณ/FU</label>
            <p>0.0003</p>
          </div>
          <div className="mt-auto w-64">
            <label className="text-sm text-gray-300">ที่มาของค่า LCI</label>
            <TextField
              label="ที่มาของค่า LCI"
              variant="outlined"
              type="string"
              size="small"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div>
        <p>EF</p>
        <div className="flex gap-8">
          <div className="w-40">
            <label className="text-sm text-gray-300">ที่มาของค่า EF</label>
            <Autocomplete
              options={EF}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ที่มาของค่า EF"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="w-64">
            <label className="text-sm text-gray-300">แหล่งอ้างอิง EF</label>
            <Autocomplete
              options={LCIandEF}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="แหล่งอ้างอิง EF"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">ค่า EF</label>
            <p>8.4819</p>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div>
          <label className="text-sm text-gray-300">ผลคูณ</label>
          <p>0.0027</p>
        </div>
        <div>
          <label className="text-sm text-gray-300">สัดส่วน</label>
          <p>0.07 %</p>
        </div>
        <div className="ml-auto">
          <button className="border border-red-700 rounded-full text-red-700 text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4">
            <DeleteRounded />
            <p>ลบรายการ</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const LCIandEF = [
  "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 66",
  "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 65",
];

const EF = ["TGO EF", "self EF", "TGO LCI", "self LCI"];

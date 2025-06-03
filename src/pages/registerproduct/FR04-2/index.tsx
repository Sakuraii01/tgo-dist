import { FR04Layout } from "../common/layout";
import {
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useState } from "react";
import { ProcessStepper } from "../common/layout";
const FR04_2 = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={2} />
      </div>
      <FR04Layout
        isB2B={true}
        subMethod={[
          "กระบวนการทำเหมือง",
          "กระบวนการเตรียมวัตถุดิบ",
          "กระบวนการผลิตปูนเม็ดดิบ",
        ]}
        accordionTitle={FR04_2Data.accordionTitle}
        form={
          <div className="flex flex-col gap-3">
            <FR04_2Form />
          </div>
        }
        summary={FR04_2Data.summary}
      />
    </div>
  );
};
export default FR04_2;

const FR04_2Data = {
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

const FR04_2Form = () => {
  const [trafficType, setTrafficType] = useState("a");
  const handleTrafficTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrafficType((event.target as HTMLInputElement).value);
  };
  return (
    <div className="flex flex-col gap-4 font-medium">
      <div>
        <p>การขนส่ง</p>
        <div className="flex gap-2">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="a"
            name="radio-buttons-group"
            row
            value={trafficType}
            onChange={handleTrafficTypeChange}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label="ก.แบบการใช้เชื้อเพลิง"
            />
            <FormControlLabel
              value="b"
              control={<Radio />}
              label="ข.แบบการใช้ระยะทาง"
            />
          </RadioGroup>
        </div>
        <div className="flex gap-8">
          <div>
            <label className="text-sm text-gray-300">หน่วย</label>
            <p>kg</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ปริมาณ/FU</label>
            <p>0.0003</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ระยะทาง/KM</label>
            <p>1,219</p>
          </div>
          <div className="mt-auto w-64">
            <label className="text-sm text-gray-300">
              แหล่งที่มาของข้อมูลข่นส่ง
            </label>
            <TextField
              label="แหล่งที่มาของข้อมูลข่นส่ง"
              variant="outlined"
              type="string"
              size="small"
              fullWidth
            />
          </div>
        </div>
      </div>
      {trafficType === "b" ? (
        <div>
          <div>
            <p>แบบการใช้ระยะทาง</p>
            <div className="flex gap-8">
              <div className="w-40">
                <label className="text-sm text-gray-300">
                  ภาระบรรทุกเที่ยวไป (KM)
                </label>
                <TextField
                  label="ภาระบรรทุกเที่ยวไป (KM)"
                  variant="outlined"
                  type="string"
                  size="small"
                  fullWidth
                />
              </div>
              <div className="w-40">
                <label className="text-sm text-gray-300">
                  ภาระบรรทุกเที่ยวกลับ (KM)
                </label>
                <TextField
                  label="ภาระบรรทุกเที่ยวกลับ (KM)"
                  variant="outlined"
                  type="string"
                  size="small"
                  fullWidth
                />
              </div>
              <div className="w-64">
                <label className="text-sm text-gray-300">พาหนะ</label>
                <Autocomplete
                  options={["รถบรรทุก", "เรือ", "เครื่องบิน"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="พาหนะ"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">% เที่ยวไป</label>
                <p>0.0454</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">% เที่ยวกลับ</label>
                <p>0.0454</p>
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
                <label className="text-sm text-gray-300">ค่า EF เที่ยวไป</label>
                <p>8.4819</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  ค่า EF เที่ยวกลับ
                </label>
                <p>8.4819</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p>แบบการใช้เชื้อเพลิง</p>
            <div className="flex gap-8">
              <div className="w-40">
                <label className="text-sm text-gray-300">ปริมาณ</label>
                <TextField
                  label="ภาระบรรทุกเที่ยวไป (KM)"
                  variant="outlined"
                  type="string"
                  size="small"
                  fullWidth
                />
              </div>
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
              <div className="w-40">
                <label className="text-sm text-gray-300">ค่า EF</label>
                <p>0.0454</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-8">
        <div>
          <label className="text-sm text-gray-300">การปันส่วน</label>
          <p>100 %</p>
        </div>
        <div>
          <label className="text-sm text-gray-300">ผลคูณ</label>
          <p>0.0027</p>
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

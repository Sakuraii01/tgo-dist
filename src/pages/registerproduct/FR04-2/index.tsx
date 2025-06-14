import { FR04Layout } from "../common/layout";
import {
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DeleteRounded, Save, Edit } from "@mui/icons-material";
import { useState } from "react";
import { ProcessStepper } from "../common/layout";
import useViewModel from "./viewModel";
import { Accordion } from "../common/component/accordion";
import { type ItemTransportType } from "../../../service/api/fr04/type";
const FR04_2 = () => {
  const { fr04Data, tab, handleTabChange } = useViewModel();
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={2} />
      </div>
      <FR04Layout isB2B={true} tabIndex={tab} handleTabChange={handleTabChange}>
        <div>
          {fr04Data?.form42?.[tab - 1]?.process.map((data) => (
            <div className="border-b border-gray-300 pb-10 mb-10">
              <h3 className="font-semibold text-linear text-primary-linear text-3xl mb-5">
                {data.process_name}
              </h3>
              {/* <h4>สารขาเข้า</h4> */}
              {data.product
                .filter((type) => type.production_class === "input")
                .map((product) =>
                  product.items
                    .filter(
                      (item): item is ItemTransportType =>
                        (item as ItemTransportType).report_42_id !== undefined
                    )
                    .map((item) => (
                      <div className="my-5">
                        <Accordion
                          additionalHeader={
                            <div className="flex gap-1 ml-5 h-fit my-auto">
                              <label className="text-gray-300">ปริมาณ/FU</label>
                              <p>{item.item_fu_qty ?? "-"}</p>{" "}
                              <p>{item.item_unit ?? "-"}</p>
                            </div>
                          }
                          title={item.item_name}
                        >
                          <FR04_2Form data={item} />
                        </Accordion>
                      </div>
                    ))
                )}
            </div>
          ))}
        </div>
      </FR04Layout>
    </div>
  );
};
export default FR04_2;

const FR04_2Form = (props: { data: ItemTransportType }) => {
  const [isEdit, setIsEdit] = useState(false);
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
            <label className="text-sm text-gray-300">ระยะทาง/KM</label>
            <p>{props.data.distance ?? "-"}</p>
          </div>
          {isEdit ? (
            <div className="mt-auto w-64">
              <TextField
                label="แหล่งที่มาของข้อมูลข่นส่ง"
                variant="outlined"
                type="string"
                size="small"
                fullWidth
              />
            </div>
          ) : (
            <div>
              <label className="text-sm text-gray-300">
                แหล่งที่มาของข้อมูลข่นส่ง
              </label>
              <p>{props.data.distance_source ?? "-"}</p>
            </div>
          )}
        </div>
      </div>
      {trafficType === "b" ? (
        <div>
          <div>
            <p>แบบการใช้ระยะทาง</p>
            <div className="flex flex-wrap gap-x-8">
              {isEdit ? (
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
              ) : (
                <div>
                  <label className="text-sm text-gray-300">
                    ภาระบรรทุกเที่ยวไป (KM)
                  </label>
                  <p>{props.data.type2_outbound_load ?? "-"}</p>
                </div>
              )}

              {isEdit ? (
                <div className="w-40">
                  <TextField
                    label="ภาระบรรทุกเที่ยวกลับ (KM)"
                    variant="outlined"
                    type="string"
                    size="small"
                    fullWidth
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-300">
                    ภาระบรรทุกเที่ยวกลับ (KM)
                  </label>
                  <p>{props.data.type2_return_load ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
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
              ) : (
                <div>
                  <label className="text-sm text-gray-300">พาหนะ</label>
                  <p>{props.data.type2_vehicle ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
                <div className="w-64">
                  <label className="text-sm text-gray-300">พาหนะ</label>
                  <Autocomplete
                    options={[
                      "รถบรรทุก 8 ล้อ",
                      "รถบรรทุก 10 ล้อ",
                      "รถบรรทุก 12 ล้อ",
                    ]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="ประเภทพาหนะ"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-300">ประเภทพาหนะ</label>
                  <p>{props.data.type2_vehicle ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
                <div className="w-40">
                  <TextField
                    label="% เที่ยวไป"
                    variant="outlined"
                    type="string"
                    size="small"
                    fullWidth
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-300">% เที่ยวไป</label>
                  <p>{props.data.type2_outbound_load_percent ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
                <div className="w-40">
                  <TextField
                    label="% เที่ยวกลับ"
                    variant="outlined"
                    type="string"
                    size="small"
                    fullWidth
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-300">% เที่ยวไป</label>
                  <p>{props.data.type2_return_load_percent ?? "-"}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p>EF</p>
            <div className="flex gap-8">
              {isEdit ? (
                <div className="w-40">
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
              ) : (
                <div>
                  <label className="text-sm text-gray-300">
                    ที่มาของค่า EF
                  </label>
                  <p>{props.data.type2_return_ef ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
                <div className="w-64">
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
              ) : (
                <div>
                  <label className="text-sm text-gray-300">
                    แหล่งอ้างอิง EF
                  </label>
                  <p>{props.data.type2_ef_source_ref ?? "-"}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-300">ค่า EF เที่ยวไป</label>
                <p>{props.data.type2_outbound_ef ?? "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  ค่า EF เที่ยวกลับ
                </label>
                <p>{props.data.type2_return_ef ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p>แบบการใช้เชื้อเพลิง</p>
            <div className="flex gap-8">
              {isEdit ? (
                <div className="w-40">
                  <TextField
                    label="ภาระบรรทุกเที่ยวไป (KM)"
                    variant="outlined"
                    type="string"
                    size="small"
                    fullWidth
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-300">ปริมาณ</label>
                  <p>{props.data.type1_gas_unit ?? "-"}</p>
                </div>
              )}
              {isEdit ? (
                <div className="w-40">
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
              ) : (
                <div>
                  <label className="text-sm text-gray-300">
                    ที่มาของค่า EF
                  </label>
                  <p>{props.data.type1_ef_source ?? "-"}</p>
                </div>
              )}
              <div className="w-40">
                <label className="text-sm text-gray-300">ค่า EF</label>
                <p>{props.data.type1_ef ?? "-"}</p>
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
          {isEdit ? (
            <div className="mt-4.5">
              <label className="text-red-500">อย่าลืมกด save na</label>
              <button
                onClick={() => setIsEdit(false)}
                className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit  px-4 py-1 ml-4"
              >
                <Save />
                <p>บันทึก</p>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEdit(true)}
                className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4"
              >
                <Edit />
                <p>แก้ไข</p>
              </button>
              <button className="border border-red-700 rounded-full text-red-700 text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4">
                <DeleteRounded />
                <p>ลบรายการ</p>
              </button>
            </div>
          )}
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

import { FR04Layout } from "../common/layout";
import { Autocomplete, TextField } from "@mui/material";
import { DeleteRounded, Save, Edit } from "@mui/icons-material";
import { ProcessStepper } from "../common/layout";
import { useState } from "react";
import useViewModel from "./viewModel";
import { Accordion } from "../common/component/accordion";
import { type ItemProcessType } from "../../../service/api/fr04/type";
const FR04_1 = () => {
  const { fr04Data, tab, handleTabChange } = useViewModel();
  console.log(fr04Data);
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={1} />
      </div>
      <FR04Layout
        isB2B={false}
        tabIndex={tab}
        handleTabChange={handleTabChange}
      >
        <div>
          {fr04Data?.form41?.[tab - 1]?.process.map((data) => (
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
                      (item): item is ItemProcessType =>
                        (item as ItemProcessType).report_41_id !== undefined
                    )
                    .map((item) => (
                      <div className="my-5">
                        <Accordion title={item.item_name}>
                          <FR04_1Form data={item} />
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
export default FR04_1;

const FR04_1Form = (props: { data: ItemProcessType }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-4 font-medium">
      <div>
        <p>LCI</p>
        <div className="flex gap-8">
          <div>
            <label className="text-sm text-gray-300">หน่วย</label>
            <p>{props.data.item_unit}</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ปริมาณ</label>
            <p>{props.data.item_quantity}</p>
          </div>
          <div>
            <label className="text-sm text-gray-300">ปริมาณ/FU</label>
            <p>{"-"}</p>
          </div>
          <div className="mt-auto w-64">
            {isEdit ? (
              <TextField
                label="ที่มาของค่า LCI"
                variant="outlined"
                type="string"
                size="small"
                fullWidth
              />
            ) : (
              <div>
                <label className="text-sm text-gray-300">ที่มาของค่า LCI</label>
                <p>{props.data.lci_source_period}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <p>EF</p>
        <div className="flex flex-wrap gap-x-8">
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
              <label className="text-sm text-gray-300">ที่มาของค่า EF</label>
              <p className="w-fit">{props.data.ef_source}</p>
            </div>
          )}
          {isEdit ? (
            <div className="w-40">
              <Autocomplete
                options={Subcategory}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ประเภทของวัสดุ"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </div>
          ) : (
            <div>
              <label className="text-sm text-gray-300">ประเภทของวัสดุ</label>
              <p className="w-fit">{"-"}</p>
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
              <label className="text-sm text-gray-300">แหล่งอ้างอิง EF</label>
              <p className="w-fit">{props.data.ef_source_ref}</p>
            </div>
          )}
          <div>
            <label className="text-sm text-gray-300">ค่า EF</label>
            <p>8.4819</p>
          </div>
        </div>
      </div>
      <div className="flex gap-8 mt-5">
        {isEdit ? (
          <TextField label="การปันส่วน %" value={100} size="small" />
        ) : (
          <div>
            <label className="text-sm text-gray-300">การปันส่วน %</label>
            <p className="w-fit">{props.data.cut_off}</p>
          </div>
        )}
        <div>
          <label className="text-sm text-gray-300">ผลคูณ</label>
          <p>0.0027</p>
        </div>
        <div>
          <label className="text-sm text-gray-300">สัดส่วน</label>
          <p>0.07 %</p>
        </div>
      </div>
      <div className="mt-auto">
        {isEdit ? (
          <TextField
            label="หมายเหตุ / คำอธิบายเพิ่มเติม"
            variant="outlined"
            type="string"
            size="small"
            fullWidth
            multiline
          />
        ) : (
          <div>
            <label className="text-sm text-gray-300">
              หมายเหตุ / คำอธิบายเพิ่มเติม
            </label>
            <p>{props.data.description ?? "-"}</p>
          </div>
        )}
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
  );
};

const LCIandEF = [
  "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 66",
  "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 65",
];

const EF = ["TGO EF", "self EF", "TGO LCI", "self LCI"];
const Subcategory = ["กลุ่มปิโตรเลี่ยม", "สิ่งทอ", "ยาง"];

// const outputProduct = [
//   {
//     productname: "product1",
//     value: 100,
//   },
//   {
//     productname: "product2",
//     value: 100,
//   },
//   {
//     productname: "product3",
//     value: 100,
//   },
// ];

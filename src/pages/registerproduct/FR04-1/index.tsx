import { useState, useEffect } from "react";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Save, Edit } from "@mui/icons-material";
import { Accordion } from "../common/component/accordion";
import { ProcessStepper } from "../common/component/stepper";
import { FR04Layout } from "../common/layout";

import useViewModel from "./viewModel";
import type {
  ProcessType,
  InputProcessType,
  OutputProcessType,
  WasteProcessType,
} from "../../../service/api/fr04/type";

import { Formik, Form } from "formik";
import { Field, AutoCompleteField } from "../../../component/input/field";
const FR04_1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr04Data, tab, handleTabChange } = useViewModel(id);
  console.log(fr04Data);
  return (
    <div>
      <ProcessStepper isActive={2} id={id} />

      <FR04Layout
        isB2B={false}
        tabIndex={tab}
        handleTabChange={handleTabChange}
      >
        <div>
          {fr04Data?.[tab - 1]?.processes.map((data) => (
            <div className="border-b border-gray-300 pb-10 mb-10">
              <h3 className="font-semibold text-linear text-primary-linear text-3xl mb-5">
                {data.process_name}
              </h3>
              {/* <h4>สารขาเข้า</h4> */}
              {data.input.map((product) => (
                <div className="my-5">
                  <Accordion title={product.input_name}>
                    <FR04_1Form data={product} id={id} />
                  </Accordion>
                </div>
              ))}
            </div>
          ))}
        </div>
      </FR04Layout>
      <div className="w-1/4 mx-auto">
        <button
          onClick={() => navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_2)}
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};
export default FR04_1;

const FR04_1Form = (props: {
  data: InputProcessType | OutputProcessType | WasteProcessType;
  id: number;
}) => {
  const {
    initialValues,
    tgoEfCategoryDropdown,
    tgoEfSubcategoryDropdown,
    tgoEfSourceRef,
    fetchTGOcategoryDropdown,
  } = useViewModel(props.id);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // handleSubmit(values);
        console.log("Submit", values);
        setIsEdit(false);
      }}
    >
      {({ handleSubmit, values }) => {
        useEffect(() => {
          console.log("Formik values changed:", values);
          if (values.EFSource === "tgo_ef") {
            fetchTGOcategoryDropdown();
            console.log("Fetching TGO EF Dropdown");
            console.log(tgoEfCategoryDropdown);
          }
        }, [values]);
        return (
          <Form onSubmit={handleSubmit} onChange={(_) => console.log(values)}>
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
                      <Field
                        name="LCISource"
                        label="ที่มาของค่า LCI"
                        placeholder="ที่มาของค่า LCI"
                        require
                      />
                    ) : (
                      <div>
                        <label className="text-sm text-gray-300">
                          ที่มาของค่า LCI
                        </label>
                        <p>{props.data.lci_source_period}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p>EF</p>
                {isEdit ? (
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <div className="w-40">
                      <AutoCompleteField
                        name="EFSource"
                        label="ที่มาของค่า EF"
                        placeholder="ที่มาของค่า EF"
                        items={EF.map((item) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                    </div>
                    {tgoEfCategoryDropdown && (
                      <div className="w-40">
                        <AutoCompleteField
                          name="TGOEFCategory"
                          label="ประเภทของวัสดุ"
                          placeholder="ประเภทของวัสดุ"
                          items={tgoEfCategoryDropdown.map((item) => ({
                            label: item?.tgo_ef_cat_name,
                            value: item?.tgo_ef_cat_id,
                          }))}
                        />
                      </div>
                    )}
                    <div className="w-60">
                      {tgoEfSubcategoryDropdown && (
                        <AutoCompleteField
                          name="TGOEFSubcategory"
                          label="ประเภทของวัสดุรอง"
                          placeholder="ประเภทของวัสดุรอง"
                          items={tgoEfSubcategoryDropdown.map((item) => ({
                            label: item.tgo_ef_subcat_name,
                            value: item.tgo_ef_subcat_id,
                          }))}
                        />
                      )}
                    </div>
                    <div className="w-80">
                      <AutoCompleteField
                        name="EFSourceRef"
                        label="แหล่งอ้างอิง EF"
                        placeholder="แหล่งอ้างอิง EF"
                        items={tgoEfSourceRef.map((item) => ({
                          label: item.ef_source_ref,
                          value: item.ef_id,
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">ค่า EF</label>
                      <p>8.4819</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-8">
                    <div>
                      <label className="text-sm text-gray-300">
                        ที่มาของค่า EF
                      </label>
                      <p className="w-fit">{props.data.ef_source}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">
                        ประเภทของวัสดุ
                      </label>
                      <p className="w-fit">{"-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">
                        ประเภทของวัสดุรอง
                      </label>
                      <p className="w-fit">{"-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">
                        แหล่งอ้างอิง EF
                      </label>
                      <p className="w-fit">{props.data.ef_source_ref}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">ค่า EF</label>
                      <p>8.4819</p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {isEdit ? (
                  <div className="flex gap-8 mt-5">
                    <div className="w-64">
                      <Field
                        name="ratio"
                        label="สัดส่วนการปันส่วน"
                        placeholder="สัดส่วนการปันส่วน"
                        type="number"
                        require
                      />
                    </div>
                    <Field
                      name="description"
                      label="หมายเหตุ / คำอธิบายเพิ่มเติม"
                      placeholder="หมายเหตุ / คำอธิบายเพิ่มเติม"
                      require
                    />
                  </div>
                ) : (
                  <div className="flex gap-8 mt-5">
                    <div>
                      <label className="text-sm text-gray-300">
                        การปันส่วน %
                      </label>
                      <p className="w-fit">{props.data.cut_off}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">
                        หมายเหตุ / คำอธิบายเพิ่มเติม
                      </label>
                      <p>{props.data.description ?? "-"}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-8 mt-5">
                  <div>
                    <label className="text-sm text-gray-300">ผลคูณ</label>
                    <p>0.0027</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">สัดส่วน</label>
                    <p>0.07 %</p>
                  </div>
                </div>
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
                  </div>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

// const LCIandEF = [
//   "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 66",
//   "ข้อมูลการผลิตของโรงงาน ม.ค - ธ.ค. 65",
// ];

const EF = [
  { label: "Self collect", value: "self_collect" },
  { label: "Supplier", value: "supplier" },
  { label: "PCR Gen.", value: "pcr_gen" },
  { label: "TGO EF", value: "tgo_ef" },
  { label: "Int. DB", value: "int_db" },
  { label: "Others", value: "others" },
];
// const Subcategory = ["กลุ่มปิโตรเลี่ยม", "สิ่งทอ", "ยาง"];

// import { useFormikContext } from "formik";
// import { useEffect } from "react";

// const AutoFetchTGOEF = () => {
//   const { values } = useFormikContext<any>();
//   const { fetchTGOEFDropdown } = useViewModel();

//   useEffect(() => {
//     if (values.EF === "TGO EF") {
//       fetchTGOEFDropdown(); // your fetch function
//     }
//   }, [values.EF]);

//   return null; // this is just for side-effects
// };
import * as Yup from "yup";

const validationSchema = Yup.object({
  LCISource: Yup.string().required("กรุณาระบุที่มาของค่า LCI"),
  EF: Yup.string().required("กรุณาเลือกที่มาของค่า EF"),
  TGOEFCategory: Yup.string().nullable(),
  TGOEFSubcategory: Yup.string().nullable(),
  EFSourceRef: Yup.string().nullable(),
  ratio: Yup.number().required("กรุณาระบุสัดส่วนการปันส่วน"),
  description: Yup.string().required("กรุณาระบุคำอธิบายเพิ่มเติม"),
});

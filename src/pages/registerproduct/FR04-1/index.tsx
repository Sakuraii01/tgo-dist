import { useState, useEffect } from "react";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Save, Edit } from "@mui/icons-material";
import { Accordion } from "../common/component/accordion";
import { ProcessStepper } from "../common/component/stepper";
import { FR04Layout } from "../common/layout";

import useViewModel from "./viewModel";
import type {
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
                    <FR04_1Form
                      data={product}
                      id={id}
                      lifePhase={data.life_cycle_phase}
                    />
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
  lifePhase: number;
}) => {
  const { fr04Report, initialValues, tgoEfDropdown, fetchTGOEFDropdown } =
    useViewModel(props.id);
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
            fetchTGOEFDropdown();
            console.log("Fetching TGO EF Dropdown");
            console.log(tgoEfDropdown);
          }
        }, [values]);
        return (
          <Form onSubmit={handleSubmit} onChange={(_) => console.log(values)}>
            <div className="flex flex-col gap-4 font-medium">
              <div>
                <p>LCI</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-gray-300">หน่วย</p>
                    <p>
                      {"input_unit" in props.data
                        ? props.data.input_unit
                        : "output_unit" in props.data
                        ? props.data.output_unit
                        : "waste_unit" in props.data
                        ? props.data.waste_unit
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">ปริมาณ</p>
                    <p>
                      {"input_unit" in props.data
                        ? props.data.input_quantity
                        : "output_unit" in props.data
                        ? props.data.output_quantity
                        : "waste_unit" in props.data
                        ? props.data.waste_qty
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">ปริมาณ/FU</p>
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
                        <p className="text-sm text-gray-300">ที่มาของค่า LCI</p>
                        <p>
                          {fr04Report?.form41
                            ?.find(
                              (data) =>
                                data?.life_cycle_phase === props.lifePhase &&
                                data.process.some(
                                  (item) =>
                                    item.process_name ===
                                    ("input_name" in props.data
                                      ? props.data.input_name
                                      : "output_name" in props.data
                                      ? props.data.output_name
                                      : "waste_name" in props.data
                                      ? props.data.waste_name
                                      : "")
                                )
                            )
                            ?.process.map((data) =>
                              data.product.map((item) =>
                                item.items.map(
                                  (subItem) => subItem.lci_source_period
                                )
                              )
                            ) ?? "-"}
                        </p>
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

                    <div className="w-80">
                      {tgoEfDropdown && values.EFSource === "tgo_ef" ? (
                        <AutoCompleteField
                          name="EFSourceRef"
                          label="แหล่งอ้างอิง EF"
                          placeholder="แหล่งอ้างอิง EF"
                          items={tgoEfDropdown.map((item) => ({
                            label: item.item_detail,
                            value: item.ef_id,
                          }))}
                        />
                      ) : (
                        <Field
                          name="EFSourceRef"
                          label="แหล่งอ้างอิง EF"
                          placeholder="แหล่งอ้างอิง EF"
                        />
                      )}
                    </div>
                    <div>
                      {values.EFSource === "tgo_ef" ? (
                        <div>
                          <p className="text-sm text-gray-300">ค่า EF</p>
                          <p>
                            {tgoEfDropdown?.find(
                              (data) =>
                                data.ef_id === Number(values.EFSourceRef)
                            )?.ef ?? "-"}
                          </p>
                        </div>
                      ) : (
                        <Field name="EF" label="ค่า EF" placeholder="ค่า EF" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-8">
                    <div>
                      <label className="text-sm text-gray-300">
                        ที่มาของค่า EF
                      </label>
                      <p className="w-fit">-</p>
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
                      <p className="w-fit">-</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">ค่า EF</label>
                      <p>-</p>
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
                      <p className="text-sm text-gray-300">การปันส่วน %</p>
                      <p className="w-fit">-</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        หมายเหตุ / คำอธิบายเพิ่มเติม
                      </p>
                      <p>-</p>
                    </div>
                  </div>
                )}
                {/* <div className="flex gap-8 mt-5">
                  <div>
                    <label className="text-sm text-gray-300">ผลคูณ</label>
                    <p>0.0027</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">สัดส่วน</label>
                    <p>0.07 %</p>
                  </div>
                </div> */}
              </div>

              <div className="ml-auto">
                {isEdit ? (
                  <div className="mt-4.5">
                    <button
                      onClick={() => setIsEdit(false)}
                      className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit  px-4 py-1 ml-auto"
                    >
                      <Save />
                      <p>บันทึก</p>
                    </button>{" "}
                    <label className="text-red-500 text-end">
                      กรุณากดบันทึกก่อนดำเนินการต่อ
                    </label>
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

import { Formik, FieldArray, Form } from "formik";
import { Field, AutoCompleteField } from "../../../component/input/field";
import { Navbar, BreadcrumbNav } from "../../../component/layout";
import { TGOVehiclesService } from "../../../service/api/dropdown";
import type { TGOVehiclesWithEFType } from "../../../service/api/dropdown/type";
type IOItem = {
  inputName: string;
  unit: string;
  amount: string;
  FU: string;
  FUsource: string;
  LCIsource: string;
  EFsource: string;
  EF: string;

  distance: string;
  transport_EF: string;
  transport_source: string;
  vehicle: string;
  out_load: string;
  return_load: string;
  out_load_percent: string;
  return_load_percent: string;
};

type FormValues = {
  selfCollectName: string;
  input: IOItem[];
  output: IOItem[];
};

const CreateSelfCollect = () => {
  const initialValues: FormValues = {
    selfCollectName: "",
    input: [
      {
        inputName: "",
        unit: "",
        amount: "",
        FU: "",
        FUsource: "",
        LCIsource: "",
        EFsource: "",
        EF: "",
        distance: "",
        transport_EF: "",
        transport_source: "",
        vehicle: "",
        out_load: "",
        return_load: "",
        out_load_percent: "",
        return_load_percent: "",
      },
    ],
    output: [
      {
        inputName: "",
        unit: "",
        amount: "",
        FU: "",
        FUsource: "",
        LCIsource: "",
        EFsource: "",
        EF: "",
        distance: "",
        transport_EF: "",
        transport_source: "",
        vehicle: "",
        out_load: "",
        return_load: "",
        out_load_percent: "",
        return_load_percent: "",
      },
    ],
  };
  const vehicles = new TGOVehiclesService();
  const [vehiclesDropdown, setVehiclesDropdown] = useState<
    TGOVehiclesWithEFType[]
  >([]);
  const fetchVehiclesDropdown = async () => {
    const data = await vehicles.reqGetTGOVehiclesWithEF();
    setVehiclesDropdown(data);
  };
  useEffect(() => {
    fetchVehiclesDropdown();
  }, []);

  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="create self collect" />
      <div className="max-w-4xl mx-auto mt-10 mb-20">
        <h1 className="text-2xl font-bold">Self Collect</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted", values);
          }}
        >
          {({ values }) => (
            <Form>
              <div className="mt-10 mb-2">
                <Field
                  name="selfCollectName"
                  label="ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง"
                  placeholder="ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง"
                />
              </div>

              {(["input", "output"] as const).map((section) => (
                <FieldArray name={section} key={section}>
                  {({ remove, push }) => (
                    <div className="mb-5">
                      <h3 className="font-semibold mt-6">
                        {section === "input" ? "Input" : "Output"}
                      </h3>
                      {values[section].map((_, index) => (
                        <div key={index} className="border p-4 my-2">
                          <div className="mb-4">
                            <Field
                              name={`${section}[${index}].inputName`}
                              placeholder="ชื่อรายการ"
                              label="ชื่อรายการ"
                            />
                          </div>
                          <p>LCI</p>
                          <div className="flex gap-4 mb-4">
                            <Field
                              name={`${section}[${index}].amount`}
                              placeholder={"ปริมาณ"}
                              label={"ปริมาณ"}
                              type="number"
                            />
                            <Field
                              name={`${section}[${index}].unit`}
                              placeholder={"หน่วย"}
                              label={"หน่วย"}
                            />
                            <Field
                              name={`${section}[${index}].FU`}
                              placeholder={"ปริมาณ ton/FU"}
                              label={"ปริมาณ ton/FU"}
                            />
                            <Field
                              name={`${section}[${index}].FUsource`}
                              placeholder={"แหล่งที่มาของ FU"}
                              label={"แหล่งที่มาของ FU"}
                            />
                          </div>
                          <p>EF</p>
                          <div className="flex gap-4 mb-4">
                            <Field
                              name={`${section}[${index}].LCIsource`}
                              placeholder={"แหล่งที่มาของค่า LCI"}
                              label={"แหล่งที่มาของค่า"}
                            />
                            <Field
                              name={`${section}[${index}].EFsource`}
                              placeholder={"แหล่งอ้างอิงของค่า EF"}
                              label={"แหล่งอ้างอิงของค่า EF"}
                            />
                            <Field
                              name={`${section}[${index}].EF`}
                              placeholder={"ค่า EF"}
                              label={"ค่า EF"}
                              type="number"
                            />
                          </div>
                          <p>การขนส่ง แบบการใช้ระยะทาง</p>
                          <div>
                            <div className="flex gap-3">
                              <div className="w-52">
                                <Field
                                  name={`${section}[${index}].distance`}
                                  placeholder={"ระยะทาง (km)"}
                                  label={"ระยะทาง (km)"}
                                  type="number"
                                />
                              </div>
                              <AutoCompleteField
                                name={`${section}[${index}].vehicle`}
                                placeholder="ประเภทพาหนะ"
                                label="ประเภทพาหนะ"
                                items={vehiclesDropdown.map((data) => {
                                  return {
                                    value: data.ef_id,
                                    label: data.item,
                                  };
                                })}
                              />
                            </div>
                            <div className="flex gap-3">
                              <div>
                                <p>ภาระบรรทุกขาไป (tkm)</p>
                                <p>
                                  {Math.round(
                                    Number(values[section][index].distance) *
                                      Number(values[section][index].FU) *
                                      10000
                                  ) / 10000}
                                </p>
                              </div>
                              <div>
                                <p>ภาระบรรทุกขากลับ (tkm)</p>
                                <p>
                                  {(() => {
                                    const itemDetail =
                                      vehiclesDropdown.find(
                                        (data) =>
                                          String(data.ef_id) ===
                                          String(values[section][index].vehicle)
                                      )?.item_detail ?? "";
                                    const weight =
                                      extractWeightFromDetail(itemDetail) ?? 0;
                                    const tkm =
                                      Math.round(
                                        Number(
                                          values[section][index].distance
                                        ) *
                                          Number(values[section][index].FU) *
                                          10000
                                      ) / 10000;
                                    return weight !== null ? weight * tkm : "-";
                                  })()}
                                </p>
                              </div>
                              <div className="w-96">
                                <Field
                                  name={`${section}[${index}].transport_source`}
                                  placeholder={"แหล่งที่มาของข้อมูลข่นส่ง"}
                                  label={"แหล่งที่มาของข้อมูลข่นส่ง"}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="secondary-button px-4 py-1"
                            onClick={() => remove(index)}
                          >
                            ลบ
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="primary-button px-4 py-1 mt-2"
                        onClick={() =>
                          push({
                            inputName: "",
                            unit: "",
                            amount: "",
                            FU: "",
                            FUsource: "",
                            source: "",
                            EFsource: "",
                            EF: "",
                            distance: "",
                            transport_EF: "",
                            transport_source: "",
                            vehicle: "",
                            out_load: "",
                            return_load: "",
                            out_load_percent: "",
                            return_load_percent: "",
                          })
                        }
                      >
                        เพิ่ม {section}
                      </button>
                    </div>
                  )}
                </FieldArray>
              ))}
              <button type="submit" className="primary-button px-10 py-1">
                ยืนยัน
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateSelfCollect;
import * as Yup from "yup";
import { useEffect, useState } from "react";

const ioItemSchema = Yup.object().shape({
  inputName: Yup.string().required("กรุณาระบุชื่อรายการ"),
  unit: Yup.string().required("กรุณาระบุหน่วย"),
  amount: Yup.string().required("กรุณาระบุปริมาณ"),
  FU: Yup.string().required("กรุณาระบุปริมาณ/FU"),
  FUsource: Yup.string().required("กรุณาระบุแหล่งที่มาของค่า LCI"),
  source: Yup.string().required("กรุณาระบุที่มา"),
  EFsource: Yup.string().required("กรุณาระบุแหล่งอ้างอิง EF"),
  EF: Yup.string().required("กรุณาระบุค่า EF"),
});

const validationSchema = Yup.object().shape({
  selfCollectName: Yup.string().required("กรุณาระบุชื่อหน่วย"),
  input: Yup.array().of(ioItemSchema),
  output: Yup.array().of(ioItemSchema),
});
function extractWeightFromDetail(item_detail: string) {
  const match = item_detail.match(/น้ำหนักบรรทุกสูงสุด\s+(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

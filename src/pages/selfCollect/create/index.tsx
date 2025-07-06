import { Formik, FieldArray, Form } from "formik";
import { Field, AutoCompleteField } from "../../../component/input/field";
import { Navbar, BreadcrumbNav } from "../../../component/layout";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
// import * as Yup from "yup";

const CreateSelfCollect = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const {
    handleOnSubmit,
    initialValues,
    tgoVehicles,
    vehiclesDropdown,
    tgoEfDropdown,
    unitsDropdown,
  } = useViewModel(id);

  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="create self collect" />
      <div className="max-w-4xl mx-auto mt-10 mb-20 ">
        <h1 className="text-2xl font-bold">Self Collect</h1>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);

            handleOnSubmit({
              company_id: 1005,
              product_id: 7,
              self_collect_name: values.selfCollectName,
              self_collect_ef: "0",
              ratio: 1,
              input: values.input.map((input) => ({
                item_name: input.item_name,
                item_type: input.item_type,
                item_unit: input.item_unit,
                item_qty: input.item_qty,
                item_fu_qty: input.item_fu_qty,
                item_source: input.item_source,
                item_ef: input.item_ef,
                item_ef_source: input.item_ef_source,
                item_ef_source_ref: input.item_ef_source_ref,
                type2_distance: input.type2_distance,
                type2_outbound_load: Number(input.type2_outbound_load),
                type2_return_load: Number(input.type2_return_load),
                type2_vehicle: input.type2_vehicle,
                type2_outbound_load_percent: input.type2_outbound_load_percent,
                type2_return_load_percent: input.type2_return_load_percent,
                type2_outbound_ef: input.type2_outbound_ef,
                type2_return_ef: input.type2_return_ef,
                type2_ef_source: input.type2_ef_source,
                type2_ef_source_ref: input.type2_ef_source_ref,
                transport_emission: input.transport_emission,
                total_emission: input.total_emission,
                proportion: input.proportion,
                ratio: input.ratio,
                cut_off: input.cut_off,
                type1_gas: input.type1_gas,
                type1_gas_unit: input.type1_gas_unit,
                type1_gas_qty: input.type1_gas_qty,
                type1_ef: Number(input.type1_ef),
                type1_ef_source: input.type1_ef_source,
                item_emission: input.item_emission,
                transport_type: input.transport_type,
                add_on_detail: input.add_on_detail,
              })),
              output: values.input.map((input) => ({
                item_name: input.item_name,
                item_type: input.item_type,
                item_unit: input.item_unit,
                item_qty: input.item_qty,
                item_fu_qty: input.item_fu_qty,
                item_source: input.item_source,
                item_ef: input.item_ef,
                item_ef_source: input.item_ef_source,
                item_ef_source_ref: input.item_ef_source_ref,
                type2_distance: input.type2_distance,
                type2_outbound_load: Number(input.type2_outbound_load),
                type2_return_load: Number(input.type2_return_load),
                type2_vehicle: input.type2_vehicle,
                type2_outbound_load_percent: input.type2_outbound_load_percent,
                type2_return_load_percent: input.type2_return_load_percent,
                type2_outbound_ef: input.type2_outbound_ef,
                type2_return_ef: input.type2_return_ef,
                type2_ef_source: input.type2_ef_source,
                type2_ef_source_ref: input.type2_ef_source_ref,
                transport_emission: input.transport_emission,
                total_emission: input.total_emission,
                proportion: input.proportion,
                ratio: input.ratio,
                cut_off: input.cut_off,
                type1_gas: input.type1_gas,
                type1_gas_unit: input.type1_gas_unit,
                type1_gas_qty: input.type1_gas_qty,
                type1_ef: Number(input.type1_ef),
                type1_ef_source: input.type1_ef_source,
                item_emission: input.item_emission,
                transport_type: input.transport_type,
                add_on_detail: input.add_on_detail,
              })),
            });
          }}
        >
          {({ values }) => (
            <Form>
              <div className="mt-10 mb-2">
                <Field
                  name="self_collect_name"
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
                              name={`${section}[${index}].item_name`}
                              placeholder="ชื่อรายการ"
                              label="ชื่อรายการ"
                            />
                          </div>
                          <p>การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ</p>
                          <p>LCI</p>
                          <div className="flex gap-4 mb-4">
                            <Field
                              name={`${section}[${index}].item_qty`}
                              placeholder={"ปริมาณ"}
                              label={"ปริมาณ"}
                              type="number"
                            />
                            <AutoCompleteField
                              items={unitsDropdown.map((units) => ({
                                label: units,
                                value: units,
                              }))}
                              name={`${section}[${index}].item_unit`}
                              placeholder={"หน่วย"}
                              label={"หน่วย"}
                            />
                            <Field
                              name={`${section}[${index}].item_fu_qty`}
                              placeholder={"ปริมาณ ton/FU"}
                              label={"ปริมาณ ton/FU"}
                            />
                            <Field
                              name={`${section}[${index}].item_source`}
                              placeholder={"แหล่งที่มาของ LCI"}
                              label={"แหล่งที่มาของ LCI"}
                            />
                          </div>
                          <p>EF</p>
                          <div className="flex gap-4 mb-4">
                            <AutoCompleteField
                              items={EF}
                              name={`${section}[${index}].item_ef_source`}
                              label="ที่มาของค่า EF"
                            />

                            {tgoEfDropdown &&
                            values[section][index].item_ef_source ===
                              "TGO EF" ? (
                              <AutoCompleteField
                                name={`${section}[${index}].item_ef_source_ref`}
                                label="แหล่งอ้างอิง EF"
                                placeholder="แหล่งอ้างอิง EF"
                                items={tgoEfDropdown.map((item) => ({
                                  label: item.item_detail,
                                  value: item.ef_id,
                                }))}
                              />
                            ) : (
                              <Field
                                name={`${section}[${index}].item_ef_source_ref`}
                                label="แหล่งอ้างอิง EF"
                                placeholder="แหล่งอ้างอิง EF"
                              />
                            )}

                            <Field
                              name={`${section}[${index}].item_ef`}
                              placeholder={"ค่า EF"}
                              label={"ค่า EF"}
                              type="number"
                            />
                          </div>
                          <p>การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง</p>
                          <p>การขนส่ง แบบการใช้ระยะทาง</p>
                          <div>
                            <div className="flex gap-3">
                              <div className="w-52">
                                <Field
                                  name={`${section}[${index}].type2_distance`}
                                  placeholder={"ระยะทาง (km)"}
                                  label={"ระยะทาง (km)"}
                                  type="number"
                                />
                              </div>
                              <AutoCompleteField
                                name={`${section}[${index}].type2_vehicle`}
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
                                    Number(
                                      values[section][index].type2_distance
                                    ) *
                                      Number(
                                        values[section][index].item_fu_qty
                                      ) *
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
                                          String(
                                            values[section][index].type2_vehicle
                                          )
                                      )?.item_detail ?? "";
                                    const weight =
                                      extractWeightFromDetail(itemDetail) ?? 0;
                                    const tkm =
                                      Math.round(
                                        Number(
                                          values[section][index].type2_distance
                                        ) *
                                          Number(
                                            values[section][index].item_fu_qty
                                          ) *
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
                            <div className="flex gap-4">
                              <div className="w-40">
                                <AutoCompleteField
                                  items={VehicalsEF}
                                  name={`${section}[${index}].type2_ef_source`}
                                  label="ที่มาของค่า EF"
                                />
                              </div>
                              <div className="w-80">
                                {tgoVehicles &&
                                values[section][index].type2_ef_source ===
                                  "TGO EF" ? (
                                  <AutoCompleteField
                                    name={`${section}[${index}].type2_ef_source_ref`}
                                    label="แหล่งอ้างอิง EF"
                                    placeholder="แหล่งอ้างอิง EF"
                                    items={tgoVehicles.map((item) => ({
                                      label: item.item_detail,
                                      value: item.ef_id,
                                    }))}
                                  />
                                ) : (
                                  <Field
                                    name={`${section}[${index}].type2_ef_source_ref`}
                                    label="แหล่งอ้างอิง EF"
                                    placeholder="แหล่งอ้างอิง EF"
                                  />
                                )}
                              </div>
                              <div className="w-40">
                                {values[section][index].type2_ef_source ===
                                "TGO EF" ? (
                                  <div>
                                    <p className="text-sm text-gray-300">
                                      ค่า EF เที่ยวไป
                                    </p>
                                    <p>
                                      {Number(
                                        tgoEfDropdown?.find(
                                          (data) =>
                                            data.ef_id ===
                                            Number(
                                              values[section][index]
                                                .item_ef_source_ref
                                            )
                                        )?.ef ?? 0
                                      ) *
                                        Number(
                                          values[section][index]
                                            .type2_outbound_load_percent ?? 0
                                        )}
                                    </p>
                                  </div>
                                ) : (
                                  <Field
                                    label="ค่า EF เที่ยวไป"
                                    placeholder="ค่า EF เที่ยวไป"
                                    name={`${section}[${index}].type2_outbound_ef`}
                                    type="number"
                                  />
                                )}
                              </div>
                              <div className="w-40">
                                {values[section][index].type2_ef_source ===
                                "TGO EF" ? (
                                  <div>
                                    <p className="text-sm text-gray-300">
                                      ค่า EF เที่ยวกลับ
                                    </p>
                                    <p>
                                      {(Number(
                                        tgoEfDropdown?.find(
                                          (data) =>
                                            data.ef_id ===
                                            Number(
                                              values[section][index]
                                                .item_ef_source_ref
                                            )
                                        )?.ef ?? 0
                                      ) *
                                        Number(
                                          values[section][index]
                                            .type2_return_load_percent ?? 0
                                        )) /
                                        100}
                                    </p>
                                  </div>
                                ) : (
                                  <Field
                                    label="ค่า EF เที่ยวกลับ"
                                    placeholder="ค่า EF เที่ยวกลับ"
                                    name={`${section}[${index}].type2_return_ef`}
                                    type="number"
                                  />
                                )}
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

// const ioItemSchema = Yup.object().shape({
//   inputName: Yup.string().required("กรุณาระบุชื่อรายการ"),
//   unit: Yup.string().required("กรุณาระบุหน่วย"),
//   amount: Yup.string().required("กรุณาระบุปริมาณ"),
//   FU: Yup.string().required("กรุณาระบุปริมาณ/FU"),
//   FUsource: Yup.string().required("กรุณาระบุแหล่งที่มาของค่า LCI"),
//   source: Yup.string().required("กรุณาระบุที่มา"),
//   EFsource: Yup.string().required("กรุณาระบุแหล่งอ้างอิง EF"),
//   EF: Yup.string().required("กรุณาระบุค่า EF"),
// });

// const validationSchema = Yup.object().shape({
//   selfCollectName: Yup.string().required("กรุณาระบุชื่อหน่วย"),
//   input: Yup.array().of(ioItemSchema),
//   output: Yup.array().of(ioItemSchema),
// });
function extractWeightFromDetail(item_detail: string) {
  const match = item_detail.match(/น้ำหนักบรรทุกสูงสุด\s+(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}
const VehicalsEF = [
  { label: "TGO EF", value: "TGO EF" },
  { label: "Int. DB", value: "Int. DB" },
];
const EF = [
  { label: "Self collect", value: "Self collect" },
  { label: "Supplier", value: "Supplier" },
  { label: "PCR Gen.", value: "PCR Gen" },
  { label: "TGO EF", value: "TGO EF" },
  { label: "Int. DB", value: "Int. DB" },
  { label: "Others", value: "Other" },
];

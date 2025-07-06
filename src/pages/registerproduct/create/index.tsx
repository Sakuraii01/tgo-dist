import { Form, Formik, FieldArray } from "formik";
import {
  Field,
  AutoCompleteField,
  DatePickerField,
} from "../../../component/input/field";
import { Dropzone } from "../../../component/input/dropzone";
import useViewModel from "./viewModel";

import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";

const CreateProduct = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const {
    initialValues,
    FR03FomrValidationSchema,
    unitList,
    pcrList,
    registerRoundList,
    handleSubmit,
  } = useViewModel(id);

  return (
    <div>
      <ProcessStepper isActive={0} id={id} />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={FR03FomrValidationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-1/2 mx-auto py-4 px-7 bg-white rounded-lg shadow-lg">
              <h6 className="font-bold text-center my-3">
                กรอกข้อมูลผลิตภัณฑ์
              </h6>
              <section className="mb-2">
                <div>
                  <AutoCompleteField
                    name={`registrationRound`}
                    label="เลือกรอบการขึ้นทะเบียน"
                    items={registerRoundList.map((item) => ({
                      label: `${item.quarter}(${item.start} - ${item.end})`,
                      value: item.quarter,
                    }))}
                  />
                  <div className="my-2">
                    <h3 className="font-bold">ช่วงเวลาการเก็บข้อมูล</h3>
                    <div className="flex gap-2">
                      <DatePickerField
                        name="startCollectData"
                        label="วันที่เริ่มเก็บข้อมูล"
                        placeholder="วันที่เริ่มเก็บข้อมูล"
                        items={[]}
                      />
                      <DatePickerField
                        name="stopCollectData"
                        label="วันที่สุดท้ายที่เก็บข้อมูล"
                        placeholder="วันที่สุดท้ายที่เก็บข้อมูล"
                        items={[]}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="my-2">
                <h3 className="font-bold">ชื่อผลิตภัณฑ์</h3>
                <Field
                  name="productNameTH"
                  placeholder="ชื่อผลิตภัณฑ์ และรุ่น (TH)"
                  label="ชื่อผลิตภัณฑ์ และรุ่น (TH)"
                  require
                />
                <Field
                  name="productNameEN"
                  placeholder="ชื่อผลิตภัณฑ์ และรุ่น (EN)"
                  label="ชื่อผลิตภัณฑ์ และรุ่น (EN)"
                  require
                />
              </section>

              <section className="my-2">
                <h3 className="font-bold">ข้อมูลด้านเทคนิค</h3>
                <div className="flex gap-2">
                  <FieldArray name={"technicalInfo"} key={"technicalInfo"}>
                    {({ remove, push }) => (
                      <div className="w-full">
                        {Array.isArray(values["technicalInfo"]) &&
                          values["technicalInfo"].map((_, index) => (
                            <div className="flex gap-2 mb-2" key={index}>
                              <div className="w-full">
                                <Field
                                  name={`technicalInfo[${index}]`}
                                  placeholder="ข้อมูลด้านเทคนิค"
                                  label="ข้อมูลด้านเทคนิค"
                                />
                              </div>
                              {
                                <div className="my-auto ml-auto">
                                  <button
                                    type="button"
                                    className="secondary-button px-4 w-full h-fit py-2"
                                    onClick={() => remove(index)}
                                  >
                                    ลบ
                                  </button>
                                </div>
                              }
                            </div>
                          ))}
                        <div className="w-fit ml-auto">
                          {values.technicalInfo.length < 5 && (
                            <button
                              type="button"
                              className="primary-button px-4 py-1"
                              onClick={() => push("")}
                            >
                              เพิ่มข้อมูลด้านเทคนิค
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </section>

              <section className="my-2">
                <h3 className="font-bold">หน่วย</h3>
                <div className="flex gap-2 w-1/2">
                  <Field
                    name="functionalValue"
                    placeholder="ค่าหน่วยการทำงาน"
                    label="ค่าหน่วยการทำงาน"
                    require
                    type="number"
                  />
                  <div className="w-64">
                    <AutoCompleteField
                      name={`functionalUnit`}
                      label="หน่วยการทำงาน"
                      items={unitList.map((item) => ({
                        label: item.product_unit_name_en,
                        value: Number(item.product_unit_id),
                      }))}
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-1/2">
                  <Field
                    name="functionalProductValue"
                    placeholder="ค่าหน่วยผลิตภัณฑ์"
                    label="ค่าหน่วยผลิตภัณฑ์"
                    type="number"
                    require
                  />
                  <div className="w-64">
                    <AutoCompleteField
                      name={`functionalProduct`}
                      label="หน่วยผลิตภัณฑ์"
                      items={unitList.map((item) => ({
                        label: item.product_unit_name_en,
                        value: Number(item.product_unit_id),
                      }))}
                    />
                  </div>
                </div>
              </section>

              <div className="mt-3 flex gap-2">
                <div className="w-80">
                  <Field
                    name="sale_ratio"
                    placeholder="สัดส่วนยอดขายผลิตภัณฑ์ในปีล่าสุด"
                    label="สัดส่วนยอดขายผลิตภัณฑ์ในปีล่าสุด"
                    type="number"
                    require
                  />
                </div>
                <AutoCompleteField
                  name={`pcrReference`}
                  label="อ้างอิง PCR"
                  items={pcrList?.map((item) => ({
                    label: item.pcr_name,
                    value: item.id,
                  }))}
                />
              </div>
              <Dropzone
                file={values.product_image}
                handleUpload={(file) => setFieldValue("product_image", file)}
              />
              <div className="flex gap-4 text-center text-gray-300">
                {["B2B", "B2C"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setFieldValue("scope", type)}
                    className={`border ${
                      values.scope === type
                        ? type === "B2B"
                          ? "border-primary bg-primary/10"
                          : "border-secondary-500 bg-secondary-200"
                        : "border-gray-400"
                    } rounded-lg py-16 my-4 w-full cursor-pointer transition-all duration-200 ease-in-out`}
                  >
                    <p
                      className={`text-center ${
                        values.scope === type
                          ? type === "B2B"
                            ? "font-bold text-primary"
                            : "font-bold text-secondary-500"
                          : ""
                      }`}
                    >
                      {type}
                    </p>
                    <p className="text-xs">
                      {type === "B2B" ? "2-Cycle required" : "5-Cycle required"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/4 mx-auto">
              <button
                onClick={() => console.log(values)}
                type="submit"
                className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold"
              >
                ถัดไป
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;

import { Formik, FieldArray, Form } from "formik";
import { Field } from "../../../component/input/field";
import { Navbar, BreadcrumbNav } from "../../../component/layout";
type IOItem = {
  inputName: string;
  unit: string;
  amount: string;
  FU: string;
  FUsource: string;
  source: string;
  EFsource: string;
  EF: string;
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
        source: "",
        EFsource: "",
        EF: "",
      },
    ],
    output: [
      {
        inputName: "",
        unit: "",
        amount: "",
        FU: "",
        FUsource: "",
        source: "",
        EFsource: "",
        EF: "",
      },
    ],
  };

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
                              placeholder={"FU"}
                              label={"FU"}
                            />
                            <Field
                              name={`${section}[${index}].FUsource`}
                              placeholder={"แหล่งที่มาของ FU"}
                              label={"แหล่งที่มาของ FU"}
                            />
                          </div>
                          <div className="flex gap-4 mb-4">
                            <Field
                              name={`${section}[${index}].source`}
                              placeholder={"แหล่งที่มาของค่า"}
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

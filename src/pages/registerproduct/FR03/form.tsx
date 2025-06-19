import {
  Field,
  AutoCompleteField,
  RadioField,
} from "../../../component/input/field";
import { Form, Formik, FieldArray } from "formik";

import FR03FormSchema from "./validation";
// type FormType = {
//   itemName: string;
//   materialType: number;
//   unit: number;
//   amount: number;
//   type: number;
// };
export const FR03Form = () => {
  return (
    <div>
      <FR03SelectedForm />
    </div>
  );
};

export const FR03SelectedForm = () => {
  const { FR03FomrValidationSchema } = FR03FormSchema();
  const initialValues = {
    type: "input",
    itemName: "",
    materialType: "",
    unit: "",
    amount: 0,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FR03FomrValidationSchema}
      onSubmit={(data) => console.log(data)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FieldArray name={"technicalInfo"} key={"technicalInfo"}>
            {({ remove }) => (
              <div>
                <RadioField
                  name={"type"}
                  label=""
                  options={[
                    { label: "สารขาเข้า", value: "input", color: "#87AD0A" },
                    {
                      label: "ผลิตภัณฑ์ระหว่างทาง",
                      value: "intermediate",
                      color: "#FAB431",
                    },
                    {
                      label: "ของเสีย/สารขาออก",
                      value: "output",
                      color: "#EE5F5F",
                    },
                  ]}
                  row
                />
                <div className="mt-4 mb-6">
                  <InputFr03 />
                </div>
                <button onClick={() => remove(0)}></button>
                <button
                  type="submit"
                  className={`text-white bg-primary-2 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 
                    transition-colors hover:bg-primary-2/80`}
                >
                  + ยืนยันการเพิ่มรายการ
                </button>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};
export const InputFr03 = () => {
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <Field
          name={`itemName`}
          label="ชื่อกระบวนการ"
          placeholder="ชื่อกระบวนการ"
        />
      </div>
      <AutoCompleteField
        name={`materialType`}
        label="ประเภท"
        items={MaterialList.map((item) => ({
          label: item.label,
          value: Number(item.value),
        }))}
      />
      <AutoCompleteField
        name={`unit`}
        label="หน่วย"
        items={unitList.map((item) => ({
          label: item.label,
          value: Number(item.value),
        }))}
      />
      <Field
        name={`amount`}
        label="ปริมาณ"
        placeholder="ปริมาณ"
        type="number"
      />
    </div>
  );
};

const unitList = [
  {
    value: 0,
    label: "Kg",
  },
  {
    value: 1,
    label: "T",
  },
  {
    value: 2,
    label: "L",
  },
];

const MaterialList = [
  {
    value: 0,
    label: "Material (M)",
  },
  {
    value: 1,
    label: "Energy (E)",
  },
  {
    value: 2,
    label: "Chemical (C)",
  },
  {
    value: 3,
    label: "Other (O)",
  },
];

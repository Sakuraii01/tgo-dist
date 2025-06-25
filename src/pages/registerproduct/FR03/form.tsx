import {
  Field,
  AutoCompleteField,
  RadioField,
  CheckboxField,
} from "../../../component/input/field";
import { Form, Formik } from "formik";
import { Popup } from "../../../component/layout";
import { useEffect, useState } from "react";
import FR03FormSchema from "./validation";
import {
  InputProcessService,
  WasteProcessService,
} from "../../../service/api/fr03";
import { UnitsDropdownService } from "../../../service/api/dropdown";

type FR03FormType = {
  showForm: boolean;
  initialValues: any;
  handleOnClose: () => void;
  handleOnSubmit: (
    data: any,
    type: "input" | "intermediate" | "waste",
    process_id?: number
  ) => void;
  isUpdate?: boolean;
};
export const FR03Form = (props: FR03FormType) => {
  const { FR03FomrValidationSchema } = FR03FormSchema();
  console.log(props.initialValues);

  const initialValues = {
    type: "input",
    itemName: "",
    materialType: "",
    unit: "",
    amount: 0,
    chemical_reaction: null,
    isLastProduct: false,
    sumPackage: false,
  };
  const { inputCategoryDropdown, wasteCategoryDropdown, unitList } =
    FR03Function();
  return (
    <div>
      {props.showForm && (
        <Popup>
          <Formik
            initialValues={props.initialValues || initialValues}
            enableReinitialize
            validationSchema={FR03FomrValidationSchema}
            onSubmit={(data) => props.handleOnSubmit(data, data.type)}
          >
            {({ handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <h1 className="text-primary font-bold text-2xl my-5">
                  เพิ่มรายการ
                </h1>
                <div>
                  <RadioField
                    name={"type"}
                    label=""
                    options={[
                      {
                        label: "สารขาเข้า",
                        value: "input",
                        color: "#87AD0A",
                      },
                      {
                        label: "ผลิตภัณฑ์ระหว่างทาง",
                        value: "intermediate",
                        color: "#FAB431",
                      },
                      {
                        label: "ของเสีย/สารขาออก",
                        value: "waste",
                        color: "#EE5F5F",
                      },
                    ]}
                    row
                  />
                  <div className="mt-4 mb-6">
                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <Field
                          name={`itemName`}
                          label="ชื่อรายการ"
                          placeholder="ชื่อรายการ"
                        />
                      </div>
                      {values.type !== "intermediate" && (
                        <div className="w-48">
                          <AutoCompleteField
                            name={`materialType`}
                            label="ประเภท"
                            items={
                              values.type === "input"
                                ? inputCategoryDropdown
                                : wasteCategoryDropdown
                            }
                          />
                        </div>
                      )}
                      <div className="w-40">
                        <AutoCompleteField
                          name={`unit`}
                          label="หน่วย"
                          items={unitList.map((item) => ({
                            label: item.label,
                            value: Number(item.value),
                          }))}
                        />
                      </div>
                      <div className="w-40">
                        <Field
                          name={`amount`}
                          label="ปริมาณ"
                          placeholder="ปริมาณ"
                          type="number"
                        />
                      </div>
                    </div>
                    {values.type === "intermediate" && (
                      <div>
                        <div className="mt-3">
                          <CheckboxField
                            name="isLastProduct"
                            label="เป็นผลิตภัณฑ์สุดท้ายหรือไม่"
                          />
                        </div>
                        <div>
                          <CheckboxField
                            name="sumPackage"
                            label="ผลิตภภัณฑ์สุดท้ายรวมบรรจุภัณฑ์หรือไม่"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      props.handleOnClose();
                    }}
                    className="border border-gray-200 rounded-full text-gray-200 hover:bg-gray-200/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="border border-primary rounded-full text-primary hover:bg-primary/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                  >
                    {props.isUpdate ? "แก้ไขรายการ" : "+ เพิ่มรายการ"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Popup>
      )}
    </div>
  );
};

export const InputFr03 = ({
  type,
}: {
  type: "input" | "output" | "intermediate";
}) => {
  const { inputCategoryDropdown, wasteCategoryDropdown, unitList } =
    FR03Function();
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <Field name={`itemName`} label="ชื่อรายการ" placeholder="ชื่อรายการ" />
      </div>
      {type !== "intermediate" && (
        <div className="w-48">
          <AutoCompleteField
            name={`materialType`}
            label="ประเภท"
            items={
              type === "input" ? inputCategoryDropdown : wasteCategoryDropdown
            }
          />
        </div>
      )}
      <div className="w-40">
        <AutoCompleteField
          name={`unit`}
          label="หน่วย"
          items={unitList.map((item) => ({
            label: item.label,
            value: Number(item.value),
          }))}
        />
      </div>
      <div className="w-40">
        <Field
          name={`amount`}
          label="ปริมาณ"
          placeholder="ปริมาณ"
          type="number"
        />
      </div>
      {type === "intermediate" && (
        <div>
          <CheckboxField
            name="isLastProduct"
            label="เป็นผลิตภัณฑ์สุดท้ายหรือไม่"
          />
          {/* {values. <CheckboxField name="isLastProduct" label="ผลิตภภัณฑ์สุดท้ายรวมบรรจุภัณฑ์หรือไม่"/>} */}
        </div>
      )}
    </div>
  );
};
const FR03Function = () => {
  const unitService = new UnitsDropdownService();
  const inputProcessService = new InputProcessService();
  const wasteProcessService = new WasteProcessService();
  const [inputCategoryDropdown, setInputCategoryDropdown] = useState<
    { value: number; label: string }[]
  >([]);
  const [wasteCategoryDropdown, setWasteCategoryDropdown] = useState<
    { value: number; label: string }[]
  >([]);
  const [unitList, setUnitList] = useState<{ value: number; label: string }[]>(
    []
  );
  const fetchCategoryDropdown = async () => {
    const input_cat_dropdown = await inputProcessService
      .reqGetInputCatergory()
      .then((data) =>
        data.map((item) => ({
          value: item.input_cat_id,
          label: item.category_names,
        }))
      );
    const waste_cat_dropdown = await wasteProcessService
      .reqGetWasteCategory()
      .then((data) =>
        data.map((item) => ({
          value: item.waste_cat_id,
          label: item.waste_cat_name,
        }))
      );
    const unitList = await unitService.reqGetUnits().then((data) =>
      data.map((item) => ({
        value: item.product_unit_id,
        label: `${item.product_unit_abbr_th} (${item.product_unit_abbr_eng})`,
      }))
    );
    setUnitList(unitList);
    setInputCategoryDropdown(input_cat_dropdown);
    setWasteCategoryDropdown(waste_cat_dropdown);
  };
  useEffect(() => {
    fetchCategoryDropdown();
  }, []);
  return { inputCategoryDropdown, wasteCategoryDropdown, unitList };
};

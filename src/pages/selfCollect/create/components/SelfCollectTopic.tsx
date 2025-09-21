import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Field, AutoCompleteField } from "../../../../component/input/field";
import { getDropdowns } from "../hooks/dropdown";

export type SelfCollectTopicProps = {
  initialValue: {
    selfCollectName: string;
    fu: string | number; // functional value
    unit: number; // unit id
  };
  validation?: any;
  self_collect_id: number;
  onSubmit: (values: {
    selfCollectName: string;
    functionalValue: number;
    functionalUnit: number;
  }) => void;
};

export const SelfCollectTopic = ({
  initialValue,
  onSubmit,
}: SelfCollectTopicProps) => {
  const [dropdowns, setDropdowns] = useState<any>({
    tgoEfDropdown: [],
    tgoVehicles: [],
    vehiclesDropdown: [],
    unitsDropdown: [],
    selfCollectDropdown: [],
  });

  useEffect(() => {
    (async () => {
      const result = await getDropdowns();
      setDropdowns(result);
    })();
  }, []);

  const { unitsDropdown } = dropdowns;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const unitLabel = unitsDropdown.find(
    (u: any) => Number(u.values) === Number(initialValue.unit)
  )?.label;

  return (
    <>
      {!isEdit ? (
        <div className="w-fit">
          <p className="my-auto">
            ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง
          </p>
          <div className="flex w-full gap-2 text-primary">
            <div>
              <p className="font-semibold text-3xl my-auto">
                {initialValue.selfCollectName}
              </p>
              <p className="font-semibold my-auto">
                ค่าหน่วยการทำงาน {initialValue.fu} {unitLabel}
              </p>
            </div>
            <div className="my-auto ml-10">
              <button
                className="px-2 pb-2 pt-1 bg-primary-2/5 rounded-full"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                {/* Edit icon handled by caller's icon set */}
                แก้ไข
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            selfCollectName: initialValue.selfCollectName || "",
            functionalValue: Number(initialValue.fu) || 0,
            functionalUnit: Number(initialValue.unit) || 0,
          }}
          enableReinitialize
          onSubmit={(values) => {
            onSubmit({
              selfCollectName: values.selfCollectName,
              functionalValue: Number(values.functionalValue),
              functionalUnit: Number(values.functionalUnit),
            });
            setIsEdit(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Field
                    name="selfCollectName"
                    label="ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง"
                  />
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <Field
                        name="functionalValue"
                        placeholder="ค่าหน่วยการทำงาน"
                        label="ค่าหน่วยการทำงาน"
                        require
                        type="number"
                      />
                    </div>
                    <div className="w-full">
                      <AutoCompleteField
                        name="functionalUnit"
                        label="หน่วยการทำงาน"
                        items={unitsDropdown.map((u: any) => ({
                          label: u.label,
                          value: Number(u.values),
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2"></div>
                </div>
                <div className="mt-auto mx-auto w-fit flex gap-3 h-fit">
                  <button
                    className="secondary-button px-6 py-2"
                    type="button"
                    onClick={() => setIsEdit(false)}
                  >
                    ยกเลิก
                  </button>
                  <button className="primary-button px-6 py-2" type="submit">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

import useViewModel from "./viewModel";
import { Navbar, BreadcrumbNav } from "../../component/layout";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import { useState } from "react";
import { Popup } from "../../component/layout";
import { Formik, Form } from "formik";
import { Field, AutoCompleteField } from "../../component/input/field";
import { Backdrop, CircularProgress } from "@mui/material";

const SelfCollect = () => {
  const navigate = useNavigate();
  const { selfcollectList, loading, unitList } = useViewModel();
  return (
    <>
      {!loading ? (
        <div>
          <Navbar />
          <BreadcrumbNav step={"Self Collect"} />
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between mt-20">
              <h4 className="text-xl font-bold">ข้อมูลค่า EF ที่กำหนดเอง</h4>
              <CreateSelfCollect />
            </div>
            <table className="w-full my-10 text-left rounded-3xl">
              <thead className="bg-primary text-white font-bold rounded-3xl">
                <tr className="px-3 rounede-3xl">
                  <th className="ps-3 py-2">ขื่อกระบวนการ</th>
                  <th>ค่า FU</th>
                  <th>ค่า EF (kgCO2 eq./หน่วย)</th>
                  <th>ค่า EF (kgCO2 eq./หน่วย)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selfcollectList.map((data) => (
                  <tr key={data.self_collect_id}>
                    <td className="ps-3 py-4">{data.self_collect_name}</td>
                    <td>
                      {data.FU_value}{" "}
                      {unitList?.find(
                        (unit) => unit.product_unit_id === Number(data.FU_en)
                      )?.product_unit_abbr_th || ""}
                    </td>
                    <td>{data.self_collect_ef}</td>
                    <td>
                      <div className="flex gap-3 justify-end mr-10">
                        <button
                          onClick={() =>
                            navigate(
                              PROTECTED_PATH.CREATE_SELF_COLLECT +
                                `?id=${data.self_collect_id}`
                            )
                          }
                        >
                          <Edit fontSize="small" />
                        </button>
                        <Delete fontSize="small" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};
export default SelfCollect;

const CreateSelfCollect = () => {
  const [isAddSelfCollect, setIsAddSelfCollect] = useState<boolean>(false);
  const { handleOnSubmitSelfCollectProcess, unitList } = useViewModel();
  return (
    <>
      <button
        onClick={() => setIsAddSelfCollect(true)}
        className="bg-gradient-to-r from-[#5EDCF5] via-20% via-[#5EDCF5] to-[#008FC3] text-white rounded-full py-2 px-8 shadow-md font-bold"
      >
        + เพิ่มข้อมูลค่า EF ที่กำหนดเอง
      </button>
      {isAddSelfCollect && (
        <Popup>
          <h3 className="font-bold text-xl my-3">
            เพิ่มชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง
          </h3>
          <Formik
            initialValues={{
              selfCollectName: "",
              functionalValue: "",
              functionalUnit: "",
              finish_output: "",
              output_qut: "",
              output_unit: "",
            }}
            onSubmit={(values, actions) => {
              handleOnSubmitSelfCollectProcess({
                company_id: 1005,
                self_collect_name: values.selfCollectName,
                self_collect_ef: "0",
                FU_value: Number(values.functionalValue),
                FU_th: values.functionalUnit,
                FU_en: values.functionalUnit,
                finish_output: values.finish_output,
                output_qut: Number(values.output_qut),
                output_unit: values.output_unit,
                ratio: 1,
              });
              actions.resetForm();
              setIsAddSelfCollect(false);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="selfCollectName"
                    label="ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง"
                  />
                </div>
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
                      name={`functionalUnit`}
                      label="หน่วยการทำงาน"
                      items={unitList.map((item) => ({
                        label: item.product_unit_name_en,
                        value: Number(item.product_unit_id),
                      }))}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <p>ข้อมูลผลิตภัณฑ์สุดท้าย</p>
                  <div className="flex gap-2">
                    <Field
                      name={`finish_output`}
                      label={`ชื่อผลิตภัณฑ์สุดท้าย`}
                      placeholder={`ชื่อผลิตภัณฑ์สุดท้าย`}
                    />
                    <Field
                      name={`output_qut`}
                      label="ปริมาณ"
                      placeholder="ปริมาณ"
                      type="number"
                    />
                    <AutoCompleteField
                      name={`output_unit`}
                      label="หน่วย"
                      items={unitList.map((item) => ({
                        label: item.product_unit_name_en,
                        value: Number(item.product_unit_id),
                      }))}
                    />
                  </div>
                </div>
                <div className="my-3 mx-auto w-fit flex gap-3">
                  <button
                    className="secondary-button px-6 py-2"
                    onClick={() => setIsAddSelfCollect(false)}
                    type="button"
                  >
                    ยกเลิก
                  </button>
                  <button className="primary-button px-6 py-2" type="submit">
                    ยืนยัน
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Popup>
      )}
    </>
  );
};

import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Field } from "../../../component/input/field";
import { FormControlLabel, Checkbox } from "@mui/material";

import useViewModel from "./viewModel";
const FR06_1 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr06Data, handleSubmit, fr06Sum4142 } = useViewModel(id);
  const baseStatic = [
    fr06Sum4142?.sum_lc1_emission || 0,
    fr06Sum4142?.sum_lc2_emission || 0,
    fr06Sum4142?.sum_lc3_emission || 0,
    fr06Sum4142?.sum_lc4_emission || 0,
    fr06Sum4142?.sum_lc5_emission || 0,
  ];
  return (
    <div>
      <ProcessStepper isActive={5} id={id} />
      <div className="w-fit mx-auto">
        <Formik
          initialValues={{
            registrationRound: false,
            ghg_cycle_1: "",
            ghg_cycle_2: "",
            ghg_cycle_3: "",
            ghg_cycle_4: "",
            ghg_cycle_5: "",
          }}
          enableReinitialize
          // validationSchema={{}}
          onSubmit={(values) =>
            handleSubmit({
              report61_sum_id: fr06Data?.report61_sum_id ?? 0,
              product_id: fr06Data?.product_id ?? 0,
              company_id: fr06Data?.company_id ?? 0,
              document_name_by_TGO: null,
              document_no_by_TGO: null,
              lc1_based_emission: values.ghg_cycle_1,
              lc2_based_emission: values.ghg_cycle_2,
              lc3_based_emission: values.ghg_cycle_3,
              lc4_based_emission: values.ghg_cycle_4,
              lc5_based_emission: values.ghg_cycle_5,
              land_used_based_emission: 0,
              lc1_diff_emission: calculateDiff(
                baseStatic[0],
                Number(values.ghg_cycle_1),
                false
              ),
              lc2_diff_emission: calculateDiff(
                baseStatic[1],
                Number(values.ghg_cycle_2),
                false
              ),
              lc3_diff_emission: calculateDiff(
                baseStatic[2],
                Number(values.ghg_cycle_3),
                false
              ),
              lc4_diff_emission: calculateDiff(
                baseStatic[3],
                Number(values.ghg_cycle_4),
                false
              ),
              lc5_diff_emission: calculateDiff(
                baseStatic[4],
                Number(values.ghg_cycle_5),
                false
              ),
              land_used_diff_emission: 0,
              lc1_diff_emission_percent: calculateDiff(
                baseStatic[0],
                Number(values.ghg_cycle_1),
                true
              ),
              lc2_diff_emission_percent: calculateDiff(
                baseStatic[1],
                Number(values.ghg_cycle_2),
                true
              ),
              lc3_diff_emission_percent: calculateDiff(
                baseStatic[2],
                Number(values.ghg_cycle_3),
                true
              ),
              lc4_diff_emission_percent: calculateDiff(
                baseStatic[3],
                Number(values.ghg_cycle_4),
                true
              ),
              lc5_diff_emission_percent: calculateDiff(
                baseStatic[4],
                Number(values.ghg_cycle_5),
                true
              ),
              land_used_diff_emission_percent: 0,
              sum_based_emission:
                Number(values.ghg_cycle_1) +
                Number(values.ghg_cycle_2) +
                Number(values.ghg_cycle_3) +
                Number(values.ghg_cycle_4) +
                Number(values.ghg_cycle_5),
              sum_diff_emission:
                calculateDiff(
                  baseStatic[0],
                  Number(values.ghg_cycle_1),
                  false
                ) +
                calculateDiff(
                  baseStatic[1],
                  Number(values.ghg_cycle_2),
                  false
                ) +
                calculateDiff(
                  baseStatic[2],
                  Number(values.ghg_cycle_3),
                  false
                ) +
                calculateDiff(
                  baseStatic[3],
                  Number(values.ghg_cycle_4),
                  false
                ) +
                calculateDiff(baseStatic[4], Number(values.ghg_cycle_5), false),
              sum_diff_emission_percent:
                calculateDiff(baseStatic[0], Number(values.ghg_cycle_1), true) +
                calculateDiff(baseStatic[1], Number(values.ghg_cycle_2), true) +
                calculateDiff(baseStatic[2], Number(values.ghg_cycle_3), true) +
                calculateDiff(baseStatic[3], Number(values.ghg_cycle_4), true) +
                calculateDiff(baseStatic[4], Number(values.ghg_cycle_5), true),
            })
          }
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className=" py-4 px-7 ">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="registrationRound"
                      checked={values.registrationRound}
                      onChange={(e) =>
                        setFieldValue("registrationRound", e.target.checked)
                      }
                    />
                  }
                  label="ระบุปีฐานเป็นปีแรก"
                />
              </div>
              <table className="table-auto w-full border-collapse border border-gray-200/10">
                <thead>
                  <tr className="bg-primary-2/20">
                    <th className="text-start py-2 ps-4">ช่วงวัฎจักรชีวิต</th>
                    <th className="px-5">
                      การปล่อย GHG ในปีฐาน (kgCO2 eq.) ปี
                    </th>
                    <th className="px-5">
                      การปล่อย GHG ในปีปัจจุบัน (kgCO2 eq.) ปี
                    </th>
                    <th className="px-5">ผลต่าง (เพิ่มขึ้น +)</th>
                    <th className="pe-4">ร้อยละ (เพิ่มขึ้น +)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การได้มาของวัตถุดิบ </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc1_emission
                      ) : (
                        <Field
                          name="ghg_cycle_1"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">{fr06Sum4142?.sum_lc1_emission}</td>
                    <td className="px-5">
                      {calculateDiff(21.0, Number(values.ghg_cycle_1), false)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(21.0, Number(values.ghg_cycle_1), true)}%
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การกระจายสินค้า </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc2_emission
                      ) : (
                        <Field
                          name="ghg_cycle_2"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">{fr06Sum4142?.sum_lc2_emission}</td>
                    <td className="px-5">
                      {calculateDiff(3.8, Number(values.ghg_cycle_2), false)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(3.8, Number(values.ghg_cycle_2), true)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การใช้งาน </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc3_emission
                      ) : (
                        <Field
                          name="ghg_cycle_3"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">{fr06Sum4142?.sum_lc3_emission}</td>
                    <td className="px-5">
                      {calculateDiff(0.4, Number(values.ghg_cycle_3), false)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(0.4, Number(values.ghg_cycle_3), true)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การจัดการซาก </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc4_emission
                      ) : (
                        <Field
                          name="ghg_cycle_4"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">{fr06Sum4142?.sum_lc4_emission}</td>
                    <td className="px-5">
                      {calculateDiff(10.6, Number(values.ghg_cycle_4), false)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(10.6, Number(values.ghg_cycle_4), true)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การผลิต</td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc5_emission
                      ) : (
                        <Field
                          name="ghg_cycle_5"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">{fr06Sum4142?.sum_lc5_emission}</td>
                    <td className="px-5">
                      {calculateDiff(5.5, Number(values.ghg_cycle_5), false)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(5.5, Number(values.ghg_cycle_5), true)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">รวม </td>
                    <td className="px-5">
                      {fr06Data?.sum_based_emission ??
                        Number(values.ghg_cycle_1) +
                          Number(values.ghg_cycle_2) +
                          Number(values.ghg_cycle_3) +
                          Number(values.ghg_cycle_4) +
                          Number(values.ghg_cycle_5)}
                    </td>
                    <td className="px-5">
                      {baseStatic
                        .slice(0, 5)
                        .reduce((sum, val) => sum + val, 0)}
                    </td>
                    <td className="px-5">
                      {calculateDiff(
                        baseStatic[0],
                        Number(values.ghg_cycle_1),
                        false
                      ) +
                        calculateDiff(
                          baseStatic[1],
                          Number(values.ghg_cycle_2),
                          false
                        ) +
                        calculateDiff(
                          baseStatic[2],
                          Number(values.ghg_cycle_3),
                          false
                        ) +
                        calculateDiff(
                          baseStatic[3],
                          Number(values.ghg_cycle_4),
                          false
                        ) +
                        calculateDiff(
                          baseStatic[4],
                          Number(values.ghg_cycle_5),
                          false
                        )}
                    </td>
                    <td className="px-5">
                      {calculateDiff(
                        baseStatic[0],
                        Number(values.ghg_cycle_1),
                        true
                      ) +
                        calculateDiff(
                          baseStatic[1],
                          Number(values.ghg_cycle_2),
                          true
                        ) +
                        calculateDiff(
                          baseStatic[2],
                          Number(values.ghg_cycle_3),
                          true
                        ) +
                        calculateDiff(
                          baseStatic[3],
                          Number(values.ghg_cycle_4),
                          true
                        ) +
                        calculateDiff(
                          baseStatic[4],
                          Number(values.ghg_cycle_5),
                          true
                        )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center mt-10 gap-5">
                <button className="secondary-button px-24 py-2" type="button">
                  กลับไป FR04.3
                </button>
                <button className="primary-button px-24 py-2" type="submit">
                  บันทึกและไป FR06.2
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default FR06_1;

const calculateDiff = (
  base_value: number,
  fieldValue: number,
  isPercentage: boolean
) => {
  let diff = fieldValue - base_value;
  if (isPercentage) {
    diff = (diff / Math.abs(fieldValue)) * 100;
  }
  return diff;
};

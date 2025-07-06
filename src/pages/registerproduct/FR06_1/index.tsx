import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Field } from "../../../component/input/field";
import useViewModel from "./viewModel";
const FR06_1 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr06Data, handleSubmit } = useViewModel(id);
  const baseStatic = [21, 3.8, 0.4, 10.6, 5.5];
  return (
    <div>
      <ProcessStepper isActive={5} id={id} />
      <div className="w-fit mx-auto">
        <Formik
          initialValues={{
            ghg_cycle_1: fr06Data?.lc1_based_emission || "",
            ghg_cycle_2: fr06Data?.lc2_based_emission || "",
            ghg_cycle_3: fr06Data?.lc3_based_emission || "",
            ghg_cycle_4: fr06Data?.lc4_based_emission || "",
            ghg_cycle_5: fr06Data?.lc5_based_emission || "",
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
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>ช่วงวัฎจักรชีวิต</th>
                    <th>การปล่อย GHG ในปีปัจจุบัน (kgCO2 eq.) ปี (ระบุ) </th>
                    <th>การปล่อย GHG ในปีฐาน (kgCO2 eq.) ปี (ระบุ)</th>
                    <th>ผลต่าง (เพิ่มขึ้น +)</th>
                    <th>ร้อยละ (เพิ่มขึ้น +)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>การได้มาของวัตถุดิบ </td>
                    <td>
                      <Field
                        name="ghg_cycle_1"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td>21.0000</td>
                    <td>
                      {calculateDiff(21.0, Number(values.ghg_cycle_1), false)}
                    </td>
                    <td>
                      {calculateDiff(21.0, Number(values.ghg_cycle_1), true)}%
                    </td>
                  </tr>

                  <tr>
                    <td>การกระจายสินค้า </td>
                    <td>
                      <Field
                        name="ghg_cycle_2"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td>3.8000</td>
                    <td>
                      {calculateDiff(3.8, Number(values.ghg_cycle_2), false)}
                    </td>
                    <td>
                      {calculateDiff(3.8, Number(values.ghg_cycle_2), true)}%
                    </td>
                  </tr>
                  <tr>
                    <td>การใช้งาน </td>
                    <td>
                      <Field
                        name="ghg_cycle_3"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td>0.4000</td>
                    <td>
                      {calculateDiff(0.4, Number(values.ghg_cycle_3), false)}
                    </td>
                    <td>
                      {calculateDiff(0.4, Number(values.ghg_cycle_3), true)}%
                    </td>
                  </tr>
                  <tr>
                    <td>การจัดการซาก </td>
                    <td>
                      <Field
                        name="ghg_cycle_4"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td>10.6000</td>
                    <td>
                      {calculateDiff(10.6, Number(values.ghg_cycle_4), false)}
                    </td>
                    <td>
                      {calculateDiff(10.6, Number(values.ghg_cycle_4), true)}%
                    </td>
                  </tr>
                  <tr>
                    <td>การผลิต </td>
                    <td>
                      <Field
                        name="ghg_cycle_5"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td>5.5000</td>
                    <td>
                      {calculateDiff(5.5, Number(values.ghg_cycle_5), false)}
                    </td>
                    <td>
                      {calculateDiff(5.5, Number(values.ghg_cycle_5), true)}%
                    </td>
                  </tr>
                  <tr>
                    <td>รวม </td>
                    <td>
                      {fr06Data?.sum_based_emission ??
                        Number(values.ghg_cycle_1) +
                          Number(values.ghg_cycle_2) +
                          Number(values.ghg_cycle_3) +
                          Number(values.ghg_cycle_4) +
                          Number(values.ghg_cycle_5)}
                    </td>
                    <td>
                      {baseStatic
                        .slice(0, 5)
                        .reduce((sum, val) => sum + val, 0)}
                    </td>
                    <td>
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
                    <td>
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
              <button className="primary-button px-5 py-2" type="submit">
                SUBMIT
              </button>
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

import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Field } from "../../../component/input/field";
import { FormControlLabel, Checkbox } from "@mui/material";

import useViewModel from "./viewModel";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
const FR06_1 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr06Data, handleSubmit, fr06Sum4142 } = useViewModel(id);
  const navigate = useNavigate();
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
            ghg_cycle_1: Number(fr06Data?.lc1_based_emission).toFixed(4) || 0,
            ghg_cycle_2: Number(fr06Data?.lc2_based_emission).toFixed(4) || 0,
            ghg_cycle_3: Number(fr06Data?.lc3_based_emission).toFixed(4) || 0,
            ghg_cycle_4: Number(fr06Data?.lc4_based_emission).toFixed(4) || 0,
            ghg_cycle_5: Number(fr06Data?.lc5_based_emission).toFixed(4) || 0,
          }}
          enableReinitialize
          // validationSchema={{}}
          onSubmit={(values) =>
            handleSubmit(fr06Data?.report61_sum_id ?? 0, {
              product_id: id ?? 0,
              company_id: fr06Data?.company_id ?? 0,
              document_name_by_TGO: null,
              document_no_by_TGO: null,
              lc1_based_emission: values.registrationRound
                ? baseStatic[0]
                : Number(values.ghg_cycle_1),
              lc2_based_emission: values.registrationRound
                ? baseStatic[1]
                : Number(values.ghg_cycle_2),
              lc3_based_emission: values.registrationRound
                ? baseStatic[2]
                : Number(values.ghg_cycle_3),
              lc4_based_emission: values.registrationRound
                ? baseStatic[3]
                : Number(values.ghg_cycle_4),
              lc5_based_emission: values.registrationRound
                ? baseStatic[4]
                : Number(values.ghg_cycle_5),
              land_used_based_emission: 0,
              lc1_diff_emission: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[0],
                    Number(values.ghg_cycle_1),
                    false
                  ),
              lc2_diff_emission: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[1],
                    Number(values.ghg_cycle_2),
                    false
                  ),
              lc3_diff_emission: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[2],
                    Number(values.ghg_cycle_3),
                    false
                  ),
              lc4_diff_emission: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[3],
                    Number(values.ghg_cycle_4),
                    false
                  ),
              lc5_diff_emission: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[4],
                    Number(values.ghg_cycle_5),
                    false
                  ),
              land_used_diff_emission: 0,
              lc1_diff_emission_percent: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[0],
                    Number(values.ghg_cycle_1),
                    true
                  ),
              lc2_diff_emission_percent: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[1],
                    Number(values.ghg_cycle_2),
                    true
                  ),
              lc3_diff_emission_percent: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[2],
                    Number(values.ghg_cycle_3),
                    true
                  ),
              lc4_diff_emission_percent: values.registrationRound
                ? 0
                : calculateDiff(
                    baseStatic[3],
                    Number(values.ghg_cycle_4),
                    true
                  ),
              lc5_diff_emission_percent: values.registrationRound
                ? 0
                : calculateDiff(
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
                <p className="italic text-primary text-sm font-medium">
                  หากไม่ได้ระบุเป็นปีแรก โปรดกรอกข้อมูลในช่องการปล่อย GHG
                  ในปีฐาน (kgCO2 eq.)
                </p>
              </div>
              <table className="table-auto w-full border-collapse border border-gray-200/10">
                <thead>
                  <tr className="bg-primary-2/20">
                    <th className="text-start py-2 ps-4">ช่วงวัฎจักรชีวิต</th>
                    <th className="px-5">การปล่อย GHG ในปีฐาน (kgCO2 eq.)</th>
                    <th className="px-5">
                      การปล่อย GHG ในปีปัจจุบัน (kgCO2 eq.)
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
                        fr06Sum4142?.sum_lc1_emission.toFixed(4)
                      ) : (
                        <Field
                          name="ghg_cycle_1"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">
                      {fr06Sum4142?.sum_lc1_emission.toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[0],
                            Number(values.ghg_cycle_1),
                            false
                          )}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[0],
                            Number(values.ghg_cycle_1),
                            true
                          )}
                      %
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การกระจายสินค้า </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc2_emission.toFixed(4)
                      ) : (
                        <Field
                          name="ghg_cycle_2"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">
                      {fr06Sum4142?.sum_lc2_emission?.toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[1],
                            Number(values.ghg_cycle_2),
                            false
                          )}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[1],
                            Number(values.ghg_cycle_2),
                            true
                          )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การใช้งาน </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc3_emission.toFixed(4)
                      ) : (
                        <Field
                          name="ghg_cycle_3"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">
                      {fr06Sum4142?.sum_lc3_emission.toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[2],
                            Number(values.ghg_cycle_3),
                            false
                          )}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[2],
                            Number(values.ghg_cycle_3),
                            true
                          )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การจัดการซาก </td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc4_emission.toFixed(4)
                      ) : (
                        <Field
                          name="ghg_cycle_4"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">
                      {fr06Sum4142?.sum_lc4_emission.toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[3],
                            Number(values.ghg_cycle_4),
                            false
                          )}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[3],
                            Number(values.ghg_cycle_4),
                            true
                          )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">การผลิต</td>
                    <td className="px-5">
                      {values.registrationRound ? (
                        fr06Sum4142?.sum_lc5_emission.toFixed(4)
                      ) : (
                        <Field
                          name="ghg_cycle_5"
                          label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                          type="number"
                        />
                      )}
                    </td>
                    <td className="px-5">
                      {fr06Sum4142?.sum_lc5_emission.toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[4],
                            Number(values.ghg_cycle_5),
                            false
                          )}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : calculateDiff(
                            baseStatic[4],
                            Number(values.ghg_cycle_5),
                            true
                          )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">รวม </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? baseStatic
                            .slice(0, 5)
                            .reduce((sum, val) => sum + val, 0)
                            .toFixed(4)
                        : Number(fr06Data?.sum_based_emission).toFixed(4) ??
                          (
                            Number(values.ghg_cycle_1) +
                            Number(values.ghg_cycle_2) +
                            Number(values.ghg_cycle_3) +
                            Number(values.ghg_cycle_4) +
                            Number(values.ghg_cycle_5)
                          ).toFixed(4)}
                    </td>
                    <td className="px-5">
                      {baseStatic
                        .slice(0, 5)
                        .reduce((sum, val) => sum + val, 0)
                        .toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : (
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
                            calculateDiff(
                              baseStatic[4],
                              Number(values.ghg_cycle_5),
                              false
                            )
                          ).toFixed(4)}
                    </td>
                    <td className="px-5">
                      {values.registrationRound
                        ? 0
                        : (
                            calculateDiff(
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
                            )
                          ).toFixed(4)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-1/2 mx-auto flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      PROTECTED_PATH.REGISTER_PRODUCT_FR04_3 + `?id=${id}`
                    )
                  }
                  className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold"
                >
                  กลับไป FR04.3
                </button>
                <button
                  type="submit"
                  className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
                >
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
    if (fieldValue === 0) return 0;
    diff = (diff / Math.abs(fieldValue)) * 100;
  }
  return diff === Infinity || isNaN(diff) ? Number(0) : Number(diff.toFixed(2));
};

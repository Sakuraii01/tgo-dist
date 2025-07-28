import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Field } from "../../../component/input/field";
import useViewModel from "./viewModel";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";

const FR06_2 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr06Data, handleFormSubmit, sum4142 } = useViewModel(id);
  const navigate = useNavigate();
  return (
    <div>
      <ProcessStepper isActive={6} id={id} />
      <div className="w-fit mx-auto">
        <Formik
          initialValues={{
            std_emission: fr06Data?.std_emission || 0,
            source: fr06Data?.std_emission_source ?? "",
          }}
          enableReinitialize
          // validationSchema={{}}
          onSubmit={(values) => {
            handleFormSubmit(fr06Data?.report62_sum_id || 0, {
              product_id: id,
              company_id: fr06Data?.company_id || 0,
              document_name_by_TGO: null,
              document_no_by_TGO: null,
              std_emission: values.std_emission,
              product_emission: sum4142 || 0,
              diff_emission:
                Number(fr06Data?.product_emission || sum4142) -
                Number(values.std_emission),
              std_emission_source: values.source,
            });
          }}
        >
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <table className="table-auto w-full border-collapse border border-gray-200/10">
                <thead>
                  <tr className="bg-primary-2/20">
                    <th className="text-start py-2 ps-4">
                      คาร์บอนฟุตพริ้นท์ของเกณฑ์เปรียบเทียบ (kgCO2 eq.)
                    </th>
                    <th className="px-5">
                      คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ (kgCO2 eq.)
                    </th>
                    <th className="px-5">ผลต่างเทียบกับเกณฑ์ (มากกว่า +)</th>
                    <th className="pe-4">ที่มาของ เกณฑ์เปรียบเทียบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200/10">
                    <td className="px-5 py-3">
                      <Field
                        name="std_emission"
                        label="คาร์บอนฟุตพริ้นท์ของเกณฑ์เปรียบเทียบ (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td className="px-5">
                      {" "}
                      {fr06Data?.product_emission ?? sum4142}{" "}
                    </td>
                    <td className="px-5">
                      {Number(fr06Data?.product_emission) -
                        Number(values.std_emission) || "-"}
                    </td>
                    <td className="px-5">
                      <Field name="source" label="ที่มาของ เกณฑ์เปรียบเทียบ" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-1/2 mx-auto flex gap-4">
                <button
                  onClick={() =>
                    navigate(
                      PROTECTED_PATH.REGISTER_PRODUCT_FR06_1 + `?id=${id}`
                    )
                  }
                  type="button"
                  className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold"
                >
                  กลับไป FR06.1
                </button>
                <button
                  type="submit"
                  className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
                >
                  บันทึกและดำเนินการต่อ
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default FR06_2;

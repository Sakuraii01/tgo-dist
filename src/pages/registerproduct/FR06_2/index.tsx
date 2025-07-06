import { ProcessStepper } from "../common/component/stepper";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Field } from "../../../component/input/field";
import useViewModel from "./viewModel";
const FR06_2 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { fr06Data, handleFormSubmit } = useViewModel(id);
  return (
    <div>
      <ProcessStepper isActive={6} id={id} />
      <div className="w-fit mx-auto">
        <Formik
          initialValues={{
            base_emission: fr06Data?.std_emission ?? "",
            source: fr06Data?.std_emission_source ?? "",
          }}
          enableReinitialize
          // validationSchema={{}}
          onSubmit={(values) => {
            handleFormSubmit({
              report62_sum_id: fr06Data?.report62_sum_id || 0,
              product_id: id,
              company_id: 1005,
              document_name_by_TGO: null,
              document_no_by_TGO: null,
              std_emission: values.base_emission,
              product_emission: fr06Data?.product_emission || "",
              diff_emission:
                Number(fr06Data?.std_emission) - Number(values.base_emission),
              std_emission_source: values.source,
            });
          }}
        >
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>คาร์บอนฟุตพริ้นท์ของเกณฑ์เปรียบเทียบ (kgCO2 eq.)</th>
                    <th>คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ (kgCO2 eq.)</th>
                    <th>ผลต่างเทียบกับเกณฑ์ (มากกว่า +)</th>
                    <th>ที่มาของ เกณฑ์เปรียบเทียบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Field
                        name="base_emission"
                        label="การปล่อย GHG ในปีฐาน (kgCO2 eq.)"
                        type="number"
                      />
                    </td>
                    <td> {fr06Data?.product_emission} </td>
                    <td>
                      {Number(fr06Data?.product_emission) -
                        Number(values.base_emission) || "-"}
                    </td>
                    <td>
                      <Field name="source" label="ที่มาของ เกณฑ์เปรียบเทียบ" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="primary-button px-5 y-2" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default FR06_2;

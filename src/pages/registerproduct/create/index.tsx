import { Form, Formik, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { Dropzone } from "../../../component/input/dropzone";
import useViewModel from "./viewModel";

import type { TextFieldProps } from "@mui/material/TextField";

const CreateProduct = () => {
  const { initialValues, handleSubmit } = useViewModel();
  // const [imagePreview, setImagePreview] = useState();
  const registrationRounds = [
    { label: "1/2568 (01/01/2568 - 31/03/2568)", value: "1/2568" },
    { label: "2/2568 (01/01/2568 - 31/03/2568)", value: "2/2568" },
    { label: "3/2568 (01/01/2568 - 31/03/2568)", value: "3/2568" },
    { label: "4/2568 (01/01/2568 - 31/03/2568)", value: "4/2568" },
    // Add more rounds if needed
  ];
  const PRC = [
    {
      label: "ข้อกำหนดเฉพำะกลุ่มผลิตภัณฑ์สำหรับผลิตภัณฑ์ปูนซีเมนต์สำเร็จรูป",
      value: "ข้อกำหนดเฉพำะกลุ่มผลิตภัณฑ์สำหรับผลิตภัณฑ์ปูนซีเมนต์สำเร็จรูป",
    },
    {
      label: "ข้อกำหนดเฉพาะกลุ่มผลิตภัณฑ์ยางพาราและผลิตภัณฑ์จากยางพารา",
      value: "ข้อกำหนดเฉพาะกลุ่มผลิตภัณฑ์ยางพาราและผลิตภัณฑ์จากยางพารา",
    },
  ];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-1/2 mx-auto py-4 px-7 bg-white rounded-lg shadow-lg">
              <h6 className="font-bold text-center my-3">
                กรอกข้อมูลผลิตภัณฑ์
              </h6>
              <div>
                <Autocomplete
                  options={registrationRounds}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) =>
                    setFieldValue("registrationRound", value?.value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="เลือกรอบการขึ้นทะเบียน"
                      fullWidth
                      margin="normal"
                    />
                  )}
                  size="small"
                />
              </div>
              <FormikTextField
                name="productNameTH"
                label="ชื่อผลิตภัณฑ์ และรุ่น (TH)"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />
              <FormikTextField
                name="productNameEN"
                label="ชื่อผลิตภัณฑ์ และรุ่น (EN)"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />
              <div className="flex gap-2">
                <FormikTextField
                  name="functionalValue"
                  label="ค่าหน่วยการทำงาน"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                  type="number"
                />
                <FormikTextField
                  name="functionalUnitTH"
                  label="หน่วยการทำงาน (TH)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <FormikTextField
                  name="functionalUnitEN"
                  label="หน่วยการทำงาน (EN)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
              </div>
              <div className="flex gap-2">
                <FormikTextField
                  name="functionalProductValue"
                  label="ค่าหน่วยผลิตภัณฑ์"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                  type="number"
                />
                <FormikTextField
                  name="functionalProductTH"
                  label="หน่วยผลิตภัณฑ์ (TH)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <FormikTextField
                  name="functionalProductEN"
                  label="หน่วยผลิตภัณฑ์ (EN)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
              </div>
              <div>
                <FormikTextField
                  name="sale_ratio"
                  label="สัดส่วนยอดขายผลิตภัณฑ์ในปีล่าสุด"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                  type="number"
                />
              </div>
              <div>
                <Autocomplete
                  options={PRC}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) =>
                    setFieldValue("pcrReference", value?.value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="อ้างอิง PCR"
                      fullWidth
                      margin="normal"
                    />
                  )}
                  size="small"
                />
              </div>
              <Dropzone
                file={values.product_image}
                handleUpload={(file) => setFieldValue("product_image", file)}
              />
              <div className="flex gap-4 text-center text-gray-300">
                {["B2B", "B2C"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setFieldValue("scope", type)}
                    className={`border ${
                      values.scope === type
                        ? type === "B2B"
                          ? "border-primary bg-primary/10"
                          : "border-secondary-500 bg-secondary-200"
                        : "border-gray-400"
                    } rounded-lg py-16 my-4 w-full cursor-pointer transition-all duration-200 ease-in-out`}
                  >
                    <p
                      className={`text-center ${
                        values.scope === type
                          ? type === "B2B"
                            ? "font-bold text-primary"
                            : "font-bold text-secondary-500"
                          : ""
                      }`}
                    >
                      {type}
                    </p>
                    <p className="text-xs">
                      {type === "B2B" ? "2-Cycle required" : "5-Cycle required"}
                    </p>
                  </div>
                ))}
              </div>
              <FormikTextField
                name="productNameTH"
                label="วันที่เริ่มเก็บข้อมูล"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />{" "}
              <FormikTextField
                name="productNameTH"
                label="วันที่หยุดเก็บข้อมูล"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />
            </div>
            <div className="w-1/4 mx-auto">
              <button
                type="submit"
                className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold"
              >
                ถัดไป
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;

interface FormikTextFieldProps extends Omit<TextFieldProps, "name" | "label"> {
  name: string;
  label: string;
}

const FormikTextField = ({ name, label, ...props }: FormikTextFieldProps) => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <TextField
      name={name}
      label={label}
      value={values[name]}
      onChange={(e) => setFieldValue(name, e.target.value)}
      {...props}
    />
  );
};

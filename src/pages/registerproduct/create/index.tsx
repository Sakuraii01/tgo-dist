import { Form, Formik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
const CreateProduct = () => {
  const [scope, setScope] = useState<"B2B" | "B2C">("B2B");
  const registrationRounds = [
    { label: "1/2568 (01/01/2568 - 31/03/2568)", value: "1/2568" },
    { label: "1/2568 (01/01/2568 - 31/03/2568)", value: "1/2568" },
    { label: "1/2568 (01/01/2568 - 31/03/2568)", value: "1/2568" },
    { label: "1/2568 (01/01/2568 - 31/03/2568)", value: "1/2568" },
    // Add more rounds if needed
  ];
  return (
    <div>
      <Formik
        initialValues={{
          productName: "",
          productType: "",
          productDescription: "",
        }}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-1/2 mx-auto py-4 px-7 bg-white rounded-lg shadow-lg">
              <h6 className="font-bold text-center my-3">
                กรอกข้อมูลผลิตภัณฑ์
              </h6>
              <div>
                {/* <label>เลือกรอบการขึ้นทะเบียน </label> */}
                <Autocomplete
                  options={registrationRounds}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) =>
                    setFieldValue("registrationRound", value)
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
              <TextField
                name="productNameTH"
                label="ชื่อผลิตภัณฑ์ และรุ่น (TH)"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />
              <TextField
                name="productNameEN"
                label="ชื่อผลิตภัณฑ์ และรุ่น (EN)"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                required
              />
              <div className="flex gap-2">
                <TextField
                  name="functionalValue"
                  label="ค่าหน่วยการทำงาน"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
                  name="functionalUnitTH"
                  label="หน่วยการทำงาน (TH)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
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
                <TextField
                  name="functionalProductValue"
                  label="ค่าหน่วยผลิตภัณฑ์"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
                  name="functionalProductTH"
                  label="หน่วยผลิตภัณฑ์ (TH)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
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
                <TextField
                  name="sale_ratio"
                  label="สัดส่วนยอดขายผลิตภัณฑ์ในปีล่าสุด"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
              </div>
              <div>
                <TextField
                  name="pcrReference"
                  label="อ้างอิง PCR"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  required
                />
              </div>
              <div className="border border-gray-400 rounded-lg py-24 my-4">
                <p className="text-center">อัพโหลดรูปภาพ</p>
              </div>
              <div className="flex gap-4 text-center text-gray-300">
                <div
                  onClick={() => setScope("B2B")}
                  className={`border ${
                    scope === "B2B"
                      ? "border-primary bg-primary/10"
                      : "border-gray-400"
                  } rounded-lg py-16 my-4 w-full cursor-pointer transition-all duration-200 ease-in-out`}
                >
                  <p
                    className={`text-center ${
                      scope === "B2B" ? "font-bold text-primary" : ""
                    }`}
                  >
                    B2B
                  </p>
                  <p className="text-xs">2-Cycle required</p>
                </div>
                <div
                  onClick={() => setScope("B2C")}
                  className={`border ${
                    scope === "B2C"
                      ? "border-secondary-500 bg-secondary-200"
                      : "border-gray-400"
                  } rounded-lg py-16 my-4 w-full cursor-pointer transition-all duration-200 ease-in-out`}
                >
                  <p
                    className={`text-center ${
                      scope === "B2C" ? "font-bold text-secondary-500" : ""
                    }`}
                  >
                    B2C
                  </p>
                  <p className="text-xs">5-Cycle required</p>
                </div>
              </div>
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

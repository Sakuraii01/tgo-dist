import { Field, AutoCompleteField } from "../../component/input/field";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { UNPROTECTED_PATH } from "../../constants/path.route";
import useViewModel from "./viewModel";
import type { UserInfo } from "../../service/api/user/type";
import { useEffect } from "react";
const Register = () => {
  const {
    provinces,
    industries,
    initialValues,
    RegisterFormValidationSchema,
    handleOnSubmit,
    fetchDistrict,
    fetchSubdistrict,
    district,
    subdistrict,
  } = useViewModel();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-5 w-full h-screen bg-gradient-to-tl from-[#DEF0D9] to-[#E2F7FB]">
      <div className="w-fit mx-auto my-auto">
        <img src="./Forms-amico.svg" className="w-80" />
        <div className="w-fit mx-auto mt-4">
          <h1 className="text-primary-linear text-linear text-center text-5xl font-medium">
            TGO <br />
            <span className="text-2xl">for CFP and CBAM</span>
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl w-1/2 p-5 h-full">
        <div className="flex gap-4 justify-center my-4">
          <img src="./icon.png" className="h-24" />
        </div>
        <div className="text-center">
          <h1 className="text-primary-linear text-linear text-center text-3xl font-medium">
            REGISTER
          </h1>
          <p className="text-primary-12 font-light">to get your account</p>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterFormValidationSchema}
            onSubmit={(values) =>
              handleOnSubmit(
                {
                  name: values.companyName,
                  email: values.email,
                  password: values.password,
                  role_id: 2,
                  status: "enable",
                } as UserInfo,
                {
                  name: values.companyName,
                  address: values.address,
                  zipcode: Number(values.zipCode),
                  province_id:
                    provinces.find(
                      (data) => data.province_name === values.province
                    )?.province_id ?? 0,
                  district_id:
                    district.find(
                      (data) => data.district_name === values.district
                    )?.district_id ?? 0,
                  subdistrict_id:
                    subdistrict.find(
                      (data) => data.subdistrict_name === values.subdistrict
                    )?.subdistrict_id ?? 0,
                  contact_no: values.phoneNum,
                  industrial_id: Number(values.industrial),
                }
              )
            }
          >
            {({ handleSubmit, values }) => {
              useEffect(() => {
                if (values.province) {
                  fetchDistrict(values.province);
                }
                if (values.district) {
                  fetchSubdistrict(values.province, values.district);
                }
              }, [values.province, values.district]);

              return (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-10 mx-10">
                    <div className="flex gap-3 my-3">
                      <Field
                        name="companyName"
                        label="ชื่อสถานประกอบการ"
                        placeholder="ชื่อสถานประกอบการ"
                      />
                      <AutoCompleteField
                        name="industrial"
                        label="ประเภทอุตสหกรรม"
                        placeholder="ประเภทอุตสหกรรม"
                        items={industries.map((data) => {
                          return {
                            value: data.industrial_id,
                            label: data.industrial_name,
                          };
                        })}
                      />
                    </div>
                    <div className="flex gap-3 my-3">
                      <AutoCompleteField
                        name="province"
                        label="จังหวัด"
                        placeholder="จังหวัด"
                        items={provinces.map((data) => {
                          return {
                            value: data.province_name,
                            label: data.province_name,
                          };
                        })}
                      />

                      <AutoCompleteField
                        name="district"
                        label="อำเภอ"
                        placeholder="อำเภอ"
                        items={district.map((data) => {
                          return {
                            value: data.district_name,
                            label: data.district_name,
                          };
                        })}
                      />

                      <AutoCompleteField
                        name="subdistrict"
                        label="ตำบล"
                        placeholder="ตำบล"
                        items={subdistrict.map((data) => {
                          return {
                            value: data.subdistrict_name,
                            label: data.subdistrict_name,
                          };
                        })}
                      />
                    </div>
                    <div className="flex gap-3 ">
                      <div className="w-40">
                        <Field
                          name="zipCode"
                          label="รหัสไปรษณีย์"
                          placeholder="รหัสไปรษณีย์"
                          type="number"
                        />
                      </div>
                      <Field
                        name="address"
                        label="ที่อยู่"
                        placeholder="ที่อยู่"
                        type="text"
                      />
                    </div>

                    <div className="flex gap-3 my-3">
                      <Field
                        name="phoneNum"
                        label="เบอร์โทรศัพท์"
                        placeholder="0912345678"
                        type="number"
                      />

                      <Field
                        name="email"
                        label="อีเมล์"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div className="my-3">
                      <Field
                        name="password"
                        label="รหัสผ่าน"
                        placeholder="รหัสผ่าน"
                        type="password"
                      />
                    </div>
                    <div>
                      <Field
                        name="passwordcomfirm"
                        label="ยืนยันรหัสผ่าน"
                        placeholder="ยืนยันรหัสผ่าน"
                        type="password"
                      />
                    </div>
                    <p
                      className="font-light text-end text-xs"
                      onClick={() => navigate(UNPROTECTED_PATH.LOGIN)}
                    >
                      Have an account?{" "}
                      <span className="cursor-pointer text-primary hover:text-primary-2">
                        Sign in
                      </span>
                    </p>
                    <button
                      type="submit"
                      className="text-primary-linear text-white font-semibold py-2 w-full my-5 rounded-full"
                    >
                      Register
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <a
        className="absolute bottom-5 right-10 text-xs"
        href="https://storyset.com/online"
      >
        Online illustrations by Storyset
      </a>
    </div>
  );
};
export default Register;

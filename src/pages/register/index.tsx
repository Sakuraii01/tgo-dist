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
    verifierInitialValues,
    RegisterFormValidationSchema,
    VerifierRegisterFormValidationSchema,
    handleOnSubmit,
    handleOnVerifierSubmit,
    fetchDistrict,
    fetchSubdistrict,
    district,
    subdistrict,
    tab,
    handleTabChange,
  } = useViewModel();
  const navigate = useNavigate();
  const header = ["สถานประกอบการ", "ผู้ทวนสอบ"];
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
          <h1 className="text-primary-linear text-linear w-fit mx-auto text-center text-3xl font-medium">
            REGISTER
          </h1>
          <div className="flex w-fit mx-auto font-medium text-gray-300 mt-5">
            {header.map((data, index) => (
              <p
                key={index}
                onClick={() => handleTabChange(index)}
                className={`${
                  tab === index
                    ? "font-bold text-primary border-b-2 border-primary"
                    : "border-b border-gray-300"
                } px-6 py-2 transition-all`}
              >
                {data}
              </p>
            ))}
          </div>

          <div>
            {0 === tab && (
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
                      contact_no: "0" + values.phoneNum,
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
            )}
            {1 === tab && (
              <Formik
                initialValues={verifierInitialValues}
                validationSchema={VerifierRegisterFormValidationSchema}
                onSubmit={(values) =>
                  handleOnVerifierSubmit(
                    {
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      role_id: 3,
                      status: "enable",
                    },
                    {
                      user_id: 0,
                      name: values.name,
                      prefix_name: values.namePrefix,
                      register_id: values.verifierNumber,
                    }
                  )
                }
              >
                {({ handleSubmit }) => (
                  <div>
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-10 mx-10">
                        <div className="flex gap-3 my-3">
                          <div className="w-60">
                            <Field
                              name="namePrefix"
                              label="คำนำหน้า"
                              placeholder="คำนำหน้า"
                            />
                          </div>
                          <Field
                            name="name"
                            label="ชื่อ นามสกุล"
                            placeholder="ชื่อ นามสกุล"
                          />
                          <Field
                            name="verifierNumber"
                            label="เลขประจำตัวผู้ทวนสอบ"
                            placeholder="เลขประจำตัวผู้ทวนสอบ"
                          />
                        </div>
                        <div className="my-3">
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
                        <Field
                          name="passwordcomfirm"
                          label="ยืนยันรหัสผ่าน"
                          placeholder="ยืนยันรหัสผ่าน"
                          type="password"
                        />
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
                  </div>
                )}
              </Formik>
            )}
          </div>
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

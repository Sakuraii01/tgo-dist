import { Navbar } from "../../../component/layout";
import { Formik, Form } from "formik";
import { AutoCompleteField, Field } from "../../../component/input/field";
import useViewModel from "./viewModel";
import { useEffect } from "react";
const CompanyInfo = () => {
  const {
    isEdit,
    initialValues,
    industries,
    provinces,
    district,
    subdistrict,
    fetchDistrict,
    fetchSubdistrict,
    handleChangeSetEdit,
    handleSubmit,
  } = useViewModel();
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-20">
        <h4 className="text-xl font-bold">Company Information</h4>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values) =>
              handleSubmit({
                name: values.companyName,
                address: values.address,
                zipcode: Number(values.zipcode),
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
              })
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
                        label="ประเภทอุตสาหกรรม"
                        placeholder="ประเภทอุตสาหกรรม"
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
                          name="zipcode"
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

                      {/* <Field
                        name="email"
                        label="อีเมล์"
                        placeholder="example@gmail.com"
                      /> */}
                    </div>

                    <div className="flex justify-end ">
                      {isEdit ? (
                        <div className="flex gap-5">
                          <button
                            type="button"
                            className="bg-gray-300 text-white font-semibold py-2 px-8 my-5 rounded-full"
                            onClick={() => handleChangeSetEdit(false)}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="submit"
                            className="text-primary-linear text-white font-semibold py-2 px-8 my-5 rounded-full"
                          >
                            ยืนยัน
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="text-primary-linear text-white font-semibold py-2 px-8 my-5 rounded-full"
                          onClick={() => handleChangeSetEdit(true)}
                        >
                          แก้ไขข้อมูล
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default CompanyInfo;

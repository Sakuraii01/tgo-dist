import * as yup from "yup";

const RegisterSchema = () => {
  const RegisterFormValidationSchema = yup.object({
    companyName: yup.string().required("กรุณาระบุชื่อบริษัท"),
    industrial: yup.string().required("กรุณาเลือกอุตสาหกรรม"),
    province: yup.string().required("กรุณาเลือกจังหวัด"),
    phoneNum: yup.number().required("กรุณาระบุเบอร์โทรศัพท์"),
    email: yup
      .string()
      .email("กรุณาระบุอีเมลให้ถูกต้อง")
      .required("กรุณาระบุอีเมล"),
    password: yup
      .string()
      .required("กรุณาระบุรหัสผ่าน")
      .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    passwordcomfirm: yup
      .string()
      .required("กรุณาระบุรหัสผ่าน")
      .oneOf([yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
  });

  return {
    RegisterFormValidationSchema,
  };
};

export default RegisterSchema;

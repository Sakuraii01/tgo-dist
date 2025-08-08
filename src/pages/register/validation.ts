import * as yup from "yup";

const RegisterSchema = () => {
  const RegisterFormValidationSchema = yup.object({
    companyName: yup.string().required("กรุณาระบุชื่อบริษัท"),
    industrial: yup.string().required("กรุณาเลือกอุตสาหกรรม"),
    province: yup.string().required("กรุณาเลือกจังหวัด"),
    district: yup.string().required("กรุณาเลือกอำเภอ"),
    subdistrict: yup.string().required("กรุณาเลือกตำบล"),
    zipCode: yup
      .string()
      .required("กรุณาระบุรหัสไปรษณีย์")
      .matches(/^\d{5}$/, "รหัสไปรษณีย์ต้องมี 5 หลัก"),
    address: yup.string().required("กรุณาระบุที่อยู่"),
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

  const VerifierRegisterFormValidationSchema = yup.object({
    namePrefix: yup.string().required("กรุณาระบุคํานําหน้า"),
    verifierNumber: yup.string().required("เลขประจำตัวผู้ทวนสอบ"),
    name: yup.string().required("กรุณาระบุชื่อ"),
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
    VerifierRegisterFormValidationSchema,
  };
};

export default RegisterSchema;

import * as yup from "yup";

const FR03FormSchema = () => {
  const FR03FomrValidationSchema = yup.object({
    type: yup.string().required("กรุณาเลือกหัวข้อ"),
    itemName: yup.string().required("กรุณากรอกชื่อผลิตภัณฑ์"),
    materialType: yup.string().required("กรุณาเลือกประเภทวัตถุดิบ"),
    unit: yup.string().required("กรุณาเลือกหน่วย"),
    amount: yup.number().required("กรุณากรอกจํานวน"),
  });
  return {
    FR03FomrValidationSchema,
  };
};

export default FR03FormSchema;

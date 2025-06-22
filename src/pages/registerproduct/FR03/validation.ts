import * as yup from "yup";

const FR03FormSchema = () => {
  const FR03FomrValidationSchema = yup.object({
    type: yup.string().required("กรุณาเลือกหัวข้อ"),
    itemName: yup.string().required("กรุณากรอกชื่อรายการ"),
    unit: yup.string().required("กรุณาเลือกหน่วย"),
    amount: yup.number().required("กรุณากรอกจํานวน"),
  });
  const AddProcessValidationSchema = yup.object({
    process_name: yup.string().required("กรุณากรอกชื่อกระบวนการ"),
  });
  return {
    FR03FomrValidationSchema,
    AddProcessValidationSchema,
  };
};

export default FR03FormSchema;

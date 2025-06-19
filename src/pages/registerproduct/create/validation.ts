import * as yup from "yup";

const CreateFormSchema = () => {
  const FR03FomrValidationSchema = yup.object({
    startCollectData: yup.date().required("กรุณาเลือกวันช่วงเวลาที่เก็บข้อมูล"),
    stopCollectData: yup.date().required("กรุณาเลือกวันช่วงเวลาที่เก็บข้อมูล"),
    productNameTH: yup.string().required("กรุณากรอกชื่อผลิตภัณฑ์ TH"),
    productNameEN: yup.string().required("กรุณากรอกชื่อผลิตภัณฑ์ EN"),
    functionalValue: yup.number().required("กรุณากรอกค่าหน่วยการทำงาน"),
    functionalUnit: yup.string().required("กรุณากรอกหน่วยการทำงาน"),
    functionalProductValue: yup.number().required("กรุณากรอกค่าหน่วยผลิตภัณฑ์"),
    functionalProduct: yup.string().required("กรุณากรอกหน่วยผลิตภัณฑ์"),
    technicalInfo: yup
      .array()
      .of(yup.string())
      .required("กรุณากรอกข้อมูลทางเทคนิค"),
    sale_ratio: yup.number().required("กรุณากรอกอัตราการขาย"),
    pcrReference: yup.string().required("กรุณากรอกอ้างอิง PCR"),
  });
  return {
    FR03FomrValidationSchema,
  };
};

export default CreateFormSchema;

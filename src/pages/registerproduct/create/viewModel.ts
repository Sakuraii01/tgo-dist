import { type ProductType } from "../../../service/api/product/type";
import { ProductService } from "../../../service/api/product";
import { useEffect } from "react";
type productProps = {
  registrationRound: string;
  productNameTH: string;
  productNameEN: string;
  functionalValue: string;
  functionalUnitTH: string;
  functionalUnitEN: string;
  functionalProductValue: string;
  functionalProductTH: string;
  functionalProductEN: string;
  sale_ratio: string;
  pcrReference: string;
  product_image: File | null;
  scope: string;
};
const useViewModel = () => {
  const productService = new ProductService();
  const initialValues = {
    registrationRound: "",
    productNameTH: "",
    productNameEN: "",
    functionalValue: "",
    functionalUnitTH: "",
    functionalUnitEN: "",
    functionalProductValue: "",
    functionalProductTH: "",
    functionalProductEN: "",
    sale_ratio: "",
    pcrReference: "",
    product_image: null,
    scope: "B2B",
  };
  const handleSubmit = (data: productProps) => {
    if (
      (data.scope !== "B2B" && data.scope !== "B2C") ||
      data.product_image === null ||
      !(data.product_image instanceof File)
    ) {
      return;
    }
    console.log(data.product_image);
    const entity: ProductType = {
      product_id: 9,
      company_id: 1005,
      product_name_th: data.productNameTH,
      product_name_en: data.productNameEN,
      scope: data.scope,
      FU_value: Number(data.functionalValue),
      FU_th: data.functionalUnitTH,
      FU_en: data.functionalUnitEN,
      PU_value: Number(data.functionalProductValue),
      PU_th: data.functionalProductTH,
      PU_en: data.functionalProductEN,
      sale_ratio: Number(data.sale_ratio),
      pcr_reference: data.pcrReference,
      product_photo: data.product_image,
      auditor_id: null,
      product_techinfo: null,
      verify_status: "verified",
      // what is topic field
      collect_data_start: null,
      collect_data_end: null,
      submitted_round: data.registrationRound,
      submitted_date: null,
    };
    try {
      productService.reqPutProduct(9, entity);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    productService.reqGetProduct(9).then((data) => console.log(data));
  }, []);

  return { initialValues, handleSubmit };
};
export default useViewModel;

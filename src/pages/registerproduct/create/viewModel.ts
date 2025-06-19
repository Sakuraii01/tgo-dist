import { ProductService } from "../../../service/api/product";
import { useEffect, useState } from "react";
import CreateFormSchema from "./validation";
import {
  UnitsDropdownService,
  RegisterRoundDropdownService,
} from "../../../service/api/dropdown";
import type {
  UnitsDrowpdownType,
  RegisterRounedType,
} from "../../../service/api/dropdown/type";
import { type ProductType } from "../../../service/api/product/type";
type productProps = {
  registrationRound: string;
  startCollectData: Date | string;
  stopCollectData: Date | string;
  productNameTH: string;
  productNameEN: string;
  functionalValue: string;
  functionalUnit: string;
  functionalProductValue: string;
  functionalProduct: string;
  technicalInfo: string[];
  sale_ratio: string;
  pcrReference: string;
  product_image: File | null;
  scope: string;
};
const useViewModel = () => {
  const unitService = new UnitsDropdownService();
  const registerRoundService = new RegisterRoundDropdownService();
  const [registerRoundList, setRegisterRoundList] = useState<
    RegisterRounedType[]
  >([]);
  const [unitList, setUnitList] = useState<UnitsDrowpdownType[]>([]);
  const { FR03FomrValidationSchema } = CreateFormSchema();
  const productService = new ProductService();
  const initialValues = {
    registrationRound: "",
    startCollectData: "",
    stopCollectData: "",
    productNameTH: "",
    productNameEN: "",
    functionalValue: "",
    functionalUnit: "",
    functionalProductValue: "",
    functionalProduct: "",
    technicalInfo: [""],
    sale_ratio: "",
    pcrReference: "",
    product_image: null,
    scope: "B2B",
  };
  const handleSubmit = (data: productProps) => {
    console.log(data);
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
      FU_th: Number(data.functionalUnit),
      FU_en: Number(data.functionalUnit),
      PU_value: Number(data.functionalProductValue),
      PU_th: Number(data.functionalProduct),
      PU_en: Number(data.functionalProduct),
      sale_ratio: Number(data.sale_ratio),
      pcr_reference: data.pcrReference,
      product_photo: data.product_image,
      auditor_id: null,
      product_techinfo: data.technicalInfo,
      verify_status: "verified",
      // what is topic field
      collect_data_start: data.startCollectData,
      collect_data_end: data.stopCollectData,
      submitted_round: data.registrationRound,
      submitted_date: null,
    };
    try {
      productService.reqPostProduct(entity);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    unitService
      .reqGetUnits()
      .then((data) => {
        setUnitList(data || []);
      })
      .catch((err) => console.error(err));

    registerRoundService
      .reqGetRegisterRound()
      .then((data) => {
        setRegisterRoundList(data || []);
      })
      .catch((err) => console.error(err));
    productService.reqGetProduct(5).then((data) => console.log(data));
  }, []);

  return {
    initialValues,
    FR03FomrValidationSchema,
    unitList,
    registerRoundList,
    handleSubmit,
  };
};
export default useViewModel;

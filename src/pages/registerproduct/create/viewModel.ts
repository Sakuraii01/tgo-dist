import { ProductService } from "../../../service/api/product";
import { useCallback, useEffect, useState } from "react";
import CreateFormSchema from "./validation";
import {
  UnitsDropdownService,
  RegisterRoundDropdownService,
  TGOEFDropdownService,
} from "../../../service/api/dropdown";
import type {
  UnitsDrowpdownType,
  RegisterRounedType,
  PCRType,
} from "../../../service/api/dropdown/type";
import { type ProductType } from "../../../service/api/product/type";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
type productProps = {
  registrationRound: string;
  startCollectData: Date | string;
  stopCollectData: Date | string;
  productNameTH: string;
  productNameEN: string;
  functionalValue: string | number;
  functionalUnit: string | number;
  functionalProductValue: string | number;
  functionalProduct: string | number;
  technicalInfo: string[] | string;
  sale_ratio: string;
  pcrReference: string;
  product_image: File | string | null;
  scope: string;
};
const useViewModel = (id?: number) => {
  const navigate = useNavigate();
  const unitService = new UnitsDropdownService();
  const tgoEFDropdownService = new TGOEFDropdownService();
  const registerRoundService = new RegisterRoundDropdownService();
  const [registerRoundList, setRegisterRoundList] = useState<
    RegisterRounedType[]
  >([]);
  const [unitList, setUnitList] = useState<UnitsDrowpdownType[]>([]);
  const [savePicture, setSavePicture] = useState<File | null>(null);
  const [initialValues, setInitialValues] = useState<productProps>({
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
  });
  const [pcrList, setPcrList] = useState<PCRType[]>([]);
  const { FR03FomrValidationSchema } = CreateFormSchema();
  const productService = new ProductService();

  const handleChangePicture = useCallback((file: File) => {
    setSavePicture(file);
  }, []);
  useEffect(() => {
    if (savePicture) {
      console.log("Updated savePicture:", savePicture);
    }
  }, [savePicture]);
  const handleSubmit = async (data: productProps) => {
    let newId = id;
    if (data.scope !== "B2B" && data.scope !== "B2C") {
      return;
    }

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
      product_photo: "",
      auditor_id: null,
      product_techinfo: Array.isArray(data.technicalInfo)
        ? `[${data.technicalInfo
            .map((item) => '"' + item.trim() + '"')
            .join(",")}]`
        : data.technicalInfo.trim(),
      verify_status: "draft",
      collect_data_start: data.startCollectData.toString().split("T")[0],
      collect_data_end: data.stopCollectData.toString().split("T")[0],
      submitted_round: data.registrationRound,
      submitted_date: null,
    };
    try {
      const formData = new FormData();
      if (savePicture) {
        formData.append("product_photo", savePicture);
      }

      if (id) {
        entity.product_id = id;
        await productService.reqPutProduct(id, entity);
        await productService.reqPutProductPicture(id, formData);
      } else {
        const res = await productService.reqPostProduct(entity);
        console.log(res);

        newId = Number(res?.product_id);
        await productService.reqPutProductPicture(newId, formData);
      }
      console.log("success");
    } catch (err) {
      console.log(err);
    } finally {
      navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR03 + `?id=${newId}`);
    }
  };
  useEffect(() => {
    unitService
      .reqGetUnits()
      .then((data) => {
        setUnitList(data || []);
      })
      .catch((err) => console.error(err));
    tgoEFDropdownService
      .reqGetPCRService()
      .then((data) => {
        setPcrList(data || []);
      })
      .catch((err) => console.error(err));
    registerRoundService
      .reqGetRegisterRound()
      .then((data) => {
        setRegisterRoundList(data || []);
      })
      .catch((err) => console.error(err));
    if (id) {
      productService
        .reqGetProduct(id)
        .then((data) => {
          console.log(data);

          if (data) {
            setInitialValues({
              registrationRound: data.submitted_round,
              startCollectData: data.collect_data_start
                ? data.collect_data_start
                : "",
              stopCollectData: data.collect_data_end
                ? data.collect_data_end
                : "",
              productNameTH: data.product_name_th,
              productNameEN: data.product_name_en,
              functionalValue: Number(data.FU_value),
              functionalUnit: Number(data.FU_th),
              functionalProductValue: Number(data.PU_value),
              functionalProduct: Number(data.PU_th),
              technicalInfo: data.product_techinfo
                ? typeof data.product_techinfo === "string"
                  ? JSON.parse(data.product_techinfo)
                  : data.product_techinfo
                : [""],
              sale_ratio: String(data.sale_ratio),
              pcrReference: data.pcr_reference,
              product_image: data.product_photo
                ? "http://178.128.123.212:5000/" + data.product_photo
                : null,
              scope: data.scope,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return {
    initialValues,
    FR03FomrValidationSchema,
    unitList,
    registerRoundList,
    pcrList,
    savePicture,
    handleChangePicture,
    handleSubmit,
  };
};
export default useViewModel;

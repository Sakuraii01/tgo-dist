import { useState, useEffect } from "react";
import { IndustryService, AddressService } from "../../service/api/dropdown";
import type {
  IndustryType,
  ProvinceType,
  DistrincType,
  SubDistricType,
} from "../../service/api/dropdown/type";
import RegisterSchema from "./validation";
import { UserService } from "../../service/api/user";
import type {
  UserInfo,
  CompanyInfo,
  VerifierInfo,
} from "../../service/api/user/type";
import { useNavigate } from "react-router-dom";
import { UNPROTECTED_PATH } from "../../constants/path.route";
const useViewModel = () => {
  const navigate = useNavigate();
  const industryService = new IndustryService();
  const addressService = new AddressService();
  const userService = new UserService();

  const { RegisterFormValidationSchema, VerifierRegisterFormValidationSchema } =
    RegisterSchema();

  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [district, setDistrict] = useState<DistrincType[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubDistricType[]>([]);
  const [tab, setTab] = useState(0);
  const handleTabChange = (newValue: number) => {
    setTab(newValue);
  };
  const fetchDistrict = async (province: string) => {
    await addressService.reqGetDistrict({ province: province }).then((data) => {
      setDistrict(data);
    });
  };
  const fetchSubdistrict = async (province: string, district: string) => {
    await addressService
      .reqGetSubDistrict({ provice: province, district: district })
      .then((data) => {
        setSubdistrict(data);
      });
  };
  const initialValues = {
    companyName: "",
    industrial: "",
    province: "",
    district: "",
    subdistrict: "",
    address: "",
    zipCode: "",
    phoneNum: "",
    email: "",
    password: "",
    passwordcomfirm: "",
  };
  const verifierInitialValues = {
    namePrefix: "",
    verifierNumber: "",
    name: "",
    email: "",
    password: "",
    passwordcomfirm: "",
  };
  const handleOnSubmit = async (user: UserInfo, company: CompanyInfo) => {
    const userid = await userService
      .reqPostUser(user)
      .then((data) => {
        return data.userID;
      })
      .catch((error) => {
        console.log(error);
      });
    if (!userid) {
      console.error("User creation failed");
      return;
    }
    await userService
      .reqPostCompany({ ...company, user_id: userid })
      .then((data) => {
        console.log(data);
      });
    navigate(UNPROTECTED_PATH.LOGIN);
    // return userData;
  };
  const handleOnVerifierSubmit = async (
    user: UserInfo,
    verifier: VerifierInfo
  ) => {
    const userid = await userService
      .reqPostUser(user)
      .then((data) => {
        return data.userID;
      })
      .catch((error) => {
        console.log(error);
      });

    if (!userid) {
      console.error("User creation failed");
      return;
    }
    await userService
      .reqPostVerifier({ ...verifier, user_id: userid })
      .then((data) => {
        console.log(data);
      });
    navigate(UNPROTECTED_PATH.LOGIN);
  };

  useEffect(() => {
    const fetchData = async () => {
      await industryService.reqGetIndustry().then((data) => {
        setIndustries(data);
      });
      await addressService.reqGetProvince().then((data) => {
        setProvinces(data);
      });
    };
    fetchData();
  }, []);
  return {
    industries,
    provinces,
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
  };
};
export default useViewModel;

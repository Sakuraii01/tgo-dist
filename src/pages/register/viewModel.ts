import { useState, useEffect } from "react";
import { IndustryService, AddressService } from "../../service/api/dropdown";
import type {
  IndustryType,
  ProvinceType,
} from "../../service/api/dropdown/type";
import RegisterSchema from "./validation";
import { UserService } from "../../service/api/user";
import type { UserInfo, CompanyInfo } from "../../service/api/user/type";
import { useNavigate } from "react-router-dom";
import { UNPROTECTED_PATH } from "../../constants/path.route";
const useViewModel = () => {
  const navigate = useNavigate();
  const industryService = new IndustryService();
  const addressService = new AddressService();
  const userService = new UserService();

  const { RegisterFormValidationSchema } = RegisterSchema();

  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);

  const initialValues = {
    companyName: "",
    industrial: "",
    province: "",
    phoneNum: "",
    email: "",
    password: "",
    passwordcomfirm: "",
  };
  const handleOnSubmit = async (user: UserInfo, company: CompanyInfo) => {
    await userService
      .reqPostCompanyUser({ user, company })
      .then((data) => {
        console.log(data);
        navigate(UNPROTECTED_PATH.LOGIN);
      })
      .catch((error) => {
        console.log(error);
      });
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
    RegisterFormValidationSchema,
    handleOnSubmit,
  };
};
export default useViewModel;

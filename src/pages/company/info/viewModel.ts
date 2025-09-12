import { IndustryService, AddressService } from "../../../service/api/dropdown";
import type {
  IndustryType,
  ProvinceType,
  DistrincType,
  SubDistricType,
} from "../../../service/api/dropdown/type";
import { CompanyService } from "../../../service/api/company";
import type { CompanyInfo } from "../../../service/api/user/type";
import { UserService } from "../../../service/api/user";

import { useState, useEffect } from "react";
const useViewModel = () => {
  const industryService = new IndustryService();
  const addressService = new AddressService();
  const companyService = new CompanyService();
  const userService = new UserService();

  const [isEdit, setIsEdit] = useState(false);

  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [district, setDistrict] = useState<DistrincType[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubDistricType[]>([]);
  const [initialValues, setInitialValues] = useState({
    user_id: 0,
    companyName: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    zipcode: "",
    phoneNum: "",
    industrial: "",
  });

  const handleSubmit = async (entity: CompanyInfo) => {
    try {
      await userService.reqPutCompany(entity);
    } catch (err) {
      console.error(err);
    }
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
  const fetchCompanyData = async () => {
    await companyService
      .reqGetCompany()
      .then((res) =>
        setInitialValues({
          user_id: res.user_id,
          companyName: res.name,
          address: res.address,
          province: res.province_name,
          district: res.district_name,
          subdistrict: res.subdistrict_name,
          zipcode: String(res.zipcode),
          phoneNum: res.contact_no,
          industrial: res.industrial_id,
        })
      )
      .catch((err) => console.error(err));
  };
  const handleChangeSetEdit = (values: boolean) => {
    setIsEdit(values);
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
    fetchCompanyData();
  }, []);
  return {
    isEdit,
    initialValues,
    industries,
    provinces,
    district,
    subdistrict,
    fetchDistrict,
    fetchSubdistrict,
    handleChangeSetEdit,
    handleSubmit,
  };
};
export default useViewModel;

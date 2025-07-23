export type CompanyInfo = {
  user_id?: number;
  name: string;
  address: string;
  province_id: number;
  contact_no: string;
  industrial_id: number;
};

export type UserInfo = {
  company_id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  status: string;
};

export type Login = {
  email: string;
  password: string;
};

export type UserLoginInfo = {
  message: string;
  token: string;
  expires_at: string;
  user: {
    company_id: number;
    user_id: number;
    email: string;
    role_id: number;
    name: string;
    status: string;
    created_date: string;
    updated_date: string;
  };
  company: {
    company_id: number;
    user_id: number;
    name: string;
    address: string;
    province_id: number;
    contact_no: string;
    industrial_id: number;
    created_date: string;
    updated_date: string;
  }[];
};

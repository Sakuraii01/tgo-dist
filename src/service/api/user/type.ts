export type CompanyInfo = {
  user_id?: number;
  name: string;
  address: string;
  province_id: number;
  contact_no: string;
  industrial_id: number;
};

export type UserInfo = {
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
  user: {
    user_id: number;
    email: string;
    role_id: number;
    name: string;
    status: string;
    created_date: string;
    updated_date: string;
  };
};

export type CompanyInfo = {
  user_id?: number;
  name: string;
  address: string;
  province_id: number;
  district_id: number;
  subdistrict_id: number;
  zipcode: number;
  contact_no: string;
  industrial_id: number;
};
export type UserResponse = {
  message: "User created successfully";
  userID: number;
  user: {
    name: string;
    email: string;
    password: string;
    role_id: number;
    status: string;
  };
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
  role: {
    role_id: number;
    role_name: string;
    role_description: string;
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

export type VerifierInfo = {
  user_id: number;
  prefix_name: string;
  name: string;
  register_id: string;
};

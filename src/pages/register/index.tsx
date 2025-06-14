import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH, UNPROTECTED_PATH } from "../../constants/path.route";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-5 w-full h-screen bg-gradient-to-tl from-[#DEF0D9] to-[#E2F7FB]">
      <div className="w-fit mx-auto my-auto">
        <img src="/Forms-amico.svg" className="w-80" />
        <div className="w-fit mx-auto mt-4">
          <h1 className="text-primary-linear text-linear text-center text-5xl font-medium">
            TGO <br />
            <span className="text-2xl">for CFP and CBAM</span>
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl w-1/2 p-5 h-full">
        <div className="flex gap-4 justify-center my-4">
          <img src="/icon.png" className="h-24" />
        </div>
        <div className="text-center">
          <h1 className="text-primary-linear text-linear text-center text-3xl font-medium">
            REGISTER
          </h1>
          <p className="text-primary-12 font-light">to get your account</p>

          <div className="mb-10 w-72 mx-auto">
            <div className="my-3">
              <TextField
                name="companyName"
                label="Company Name"
                placeholder="Company Name"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="address"
                label="Adress"
                placeholder="Adress"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="industrial"
                label="Industrial"
                placeholder="Industrial"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="phoneNum"
                label="Phone number"
                placeholder="Phone number"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="email"
                label="Email"
                placeholder="Email"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="username"
                label="Username"
                placeholder="Username"
                size="small"
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                name="password"
                label="Password"
                placeholder="Password"
                size="small"
                fullWidth
              />
            </div>
            <div>
              <TextField
                name="passwordcomfirm"
                label="Password Confirm"
                placeholder="Password Confirm"
                type="password"
                size="small"
                fullWidth
              />
            </div>
            <p
              className="font-light text-end text-xs"
              onClick={() => navigate(UNPROTECTED_PATH.LOGIN)}
            >
              Have an account?{" "}
              <span className="cursor-pointer text-primary hover:text-primary-2">
                Sign in
              </span>
            </p>
            <button
              onClick={() => navigate(PROTECTED_PATH.DASHBOARD)}
              type="submit"
              className="text-primary-linear text-white font-semibold py-2 w-full my-5 rounded-full"
            >
              Register
            </button>
          </div>
        </div>
      </div>{" "}
      <a
        className="absolute bottom-5 right-10 text-xs"
        href="https://storyset.com/online"
      >
        Online illustrations by Storyset
      </a>
    </div>
  );
};
export default Register;

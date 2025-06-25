import { useNavigate } from "react-router-dom";
import { UNPROTECTED_PATH } from "../../constants/path.route";
import { Formik, Form } from "formik";
import { Field } from "../../component/input/field";
import useViewModel from "./viewModel";
import LoginSchema from "./validation";
const Login = () => {
  const { handleOnSubmit } = useViewModel();
  const { LoginFormValidationSchema } = LoginSchema();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-5 w-full h-screen bg-gradient-to-tl from-[#DEF0D9] to-[#E2F7FB]">
      <div className="w-fit mx-auto my-auto">
        <img src="./Forms-amico.svg" className="w-80" />
        <div className="w-fit mx-auto mt-10">
          <h1 className="text-primary-linear text-linear text-center text-5xl font-medium">
            TGO <br />
            <span className="text-2xl">for CFP and CBAM</span>
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl w-1/2 p-5 h-full">
        <div className="flex gap-4 justify-center my-20">
          <img src="./icon.png" className="h-24" />
        </div>
        <div className="text-center">
          <p className="text-primary-12 font-light">
            Sign in to access your account
          </p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginFormValidationSchema}
            onSubmit={(values) => handleOnSubmit(values)}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-10 w-72 mx-auto">
                  <div className="my-3">
                    <Field name="email" label="อีเมล์" placeholder="อีเมล์" />
                  </div>
                  <div>
                    <Field
                      name="password"
                      label="รหัสผ่าน"
                      placeholder="รหัสผ่าน"
                      type="password"
                    />
                  </div>

                  <p
                    className="font-light text-end text-xs"
                    onClick={() => navigate(UNPROTECTED_PATH.REGISTER)}
                  >
                    Have no account?{" "}
                    <span className="cursor-pointer text-primary hover:text-primary-2">
                      Register Account
                    </span>
                  </p>
                  <button
                    type="submit"
                    className="text-primary-linear text-white font-semibold py-2 w-full my-5 rounded-full"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <a
        className="absolute bottom-5 right-10 text-xs"
        href="https://storyset.com/online"
      >
        Online illustrations by Storyset
      </a>
    </div>
  );
};
export default Login;

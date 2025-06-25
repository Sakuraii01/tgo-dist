import { UserService } from "../../service/api/user";
import type { Login } from "../../service/api/user/type";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const useViewModel = () => {
  const userService = new UserService();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleOnSubmit = async (entity: Login) => {
    await userService
      .reqPostLogin(entity)
      .then((res) => {
        if (res?.token && res?.user) {
          auth?.setCredential(res);
        } else {
          console.warn("Invalid login response", res.data);
        }
        navigate(PROTECTED_PATH.SELECT_CBAM_CFP, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { handleOnSubmit };
};
export default useViewModel;

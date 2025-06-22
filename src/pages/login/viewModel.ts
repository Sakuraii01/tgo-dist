import { UserService } from "../../service/api/user";
import type { Login } from "../../service/api/user/type";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
const useViewModel = () => {
  const userService = new UserService();
  const auth = useAuth();
  const handleOnSubmit = async (entity: Login) => {
    await userService
      .reqPostLogin(entity)
      .then((res) => {
        // console.log(res);

        if (res?.token && res?.user) {
          auth?.setCredential({
            message: res?.message ?? "",
            token: res.token,
            user: res.user,
          });
        } else {
          console.warn("Invalid login response", res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { handleOnSubmit };
};
export default useViewModel;

import { UserService } from "../../service/api/user";
import type { Login } from "../../service/api/user/type";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";

const useViewModel = () => {
  const userService = new UserService();
  const auth = useAuth();
  const [passWrong, setPassWrong] = useState(false);
  const handleOnSubmit = async (entity: Login) => {
    await userService
      .reqPostLogin(entity)
      .then((res) => {
        if (res?.token && res?.user) {
          auth?.setCredential(res);
        } else {
          setPassWrong(true);
        }
      })
      .catch((error) => {
        setPassWrong(true);
        console.log(error);
      });
  };
  return { handleOnSubmit, passWrong };
};
export default useViewModel;

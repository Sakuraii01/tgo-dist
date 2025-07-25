import { createContext, useState } from "react";
import type { UserLoginInfo } from "../service/api/user/type";
interface AuthContextType {
  user: UserLoginInfo | null;
  setCredential: (user: UserLoginInfo) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLoginInfo | null>(
    JSON.parse(JSON.stringify(localStorage.getItem("user_account")))
  );
  function setCredential(user: UserLoginInfo) {
    setUser(user);
    localStorage.setItem("user_account", JSON.stringify(user));
    const storedToken = localStorage.getItem("user_account");
    console.log(storedToken);
  }

  return (
    <AuthContext.Provider value={{ user, setCredential }}>
      {children}
    </AuthContext.Provider>
  );
};

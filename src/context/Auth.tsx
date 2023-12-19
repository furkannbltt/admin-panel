import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import getUser from "../utils/storageHelper";
import { AuthDto } from "../services/auth/types";
export const AuthContext = createContext<any>(null);

interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  userInfo: AuthDto | null;
  setUserInfo: (userInfo: AuthDto) => void;
}

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(getUser()?.token?.accessToken);
  const [userInfo, setUserInfo] = useState<AuthDto | null>(getUser());

  return (
    <AuthContext.Provider
      value ={{
        token,
        setToken,
        setUserInfo,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
AuthProvider.defaultProps = {
  defaultToken: null,
};

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export default AuthProvider;

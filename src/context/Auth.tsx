import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import getUser from "../utils/storageHelper";
import { AuthDto } from "../services/auth/types";
import { ClaimModel } from "../pages/users/types";
import { getClaimsInTheUserQuery } from "../services/claims/claims";
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
  const [userClaimList, setUserClaimList] = useState<ClaimModel[] | null>(null);

  useEffect(() => {
    const fetchUserClaims = async () => {
      try {
        const response = await getClaimsInTheUserQuery(userInfo?.id!);
        setUserClaimList(response);
      } catch (error) {
        console.error("Error fetching user claims:", error);
      }
    };

    if (userInfo) {
      fetchUserClaims();
    }
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        userClaimList,
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

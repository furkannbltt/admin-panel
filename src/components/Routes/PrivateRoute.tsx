import { FC, ReactNode, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

interface IRouteProps {
  children: ReactNode;
  permissions?: string[];
}

const PrivateRoute: FC<IRouteProps> = ({ children, permissions }) => {
  const { userInfo } = useContext(AuthContext);

  const isAuthenticated = useMemo(() => !!userInfo, [userInfo]);

  if (
    isAuthenticated
    //  &&
    // (!permissions ||
    //   permissions?.includes(loggedInUserData?.role || UserRoleTypes.Standart))
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;

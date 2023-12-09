import { FC, ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";

interface IRouteProps {
  children: ReactNode;
  permissions?: string[];
}

const PrivateRoute: FC<IRouteProps> = ({ children, permissions }) => {
    const loggedInUserData=true
  const isAuthenticated = useMemo(() => !!loggedInUserData, [loggedInUserData]);

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

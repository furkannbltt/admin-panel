import { FC, ReactNode, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { ClaimModel } from "../../pages/users/types";
import LoadingPage from "../LoadingPage";
import { toast } from "react-toastify";
import Layout from "../Layout";

interface IRouteProps {
  children: ReactNode;
  permissions?: string[];
}

const PrivateRoute: FC<IRouteProps> = ({ children, permissions }) => {
  const { userInfo, userClaimList } = useContext(AuthContext);
  const isAuthenticated = useMemo(() => !!userInfo, [userInfo]);

  if (!userClaimList && isAuthenticated) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    if (
      !permissions ||
      permissions.some((permission) =>
        userClaimList!
          .map((claim: ClaimModel) => claim.name)
          .includes(permission)
      )
    ) {
      return <Layout>{children}</Layout>;
    } else {
      toast.error("Bu sayfa için izin bulunamadı.");
      return (
        <Layout>
          <></>
        </Layout>
      );
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;

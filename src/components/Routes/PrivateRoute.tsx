import { FC, ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { ClaimModel } from "../../pages/users/types";
// import { getClaimsInTheUserQuery } from "../../services/claims/claims";
import { PermissonsType } from "../../models/models";
import LoadingPage from "../LoadingPage";
// import { getUsers } from "../../services/users/users";

interface IRouteProps {
  children: ReactNode;
  permissions?: string[];
}

const PrivateRoute: FC<IRouteProps> = ({ children, permissions }) => {
  const { userInfo } = useContext(AuthContext);
  const [userClaimList, setUserClaimList] = useState<ClaimModel[] | null>(null);
  const isAuthenticated = useMemo(() => !!userInfo, [userInfo]);

  useEffect(() => {
    const fetchUserClaims = async () => {
      try {
        // const response = await getUsers();
        setUserClaimList([
          { name: PermissonsType.Activity, id: 1 },
          { name: PermissonsType.City, id: 14 },
          { name: PermissonsType.Users, id: 12 },
          { name: PermissonsType.Airport, id: 1 },
          { name: PermissonsType.Terminal, id: 14 },
          { name: PermissonsType.Hotel, id: 12 },
          { name: PermissonsType.Group, id: 12 },
        ]);
      } catch (error) {
        console.error("Error fetching user claims:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserClaims();
    }
  }, [isAuthenticated, userInfo]);

  if (!userClaimList && isAuthenticated) {
    return <LoadingPage />;
  }

  if (
    isAuthenticated &&
    (!permissions ||
      permissions.some((permission) =>
        userClaimList!.map((claim) => claim.name).includes(permission)
      ))
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;

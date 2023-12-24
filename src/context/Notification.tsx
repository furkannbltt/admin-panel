import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { NotificationModel } from "../components/Notifications/types";
export const NofiticationContext = createContext<any>(null);

interface INotificationContext {
  notificationList: string;
  setNotificationList: (value: NotificationModel[]) => void;
}

const NotificationProvider = ({ children }: any) => {
  const [notificationList, setNotificationList] = useState<NotificationModel[]>(
    []
  );
  return (
    <NofiticationContext.Provider
      value={{
        notificationList,
        setNotificationList,
      }}
    >
      {children}
    </NofiticationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
NotificationProvider.defaultProps = {
  defaultToken: null,
};

export const useAuth = (): INotificationContext => {
  return useContext(NofiticationContext);
};

export default NotificationProvider;

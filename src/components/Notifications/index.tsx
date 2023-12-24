import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Modal, Badge, Button } from "antd";
import * as signalR from "@microsoft/signalr";
import getUser from "../../utils/storageHelper";
import { toast } from "react-toastify";
import "./style.scss";
import NotificationItem from "./NotificationItem";
import { NofiticationContext } from "../../context/Notification";
import { NotificationModel } from "./types";

const NotificationComponent = () => {
  const userInfo = getUser();
  const { notificationList, setNotificationList } =
    useContext(NofiticationContext);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<
    signalR.HubConnection | undefined
  >(undefined);

  const fetchNotifications = useCallback(async () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      await connection
        .invoke("GetNotifications", userInfo?.id.toString())
        .then((notifications) => {
          if (notifications.length) {
            setIsNewNotification(true);
            setTimeout(() => {
              setIsNewNotification(false);
            }, 3000);
          }
          setNotificationList(notifications);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, userInfo?.id]);

  const deleteNotification = (notificationId: number) => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection
        .invoke("DeleteNotification", notificationId.toString())
        .then(() => {
          const currentNotification = notificationList.filter(
            (notification: NotificationModel) =>
              notification.id !== notificationId
          );
          setNotificationList(currentNotification);
          if (!currentNotification.length) {
            setModalVisible(false);
          }
          toast.success("Mesajınız silindi!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection
        .invoke("ReadNotification")
        .then((e) => {
          console.log(e);
          // setNotificationList((prevNotifications) =>
          //     prevNotifications.map((notification) =>
          //         notification.id === notificationId
          //             ? { ...notification, isRead: true }
          //             : notification
          //     )
          // );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_BASE_URL}notificationHub`, {
        accessTokenFactory: () => userInfo?.token.accessToken!,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveMessage", (user, message) => {
      newConnection
        .invoke("GetNotifications", userInfo?.id.toString())
        .then((notifications) => {
          setIsNewNotification(true);
          setNotificationList(notifications);
          setTimeout(() => {
            setIsNewNotification(false);
          }, 3000);
        })
        .catch((err) => console.error(err));
    });

    setConnection(newConnection);

    return () => {
      if (newConnection.state === signalR.HubConnectionState.Connected) {
        newConnection.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id, userInfo?.token.accessToken]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(async () => {
          setLoading(true);
          await fetchNotifications();
          setLoading(false);
        })
        .catch((err) =>
          console.error("Error starting SignalR connection:", err)
        );
    }
  }, [connection, fetchNotifications]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <Fragment>
      {/* {!!notificationList.length && ( */}
      <Badge
        className={!loading && isNewNotification ? "bounce" : ""}
        count={notificationList.length}
      >
        <Button
          className={!loading && isNewNotification ? "bell" : ""}
          loading={loading}
          icon={<BellOutlined />}
          onClick={showModal}
          type="text"
        />
      </Badge>
      {/* )} */}
      <Modal
        title="Bildirimler"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        width={500}
      >
        {notificationList.map((notification: NotificationModel) => (
          <NotificationItem
            key={notification.id}
            data={notification}
            onDelete={deleteNotification}
            onRead={markNotificationAsRead}
          />
        ))}
      </Modal>
    </Fragment>
  );
};

export default NotificationComponent;

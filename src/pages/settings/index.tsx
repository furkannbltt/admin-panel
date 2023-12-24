import React, { Fragment, useContext, useLayoutEffect, useState } from "react";
import { Button, Avatar, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditProfileModal from "./components/EditModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { UserModel, UpdateUserModel, ChangePasswordModel } from "./types";
import getUser, { setUser } from "../../utils/storageHelper";
import "./style.scss";
import { getInitials } from "../../utils/helper";
import ContentHeader from "../../components/ContentHeader";
import { changePasswordUser, editUser } from "../../services/users/users";
import { AuthDto } from "../../services/auth/types";
import { AuthContext } from "../../context/Auth";
import { NofiticationContext } from "../../context/Notification";
import NotificationListTable from "./components/NotificationListTable";

const SettingsPage: React.FC = () => {
  const { notificationList } = useContext(NofiticationContext);

  const [userInfo, setUserInfo] = useState<UserModel>({
    id: 0,
    email: "",
    name: "",
    imageUrl: "",
  });
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const { setUserInfo: setUserContext } = useContext(AuthContext);

  const handleEditProfileOk = async (values: UpdateUserModel) => {
    try {
      await editUser(values);
      const currentUser = {
        ...userInfo!,
        name: values.name,
        email: values.email,
      };
      setUserInfo(currentUser);
      setUserContext(currentUser);
      setUser(currentUser as AuthDto);
      setEditProfileVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePasswordOk = async (values: ChangePasswordModel) => {
    try {
      await changePasswordUser(values);
    } catch (error) {
      console.log(error);
    }
    setChangePasswordVisible(false);
  };

  useLayoutEffect(() => {
    const userInfo = getUser();
    setUserInfo(userInfo as UserModel);
  }, []);

  return (
    <Fragment>
      <div className="settings-page">
        <div className="profile-section-wrapper">
          <ContentHeader title="Ayarlar" />
          <div className="profile-section">
            <Avatar size={100}>{getInitials(userInfo.name)}</Avatar>
            <div className="profile-details">
              <span className="name">{userInfo.name}</span>
              <Tooltip title="Profili Düzenle">
                <Button
                  type="default"
                  onClick={() => setEditProfileVisible(true)}
                  icon={<EditOutlined />}
                />
              </Tooltip>
            </div>
            <div className="footer">
              <Button
                type="primary"
                onClick={() => setChangePasswordVisible(true)}
              >
                Şifre Değiştir
              </Button>
              <Popconfirm
                title="Silmek istediğinize emin misiniz?"
                onConfirm={() => setChangePasswordVisible(true)}
                okText="Evet"
                cancelText="Hayır"
              >
                <Button danger type="primary" icon={<DeleteOutlined />}>
                  Hesabımı Sil
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>

        <div className="notification-section">
          <ContentHeader title="Bildirimler" />

          <NotificationListTable notifications={notificationList} />
        </div>
        <EditProfileModal
          visible={editProfileVisible}
          onCancel={() => setEditProfileVisible(false)}
          onOk={handleEditProfileOk}
          initialValues={userInfo}
        />

        <ChangePasswordModal
          visible={changePasswordVisible}
          onCancel={() => setChangePasswordVisible(false)}
          onOk={handleChangePasswordOk}
        />
      </div>
    </Fragment>
  );
};

export default SettingsPage;

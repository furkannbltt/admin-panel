import React, { useContext, useState } from "react";
import { Layout as AntLayout, Avatar, Button, Tooltip, theme } from "antd";
import Sidebar from "../SideBar";
import Header from "../Header";
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/Auth";
import { removeUser } from "../../utils/storageHelper";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";
import "./style.scss";
import NotificationComponent from "../Notifications";

const { Sider, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={!collapsed}
        style={{ background: colorBgContainer }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <AntLayout style={{ height: "100vh" }}>
        <Header>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div className="header-right-section">
              {/* <Space size="middle"> */}
              <div className="avatar-container">
                {/* {!userInfo.imageUrl ? ( */}
                <Avatar style={{ background: "#1677ff" }} shape="square">
                  {getInitials(userInfo.name)}
                </Avatar>
                {/* ) : (
                <Avatar
                  style={{ background: "#1677ff" }}
                  shape="square"
                  src={userInfo.imageUrl}
                  alt={userInfo.username}
                />
              )} */}
              </div>
              <span className="user-name">{userInfo?.name}</span>
              <Tooltip title="Ayarlar">
                <Button
                  type="text"
                  onClick={() => {
                    navigate("/settings");
                  }}
                  icon={<SettingOutlined />}
                />
              </Tooltip>
              <NotificationComponent/>
              <Tooltip title="Çıkış Yap">
                <Button
                  type="text"
                  onClick={() => {
                    removeUser();
                    navigate("/login");
                  }}
                  icon={<LoginOutlined />}
                />
              </Tooltip>
              {/* </Space> */}
            </div>
          </div>
        </Header>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 24,
            height: "100%",
            // background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              overflow: "auto",
              maxWidth: "100%",
            }}
          >
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;

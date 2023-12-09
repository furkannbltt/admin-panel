import React, { useState } from "react";
import { Layout as AntLayout, Button, theme } from "antd";
import Sidebar from "../SideBar";
import Header from "../Header";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider, Content } = AntLayout;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
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

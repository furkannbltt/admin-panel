import React from 'react';
import { Layout, theme } from 'antd';

const { Header: AntHeader } = Layout;

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return <AntHeader style={{ padding: 0, background: colorBgContainer }} >
        {children}
    </AntHeader>
};

export default Header;

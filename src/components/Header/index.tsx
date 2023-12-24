import React from 'react';
import { Layout } from 'antd';
import "./style.scss"
const { Header: AntHeader } = Layout;

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {

    return <AntHeader className='header-container' style={{ padding: 0, background: "#001529" }} >
        {children}
    </AntHeader>
};

export default Header;

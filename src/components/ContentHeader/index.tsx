import React, { ReactNode } from "react";
import "./style.scss";
import Title from "antd/es/typography/Title";

interface HeaderProps {
  title: ReactNode;
  actions?: ReactNode;
}

const ContentHeader: React.FC<HeaderProps> = ({ title, actions }) => {
  return (
    <div className="header-wrapper">
      <Title level={2}>{title}</Title>
      {actions && <div>{actions}</div>}
    </div>
  );
};

export default ContentHeader;

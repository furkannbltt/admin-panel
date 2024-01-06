import React from "react";
import { Result } from "antd";

const NotAccessPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Üzgünüz, bu sayfaya erişim yetkiniz yok."
  />
);

export default NotAccessPage;

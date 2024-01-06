import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil."
      extra={
        <Button type="primary" onClick={() => navigate("/activity")}>
          Geri Dön
        </Button>
      }
    />
  );
};

export default NotPage;

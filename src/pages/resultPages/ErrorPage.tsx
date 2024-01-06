import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüm, bir şeyler ters gitti."
      extra={
        <Button type="primary" onClick={() => navigate("/activity")}>
          Geri Dön
        </Button>
      }
    />
  );
};

export default ErrorPage;

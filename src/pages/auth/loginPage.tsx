import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import { login } from "../../services/auth/auth";
import { setUser } from "../../utils/storageHelper";
import { AuthContext } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    await login(values.email, values.password).then((response) => {
      if (response?.data) {
        setUser(response.data);
        setUserInfo(response.data);
        navigate("/activity");
      }
    });
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <img src="biglogo.png" alt="turcotravel" className="logo" />
          <Typography.Title level={1}>Hoşgeldiniz</Typography.Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Lütfen e-posta adresinizi girin!",
              },
              {
                type: "email",
                message: "Lütfen geçerli bir e-posta adresi girin!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-posta" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi girin!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Beni Hatırla</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Giriş Yap
            </Button>
          </Form.Item>

          <Typography.Text>
            Henüz hesabınız yok mu?
            <Button type="link" onClick={handleRegisterClick}>
              Kayıt Ol
            </Button>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

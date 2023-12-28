import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./style.scss";
import { register } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (values.password !== values.confirmPassword) {
      setPasswordError("Şifreler eşleşmiyor. Lütfen tekrar deneyin.");
      return;
    }

    if (!passwordRegex.test(values.password)) {
      setPasswordError(
        "Şifre en az bir büyük harf, bir küçük harf ve bir sayı içermelidir. Minimum 6 karakter uzunluğunda olmalıdır."
      );
      return;
    }

    setPasswordError(null);

    try {
      setLoading(true);
      await register(values.name, values.email, values.password);

      navigate("/activity");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register">
        <Form
          name="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <img src="biglogo.png" alt="turcotravel" className="logo" />

          <Typography.Title level={1}>Kayıt Ol</Typography.Title>

          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Lütfen adınızı girin!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Adınız" />
          </Form.Item>

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
            <Input prefix={<MailOutlined />} placeholder="E-posta" />
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

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi tekrar girin!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifreyi Tekrar Girin"
            />
          </Form.Item>

          {/* Hata mesajlarını göster */}
          {passwordError && (
            <Typography.Text type="danger">{passwordError}</Typography.Text>
          )}

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Beni Hatırla</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
              loading={loading}
            >
              Kayıt Ol
            </Button>
          </Form.Item>

          <Typography.Text>
            Zaten hesabınız var mı?
            <Button type="link" onClick={handleLoginClick}>
              Giriş Yap
            </Button>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

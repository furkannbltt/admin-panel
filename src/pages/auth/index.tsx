// src/components/LoginPage.tsx
import React from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss'; // Sass dosyanızı import edin

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Alınan değerler:', values);
    // Burada login işlemleri yapılabilir
  };

  return (
    <div className="login-container">
      <div className="login">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={1}>Hoşgeldiniz</Typography.Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Lütfen e-posta adresinizi girin!',
              },
              {
                type: 'email',
                message: 'Lütfen geçerli bir e-posta adresi girin!',
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
                message: 'Lütfen şifrenizi girin!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Beni Hatırla</Checkbox>
            </Form.Item>

            <a href="/">Şifremi Unuttum</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

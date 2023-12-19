
import React from "react";
import { Modal, Form, Input } from "antd";
import { ChangePasswordModel } from "../../types";

interface ChangePasswordModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: ChangePasswordModel) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Şifre Değiştir"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Değiştir"
      cancelText="İptal"
    >
      <Form
        form={form}
        name="change_password_form"
        layout="vertical"
        onFinish={onOk}
        initialValues={{
          oldPassword: "",
          newPassword: "",
        }}
      >
        <Form.Item
          name="oldPassword"
          label="Eski Şifre"
          rules={[
            {
              required: true,
              message: "Lütfen eski şifrenizi girin",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Yeni Şifre"
          rules={[
            {
              required: true,
              message: "Lütfen yeni şifrenizi girin",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;

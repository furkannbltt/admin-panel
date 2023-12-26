import React from "react";
import { Modal, Form, Input } from "antd";
import { UpdateUserModel, UserModel } from "../../types";

interface EditProfileModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: UpdateUserModel) => void;
  initialValues: UserModel;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Profil Düzenle"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form
        form={form}
        name="profile_form"
        layout="vertical"
        onFinish={onOk}
        initialValues={{
          name: initialValues.name,
          email: initialValues.email,
        }}
      >
        <Form.Item
          name="name"
          label="Adınız"
          rules={[
            {
              required: true,
              message: "Lütfen adınızı girin",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-posta Adresiniz"
          rules={[
            {
              required: true,
              message: "Lütfen e-posta adresinizi girin",
            },
            {
              type: "email",
              message: "Lütfen geçerli bir e-posta adresi girin",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;

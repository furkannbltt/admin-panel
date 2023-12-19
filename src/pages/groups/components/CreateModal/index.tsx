import React from "react";
import { Modal, Form, Input } from "antd";
import { CreateGroupModel } from "../../types";

interface GroupCreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateGroupModel) => void;
}

const GroupCreateModal: React.FC<GroupCreateModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Grup Ekle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk(values);
          form.resetFields();
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Oluştur"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="group_form">
        <Form.Item
          name="name"
          label="Grup Adı"
          rules={[
            {
              required: true,
              message: 'Lütfen grup adını girin!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupCreateModal;
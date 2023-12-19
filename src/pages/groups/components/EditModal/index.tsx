import React from "react";
import { Modal, Form, Input } from "antd";
import { GroupModel } from "../../types";

interface GroupEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: GroupModel) => void;
  initialValues?: GroupModel;
}

const GroupEditModal: React.FC<GroupEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Grup Düzenle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({ ...initialValues, ...values });
          form.resetFields();
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="group_edit_form">
        <Form.Item
          name="name"
          label="Grup Adı"
          initialValue={initialValues?.name}
          rules={[
            {
              required: true,
              message: "Lütfen grup adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupEditModal;

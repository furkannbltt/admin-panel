import React from "react";
import {
  Modal,
  Form,
  Input,
} from "antd";
import { AddActivitiesVisitModel } from "../../types";

interface CreateVisitModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: AddActivitiesVisitModel) => void;
}
const CreateVisitModal: React.FC<CreateVisitModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onOk({ ...values, isActive: true });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Visit Oluştur"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="create_visit_form">

        <Form.Item
          name="name"
          label="İsim"
          rules={[
            {
              required: true,
              message: "Lütfen isim giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Açıklama"
          rules={[
            {
              required: true,
              message: "Lütfen açıklama giriniz!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateVisitModal;

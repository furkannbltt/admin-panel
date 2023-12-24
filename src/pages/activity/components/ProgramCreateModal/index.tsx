import React from "react";
import {
  Modal,
  Form,
  Input,
} from "antd";
import { AddActivitiesProgramModel } from "../../types";

interface CreateProgramModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: AddActivitiesProgramModel) => void;
}
const CreateProgramModal: React.FC<CreateProgramModalProps> = ({
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
      title="Program Oluştur"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="create_program_form">

        <Form.Item
          name="title"
          label="Başlık"
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

export default CreateProgramModal;

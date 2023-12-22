import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { Hotel } from "../../types";

interface EditHotelModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: Hotel) => void;
  initialValues: Hotel | null;
}

const EditHotelModal: React.FC<EditHotelModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk({ ...initialValues, ...values });
      form.resetFields();
    } catch (error) {
      console.error("Validation failed", error);
    }
  };

  return (
    <Modal
      title="Otel Düzenle"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Adı"
          rules={[{ required: true, message: "Lütfen otel adını girin" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Açıklama"
          rules={[
            { required: true, message: "Lütfen otel açıklamasını girin" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Fiyat"
          rules={[
            { required: true, message: "Lütfen otel fiyatını girin" },
            {
              type: "number",
              min: 1,
              message: "Fiyat sıfırdan yüksel olmalıdır!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditHotelModal;

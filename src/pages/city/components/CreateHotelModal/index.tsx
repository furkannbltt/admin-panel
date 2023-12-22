// CreateHotelModal.tsx

import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { CreateHotelModel } from "../../types";

interface CreateHotelModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateHotelModel) => void;
}

const CreateHotelModal: React.FC<CreateHotelModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Otel Ekle"
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
      okText="Ekle"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="hotel_form">
        <Form.Item
          name="name"
          label="Otel Adı"
          rules={[
            {
              required: true,
              message: "Lütfen otel adını girin!",
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
              message: "Lütfen otel açıklamasını girin!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Fiyat"
          initialValue={0}
          rules={[
            {
              required: true,
              type: "number",
              message: "Lütfen geçerli bir fiyat girin!",
            },
            {
              type: "number",
              min: 1,
              message: "Fiyat sıfırdan yüksek olmalı!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateHotelModal;

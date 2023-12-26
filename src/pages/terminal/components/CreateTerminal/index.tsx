import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CreateTerminal } from "../../types";
import { CityModel } from "../../../city/types";

interface CreateTerminalModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateTerminal) => void;
  cities: CityModel[];
}

const CreateTerminalModal: React.FC<CreateTerminalModalProps> = ({
  visible,
  onCancel,
  onOk,
  cities,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onOk(values as CreateTerminal);
      setLoading(false);
    } catch (error) {
      console.error("Validation failed:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Terminal Oluştur"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="İsim"
          rules={[{ required: true, message: "Lütfen terminal adını girin" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Açıklama"
          rules={[{ required: true, message: "Lütfen terminal açıklamasını girin" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="Şehir"
          rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}
        >
          <Select placeholder="Bir şehir seçin">
            {cities.map(city => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTerminalModal;

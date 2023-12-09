import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CreateTerminal } from "../../types";
import { City } from "../../../city/types";

interface CreateTerminalModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateTerminal) => void;
  cities: City[];
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
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error("Validation failed:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Airport"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the airport name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the airport description" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="City"
          rules={[{ required: true, message: "Please select the city" }]}
        >
          <Select placeholder="Select a city">
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

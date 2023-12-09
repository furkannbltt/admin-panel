import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CreateAirport } from "../../types";  // Assuming City type is defined in "../../types"
import { City } from "../../../city/types";

interface CreateAirportModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateAirport) => void;
  cities: City[];
}

const CreateAirportModal: React.FC<CreateAirportModalProps> = ({
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
      onOk(values as CreateAirport);
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

export default CreateAirportModal;

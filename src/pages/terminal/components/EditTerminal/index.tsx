import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Terminal } from "../../types";
import { City } from "../../../city/types";

interface TerminalEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: Terminal) => void;
  initialValues?: Terminal | undefined;
  cities: City[];
}

const TerminalEditModal: React.FC<TerminalEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  cities,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onOk(values as Terminal);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error("Validation failed:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Terminal"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the Terminal name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the Terminal description" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="City"
          rules={[{ required: true, message: "Please select the city" }]}
        >
          <Select placeholder="Select a city">
            {cities.map((city) => (
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

export default TerminalEditModal;

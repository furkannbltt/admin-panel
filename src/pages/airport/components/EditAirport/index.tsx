import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Airport } from "../../types";
import { CityModel } from "../../../city/types";

interface AirportEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: Airport) => void;
  initialValues?: Airport | undefined;
  cities: CityModel[];
}

const AirportEditModal: React.FC<AirportEditModalProps> = ({
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
      onOk({ ...initialValues, ...values } as Airport);
      setLoading(false);
    } catch (error) {
      console.error("Validation failed:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Airport"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="İsim"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Açıklama"
          rules={[
            { required: true, message: "Bu alan zorunludur!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="Şehir"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Select placeholder="Şehir seçin">
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

export default AirportEditModal;

import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CreateAirport } from "../../types";  // Assuming City type is defined in "../../types"
import {  CityModel } from "../../../city/types";

interface CreateAirportModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateAirport) => void;
  cities: CityModel[];
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
      title="Havalimanı Ekle"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="İsim"
          rules={[{ required: true, message: "Please enter the airport name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Açıklama"
          rules={[{ required: true, message: "Please enter the airport description" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="Şehir"
          rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}
        >
          <Select placeholder="Şehir seçin">
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

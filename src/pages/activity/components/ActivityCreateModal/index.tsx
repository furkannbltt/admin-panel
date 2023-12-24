import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateActivityModel } from "../../types";
import { CityModel } from "../../../city/types";

interface CreateActivityModalProps {
  visible: boolean;
  cities: CityModel[];
  onCancel: () => void;
  onOk: (values: CreateActivityModel) => void;
}
const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
  visible,
  cities,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onOk({ ...values, images: selectedImages, isActive: true });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      setSelectedImages((prev) => {
        const newImages = prev ? [...prev, file] : [file];
        return newImages;
      });

      return false;
    },
    multiple: true,
    maxCount: 5,
    type: "drag",
    listType:"picture",
    accept:"image/*"
  };

  return (
    <Modal
      title="Aktivite Oluştur"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="create_activity_form">
        <Form.Item
          name="cityId"
          label="Şehir"
          rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}
        >
          <Select placeholder="Bir şehir seçin">
            {cities.map((city) => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Aktivite İsmi"
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
          name="title"
          label="Başlık"
          rules={[
            {
              required: true,
              message: "Lütfen başlık giriniz!",
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
        <Form.Item
          label="Fiyat"
          name="price"
          initialValue={0}
          rules={[
            { required: true, message: "Bu alan zorunludur" },
            {
              type: "number",
              min: 1,
              message: "Fiyat sıfırdan yüksel olmalıdır!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="images" label="Resimler">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Yükle</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateActivityModal;

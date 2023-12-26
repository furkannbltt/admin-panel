import React, { useEffect, useRef } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import { ActivityModel, UpdateActivityModel } from "../../types";
import { CityModel } from "../../../city/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ActivityEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: UpdateActivityModel) => void;
  initialValues: ActivityModel;
  cities: CityModel[];
}

const ActivityEditModal: React.FC<ActivityEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  cities,
}) => {
  const [form] = Form.useForm();
  const inclusionServicesRef = useRef<ReactQuill>(null);
  const exclusionServicesRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // `initialValues` değiştiğinde, ReactQuill değerlerini set et
    if (inclusionServicesRef.current) {
      inclusionServicesRef.current.getEditor().root.innerHTML =
        initialValues.inclusionServices || "";
    }
    if (exclusionServicesRef.current) {
      exclusionServicesRef.current.getEditor().root.innerHTML =
        initialValues.exclusionServices || "";
    }
  }, [initialValues]);

  return (
    <Modal
      title="Aktivite Düzenle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({ ...initialValues, ...values });
        });
      }}
      onCancel={() => {
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form
        form={form}
        layout="vertical"
        name="activity_form"
        initialValues={{
          ...initialValues,
          cityId: initialValues?.city.id,
        }}
      >
        <Form.Item
          name="cityId"
          label="Şehir"
          rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}
        >
          <Select placeholder="Şehir seçin">
            {cities.map((city) => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Aktivite Adı"
          rules={[
            {
              required: true,
              message: "Lütfen aktivite adını girin!",
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
              message: "Lütfen başlığı girin!",
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
              message: "Lütfen açıklamayı girin!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="inclusionServices"
          label="Dahil olan servisler."
          rules={[
            {
              required: true,
              message: "Zorunlu alandır!",
            },
          ]}
        >
          <ReactQuill
            ref={inclusionServicesRef}
            placeholder="Metin giriniz"
          />
        </Form.Item>
        <Form.Item
          name="exclusionServices"
          label="Dahil olmayan servisler."
          rules={[
            {
              required: true,
              message: "Zorunlu alandır!",
            },
          ]}
        >
          <ReactQuill
            ref={exclusionServicesRef}
            placeholder="Metin giriniz"
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Fiyat"
          rules={[
            {
              required: true,
              message: "Lütfen fiyatı girin!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ActivityEditModal;

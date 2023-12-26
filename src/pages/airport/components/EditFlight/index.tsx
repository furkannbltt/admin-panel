import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { sentDateFormat } from "../../../../utils/helper";
import { AirportFlight } from "../../types";
import { CityModel } from "../../../city/types";

interface EditFlightModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (editedFlight: AirportFlight) => void;
  initialValues: AirportFlight;
  cities: CityModel[];
}

const EditFlightModal: React.FC<EditFlightModalProps> = ({
  visible,
  cities,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const editedFlight: AirportFlight = {
        ...values,
        endDate: sentDateFormat(values.endDate.toString()),
        startDate: sentDateFormat(values.startDate.toString()),
      };
      onOk({ ...initialValues, ...editedFlight });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Uçuş Düzenle"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form
        initialValues={{
          ...initialValues,
          travelTime: initialValues.travelTime,
          startDate: dayjs(initialValues!.startDate),
          endDate: dayjs(initialValues!.endDate),
        }}
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Başlangıç Tarihi"
          name="startDate"
          rules={[{ required: true, message: "Başlangıç tarihi zorunludur." }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Bitiş Tarihi"
          name="endDate"
          rules={[{ required: true, message: "Bitiş tarihi zorunludur." }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            style={{
              width: "100%",
            }}
          />
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
          label="Sefer Saati"
          name="airplaneCode"
          rules={[{ required: true, message: "Sefer Saati zorunludur." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Seyahat Süresi"
          name="travelTime"
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cityId"
          label="Hedef Şehir"
          rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}
        >
          <Select placeholder="Hedef Şehir seçin">
            {cities.map((city) => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="price"
          initialValue={0}
          rules={[
            { required: true, message: "Fiyat zorunludur." },
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
      </Form>
    </Modal>
  );
};

export default EditFlightModal;

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { CreateTerminalVoyagePayload } from "../../types";
import locale from "antd/es/date-picker/locale/tr_TR";
import { calculateTravelTime, sentDateFormat } from "../../../../utils/helper";
import dayjs from "dayjs";
import { CityModel } from "../../../city/types";

interface CreateVoyageModalProps {
  visible: boolean;
  cities: CityModel[];
  onCancel: () => void;
  onOk: (newFlight: CreateTerminalVoyagePayload) => void;
}

const CreateVoyageModal: React.FC<CreateVoyageModalProps> = ({
  visible,
  cities,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();
  const [travelTime, setTravelTime] = useState<string | undefined>(undefined);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload: CreateTerminalVoyagePayload = {
        ...values,
        endDate: sentDateFormat(values.endDate.toString()),
        startDate: sentDateFormat(values.startDate.toString()),
      };
      onOk(payload);
      setTravelTime(undefined);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ travelTime });
  }, [travelTime, form]);

  const handleStartDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    const endDate = form.getFieldValue("endDate");
    if (date && endDate) {
      const calculatedTravelTime = calculateTravelTime(
        date,
        endDate
      ).toString();
      setTravelTime(calculatedTravelTime);
    }
  };

  const handleEndDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    const startDate = form.getFieldValue("startDate");
    if (date && startDate) {
      const calculatedTravelTime = calculateTravelTime(
        startDate,
        date
      ).toString();
      setTravelTime(calculatedTravelTime);
    }
  };

  return (
    <Modal
      title="Yeni Sefer Oluştur"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Oluştur"
      cancelText="İptal"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          travelTime: travelTime,
        }}
      >
        <Form.Item
          label="Başlangıç Tarihi"
          name="startDate"
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
        >
          <DatePicker
            locale={locale}
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            style={{
              width: "100%",
            }}
            onChange={handleStartDateChange}
          />
        </Form.Item>
        <Form.Item
          label="Bitiş Tarihi"
          name="endDate"
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            locale={locale}
            style={{ width: "100%" }}
            onChange={handleEndDateChange}
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
          name="busCode"
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
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
      </Form>
    </Modal>
  );
};

export default CreateVoyageModal;

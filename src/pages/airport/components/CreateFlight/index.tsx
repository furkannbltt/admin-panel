import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import { CreateAirportFlightPayload } from "../../types";
import locale from "antd/es/date-picker/locale/tr_TR";
import { calculateTravelTime, sentDateFormat } from "../../../../utils/helper";
import dayjs from "dayjs";

interface CreateFlightModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (newFlight: CreateAirportFlightPayload) => void;
}

const CreateFlightModal: React.FC<CreateFlightModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();
  const [travelTime, setTravelTime] = useState<string | undefined>(undefined);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload: CreateAirportFlightPayload = {
        ...values,
        endDate: sentDateFormat(values.endDate.toString()),
        startDate: sentDateFormat(values.startDate.toString()),
      };
      onOk(payload);
      form.resetFields();
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
      title="Yeni Uçuş Oluştur"
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
          label="Uçak Kodu"
          name="airplaneCode"
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Seyahat Süresi" name="travelTime">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="price"
          initialValue={0}
          rules={[{ required: true, message: "Bu alan zorunludur" }]}
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

export default CreateFlightModal;

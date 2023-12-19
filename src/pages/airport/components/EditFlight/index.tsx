import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { calculateTravelTime, sentDateFormat } from "../../../../utils/helper";
import { AirportFlight } from "../../types";

interface EditFlightModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (editedFlight: AirportFlight) => void;
  initialValues: AirportFlight;
}

const EditFlightModal: React.FC<EditFlightModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [travelTime, setTravelTime] = useState<string | undefined>(undefined);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const editedFlight: AirportFlight = {
        ...values,
        endDate: sentDateFormat(values.endDate.toString()),
        startDate: sentDateFormat(values.startDate.toString()),
      };
      onOk({ ...initialValues, ...editedFlight });
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

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
      form.setFieldsValue({ travelTime });
    }
  };

  useEffect(() => {
    form.setFieldsValue({ travelTime });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelTime]);

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
      form.setFieldsValue({ travelTime });
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
            onChange={handleStartDateChange}
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
            onChange={handleEndDateChange}
          />
        </Form.Item>
        <Form.Item
          label="Uçak Kodu"
          name="airplaneCode"
          rules={[{ required: true, message: "Uçak kodu zorunludur." }]}
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
          rules={[{ required: true, message: "Fiyat zorunludur." }]}
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

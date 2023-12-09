import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { calculateTravelTime } from "../../../../utils/helper";
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

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      startDate: dayjs(initialValues!.startDate),
      endDate: dayjs(initialValues!.endDate),
    });
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const editedFlight: AirportFlight = {
        ...values,
        startDate: dayjs(values.startDate),
        endDate: dayjs(values.endDate),
        travelTime: calculateTravelTime(
          dayjs(values.startDate),
          dayjs(values.endDate)
        ).toString(),
      };
      onOk(editedFlight);
      form.resetFields();
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
      okText="Oluştur"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical">
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

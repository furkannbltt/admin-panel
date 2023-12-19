import React from "react";
import { Modal, Form, Input } from "antd";
import { CityModel } from "../../types";

interface CityEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CityModel) => void;
  initialValues?: CityModel;
}

const CityEditModal: React.FC<CityEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Şehir Düzenle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({ ...initialValues, ...values });
          form.resetFields();
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
    >
      <Form
        form={form}
        layout="vertical"
        name="city_form"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Şehir Adı"
          rules={[
            {
              required: true,
              message: "Lütfen şehir adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CityEditModal;

import React from "react";
import { Modal, Form, Input } from "antd";
import { ActivitiesVisitModel } from "../../types";

interface VisitEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: ActivitiesVisitModel) => void;
  initialValues?: ActivitiesVisitModel;
}

const VisitEditModal: React.FC<VisitEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Visit Düzenle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({ ...initialValues, ...values });
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
        name="Visit_form"
        initialValues={{ ...initialValues }}
      >
        <Form.Item
          name="name"
          label="İsim"
          rules={[
            {
              required: true,
              message: "Lütfen isim girin!",
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
      </Form>
    </Modal>
  );
};

export default VisitEditModal;

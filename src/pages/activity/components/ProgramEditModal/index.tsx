import React from "react";
import { Modal, Form, Input } from "antd";
import { ActivitiesProgramModel } from "../../types";

interface ProgramEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: ActivitiesProgramModel) => void;
  initialValues?: ActivitiesProgramModel;
}

const ProgramEditModal: React.FC<ProgramEditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Program Düzenle"
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
        name="program_form"
        initialValues={{ ...initialValues }}
      >
        <Form.Item
          name="title"
          label="Başlık"
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

export default ProgramEditModal;

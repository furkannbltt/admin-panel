import React from "react";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SendNotificaitonModel, UserModel } from "../../types";

interface SendMessageModalProps {
  user: UserModel;
  visible: boolean;
  onCancel: () => void;
  onOk: (values: SendNotificaitonModel) => void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  visible,
  user,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`${user.name} kişisine mesaj gönder`}
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({...values, userId:user.id,url:""});
        });
      }}
      onCancel={() => {
        onCancel();
      }}
      okText="Gönder"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="message_form">
        <Form.Item
          name="title"
          label="Başlık"
          rules={[
            {
              required: true,
              message: "Lütfen başlık girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="message"
          label="Mesaj"
          rules={[
            {
              required: true,
              message: "Lütfen mesajınızı girin!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMessageModal;

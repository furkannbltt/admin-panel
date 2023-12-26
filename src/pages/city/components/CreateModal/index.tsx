
import React from 'react';
import { Modal, Form, Input } from 'antd';
import {  CreateCityModel } from '../../types';

interface CityCreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateCityModel) => void;
}

const CityCreateModal: React.FC<CityCreateModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Şehir Ekle"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk({ isActive:true, ...values });
        });
      }}
      onCancel={() => {
        onCancel();
      }}
      okText="Oluştur"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="city_form">
        <Form.Item
          name="name"
          label="Şehir Adı"
          rules={[
            {
              required: true,
              message: 'Lütfen şehir adını girin!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CityCreateModal;

import React from 'react';
import { Modal, Form, Checkbox } from 'antd';
import { GroupModel, UpdateGroupClaimModel } from '../../types';
import './style.scss';
import { ClaimModel } from '../../../users/types';

interface EditGroupClaimModalProps {
  visible: boolean;
  allClaims: ClaimModel[];
  groupClaims: ClaimModel[];
  group: GroupModel;
  onCancel: () => void;
  onOk: (values: UpdateGroupClaimModel) => void;
}

const EditGroupClaimModal: React.FC<EditGroupClaimModalProps> = ({
  visible,
  onCancel,
  onOk,
  group,
  allClaims,
  groupClaims,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({ groupId: group.id, claimId: values.claims || [] }); // groupId'i nasıl alacağınıza bağlı olarak güncelleyebilirsiniz
    });
  };

  const handleSelectAll = (checked: boolean) => {
    form.setFieldsValue({
      claims: checked ? allClaims.map((claim) => claim.id) : [],
    });
  };

  return (
    <Modal
      title={`Grup İzinleri Düzenle: ${group.name}`}
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
          onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
      className="permission-modal"
      width={800}
    >
      <Form
        form={form}
        initialValues={{ claims: groupClaims.map((claim) => claim.id) }}
      >
        <Form.Item
          name="selectAll"
          valuePropName="checked"
          className="select-all-box"
          style={{ marginBottom: 10 }}
        >
          <Checkbox onChange={(e) => handleSelectAll(e.target.checked)}>
            {form.getFieldValue('selectAll') ? 'Tümünü Kaldır' : 'Tümünü Seç'}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="claims"
          label=""
          rules={[
            {
              type: 'array',
            },
          ]}
        >
          <Checkbox.Group
            options={allClaims.map((claim) => ({
              label: claim.name,
              value: claim.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupClaimModal;
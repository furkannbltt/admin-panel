import React from "react";
import { Modal, Form, Checkbox } from "antd";
import "./style.scss";
import { ClaimModel, UpdateUserClaimsModel, UserModel } from "../../../users/types";

interface EditUserClaimModalProps {
  visible: boolean;
  allClaims: ClaimModel[];
  userClaims: ClaimModel[];
  onCancel: () => void;
  onOk: (values: UpdateUserClaimsModel) => void;
  user: UserModel;
}

const EditUserClaimModal: React.FC<EditUserClaimModalProps> = ({
  visible,
  onCancel,
  onOk,
  allClaims,
  userClaims,
  user,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({ userId: user.id, claimId: values.claims || [] });
      form.resetFields();
    });
  };

  const handleSelectAll = (checked: boolean) => {
    form.setFieldsValue({
      claims: checked ? allClaims.map((claim) => claim.id) : [],
    });
  };

  return (
    <Modal
      title={`İzinleri Düzenle: ${user?.name}`}
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Kaydet"
      cancelText="İptal"
      className="permission-modal"
      width={800}
    >
      <Form
        form={form}
        initialValues={{ claims: userClaims.map((claim) => claim.id) }}
      >
        <Form.Item
          name="selectAll"
          valuePropName="checked"
          className="select-all-box"
          style={{ marginBottom: 10 }}
        >
          <Checkbox onChange={(e) => handleSelectAll(e.target.checked)}>
            {form.getFieldValue("selectAll") ? "Tümünü Kaldır" : "Tümünü Seç"}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="claims"
          label=""
          rules={[
            {
              type: "array",
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

export default EditUserClaimModal;

import React from "react";
import { Modal, Form, Checkbox } from "antd";
import "./style.scss";
import { GroupModel, UpdateGroupUsersModel } from "../../types";
import { UserModel } from "../../../users/types";

interface EditGroupUsersModalProps {
  visible: boolean;
  allUsers: UserModel[];
  groupUsers: UserModel[];
  group: GroupModel;
  onCancel: () => void;
  onOk: (values: UpdateGroupUsersModel) => void;
}

const EditGroupUsersModal: React.FC<EditGroupUsersModalProps> = ({
  visible,
  onCancel,
  onOk,
  group,
  allUsers,
  groupUsers,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({ groupId: group.id, userId: values.users || [] }); // groupId'i nasıl alacağınıza bağlı olarak güncelleyebilirsiniz
      form.resetFields();
    });
  };

  const handleSelectAll = (checked: boolean) => {
    form.setFieldsValue({
      users: checked ? allUsers.map((user) => user.id) : [],
    });
  };

  return (
    <Modal
      title={`Grup Kullanıcıları Düzenle: ${group.name}`}
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
        initialValues={{ users: groupUsers.map((user) => user.id) }}
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
          name="users"
          label=""
          rules={[
            {
              type: "array",
            },
          ]}
        >
          <Checkbox.Group
            options={allUsers.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupUsersModal;

import React, { useState, useEffect } from "react";
import { Button, Modal, Tooltip } from "antd";
import { TerminalVoyage, CreateTerminalVoyagePayload } from "../../types";
import TerminalVoyageTable from "../VoyageListTable";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import EditVoyageModal from "../EditVoyage";
import CreateVoyageModal from "../CreateVoyage";
interface TerminalVoyageDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  terminalId: number;
}

const TerminalVoyageDetailModal: React.FC<TerminalVoyageDetailModalProps> = ({
  visible,
  onCancel,
  terminalId,
}) => {
  const [voyages, setVoyages] = useState<TerminalVoyage[]>([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [editModalVoyage, setEditModalVoyage] = useState<
    TerminalVoyage | undefined
  >(undefined);

  useEffect(() => {
    const mockVoyages: TerminalVoyage[] = [
      {
        id: 1,
        startDate: "2023-01-01",
        endDate: "2023-01-02",
        busCode: "ABC123",
        isActive: true,
        travelTime: "2 hours",
        price: 500,
      },
      {
        id: 2,
        startDate: "2023-02-01",
        endDate: "2023-02-02",
        busCode: "XYZ456",
        isActive: false,
        travelTime: "3 hours",
        price: 700,
      },
    ];

    setVoyages(mockVoyages);
  }, [visible, terminalId]);

  const handleEditVoyage = (editedVoyage: TerminalVoyage) => {
    setEditModalVoyage(editedVoyage);
    setVisibleEditModal(true);
  };

  const handleCreateVoyage = (newVoyage: CreateTerminalVoyagePayload) => {
    const newDate: TerminalVoyage = {
      ...newVoyage,
      id: 1,
      isActive: true,
    };
    setVoyages((prevState) => [...prevState, newDate]);
    setVisibleCreateModal(false);
  };
  const handleToggleIsActive = (id: number) => {
    // isActive durumunu değiştirme işlemini burada gerçekleştir
    // ...
  };

  const handleDelete = (id: number) => {
    // Uçuş silme işlemini burada gerçekleştir
    // ...
  };

  const handleCloseModals = () => {
    setVisibleEditModal(false);
    setVisibleCreateModal(false);
  };

  return (
    <Modal
      title="Sefer Detayları"
      visible={visible}
      onCancel={() => {
        handleCloseModals();
        onCancel();
      }}
      footer={null}
      width={1500}
    >
      <div className="action-container">
        <Tooltip title="Sefer ekle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisibleCreateModal(true)}
          />
        </Tooltip>
      </div>
      <TerminalVoyageTable
        onDelete={handleDelete}
        terminalVoyages={voyages}
        onEdit={handleEditVoyage}
        onToggleIsActive={handleToggleIsActive}
      />

      {editModalVoyage && (
        <EditVoyageModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalVoyage(undefined);
            setVisibleEditModal(false);
          }}
          onOk={handleEditVoyage}
          initialValues={editModalVoyage}
        />
      )}

      <CreateVoyageModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateVoyage}
      />
    </Modal>
  );
};

export default TerminalVoyageDetailModal;

import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Tooltip } from "antd";
import { TerminalVoyage, CreateTerminalVoyagePayload } from "../../types";
import TerminalVoyageTable from "../VoyageListTable";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import EditVoyageModal from "../EditVoyage";
import CreateVoyageModal from "../CreateVoyage";
import {
  createTerminalVoyage,
  deleteTerminalVoyage,
  editTerminalVoyage,
  getListVoyageByTerminalId,
} from "../../../../services/terminal/terminal";
import { CityModel } from "../../../city/types";
interface TerminalVoyageDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  terminalId: number;
  cities: CityModel[];
}

const TerminalVoyageDetailModal: React.FC<TerminalVoyageDetailModalProps> = ({
  visible,
  onCancel,
  terminalId,
  cities
}) => {
  const [voyages, setVoyages] = useState<TerminalVoyage[]>([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [editModalVoyage, setEditModalVoyage] = useState<
    TerminalVoyage | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const fetchVoyages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getListVoyageByTerminalId(terminalId);
      setVoyages(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [terminalId]);

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchVoyages();
    };
    if (visible) {
      handleLoadComponent();
    }
  }, [fetchVoyages, visible]);

  const handleEditVoyage = (editedFlight: TerminalVoyage) => {
    setEditModalVoyage(editedFlight);
    setVisibleEditModal(true);
  };

  const onEditVoyage = async (payload: TerminalVoyage) => {
    try {
      setIsLoading(true);
      await editTerminalVoyage(payload);
      const updatedVoyages = voyages.map((voyages) =>
        voyages.id === payload.id ? payload : voyages
      );
      setVoyages(updatedVoyages);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateVoyage = async (newVoyage: CreateTerminalVoyagePayload) => {
    try {
      setIsLoading(true);
      const response = await createTerminalVoyage({
        ...newVoyage,
        terminalId: terminalId,
        isActive: true,
      });
      setVoyages((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleIsActive = async (payload: TerminalVoyage) => {
    try {
      setIsLoading(true);
      await editTerminalVoyage({ ...payload, isActive: !payload.isActive });
      const updatedVoyages = voyages.map((voyage) =>
        voyage.id === payload.id
          ? { ...voyage, isActive: !voyage.isActive }
          : voyage
      );
      setVoyages(updatedVoyages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteTerminalVoyage(id);
      const currentVoyages = voyages.filter((voyage) => voyage.id !== id);
      setVoyages(currentVoyages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
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
        loading={isLoading}
        onDelete={handleDelete}
        terminalVoyages={voyages}
        onEdit={handleEditVoyage}
        onToggleIsActive={handleToggleIsActive}
      />

      {editModalVoyage && (
        <EditVoyageModal
          visible={visibleEditModal}
          cities={cities}
          onCancel={() => {
            setEditModalVoyage(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditVoyage}
          initialValues={editModalVoyage}
          
        />
      )}

      {visibleCreateModal&&<CreateVoyageModal
        visible={visibleCreateModal}
        cities={cities}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateVoyage}
      />}
    </Modal>
  );
};

export default TerminalVoyageDetailModal;

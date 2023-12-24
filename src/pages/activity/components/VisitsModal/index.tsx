import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { ActivitiesVisitModel, AddActivitiesVisitModel } from "../../types";
import VisitListTable from "../VisitListTable";
import VisitEditModal from "../VisitEditModal";
import VisitCreateModal from "../VisitCreateModal";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  addActivityVisit,
  deleteActivityVisit,
  updateActivityVisit,
} from "../../../../services/activity/activity";

interface ActivityVisitDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  visits: ActivitiesVisitModel[];
  activityId: number;
}

const ActivityVisitDetailModal: React.FC<ActivityVisitDetailModalProps> = ({
  visible,
  visits: visitsData,
  activityId,
  onCancel,
}) => {
  const [visits, setVisits] = useState<ActivitiesVisitModel[]>(visitsData);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [editModalVisit, setEditModalVisit] = useState<
    ActivitiesVisitModel | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditVisit = (editedVisit: ActivitiesVisitModel) => {
    setEditModalVisit(editedVisit);
    setVisibleEditModal(true);
  };

  const onEditVisit = async (editedVisit: ActivitiesVisitModel) => {
    try {
      setIsLoading(true);
      await updateActivityVisit(editedVisit);
      const updatedVisits = visits.map((visit) =>
        visit.id === editedVisit.id ? editedVisit : visit
      );
      setVisits(updatedVisits);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateVisit = async (newVisit: AddActivitiesVisitModel) => {
    try {
      setIsLoading(true);
      const response = await addActivityVisit({
        ...newVisit,
        activitiesId: activityId,
      });
      setVisits((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleIsActive = async (payload: ActivitiesVisitModel) => {
    try {
      setIsLoading(true);
      await updateActivityVisit({ ...payload, isActive: !payload.isActive });
      const updatedVisits = visits.map((visit) =>
        visit.id === payload.id
          ? { ...visit, isActive: !visit.isActive }
          : visit
      );
      setVisits(updatedVisits);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteActivityVisit(id);
      const updatedVisits = visits.filter((visit) => visit.id !== id);
      setVisits(updatedVisits);
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
      title="Ziyaret Mekanları"
      visible={visible}
      onCancel={() => {
        handleCloseModals();
        onCancel();
      }}
      footer={null}
      width={1500}
    >
      <div className="visit-action-container">
        <Tooltip title="Mekan Ekle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisibleCreateModal(true)}
          />
        </Tooltip>
      </div>
      <VisitListTable
        loading={isLoading}
        visits={visits}
        onEditVisit={handleEditVisit}
        onDeleteVisit={handleDelete}
        onToggleStatus={handleToggleIsActive}
      />

      {editModalVisit && (
        <VisitEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalVisit(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditVisit}
          initialValues={editModalVisit}
        />
      )}

      {visibleCreateModal && (
        <VisitCreateModal
          visible={visibleCreateModal}
          onCancel={() => setVisibleCreateModal(false)}
          onOk={handleCreateVisit}
        />
      )}
    </Modal>
  );
};

export default ActivityVisitDetailModal;

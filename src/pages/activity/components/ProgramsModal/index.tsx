import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { ActivitiesProgramModel, AddActivitiesProgramModel } from "../../types";
import ProgramListTable from "../ProgramListTable";
import ProgramEditModal from "../ProgramEditModal";
import ProgramCreateModal from "../ProgramCreateModal";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  addActivityProgram,
  deleteActivityProgram,
  updateActivityProgram,
} from "../../../../services/activity/activity";

interface ActivityProgramDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  programs: ActivitiesProgramModel[];
  activityId: number;
}

const ActivityProgramDetailModal: React.FC<ActivityProgramDetailModalProps> = ({
  visible,
  programs: programsData,
  activityId,
  onCancel,
}) => {
  const [programs, setPrograms] = useState<ActivitiesProgramModel[]>(programsData);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [editModalProgram, setEditModalProgram] = useState<
    ActivitiesProgramModel | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
console.log(programsData,"213")
  const handleEditProgram = (editedProgram: ActivitiesProgramModel) => {
    setEditModalProgram(editedProgram);
    setVisibleEditModal(true);
  };

  const onEditProgram = async (editedProgram: ActivitiesProgramModel) => {
    try {
      setIsLoading(true);
      await updateActivityProgram(editedProgram);
      const updatedPrograms = programs.map((program) =>
        program.id === editedProgram.id ? editedProgram : program
      );
      setPrograms(updatedPrograms);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProgram = async (newProgram: AddActivitiesProgramModel) => {
    try {
      setIsLoading(true);
      const response = await addActivityProgram({
        ...newProgram,
        activitiesId: activityId,
      });
      setPrograms((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleIsActive = async (payload: ActivitiesProgramModel) => {
    try {
      setIsLoading(true);
      await updateActivityProgram({ ...payload, isActive: !payload.isActive });
      const updatedPrograms = programs.map((program) =>
        program.id === payload.id
          ? { ...program, isActive: !program.isActive }
          : program
      );
      setPrograms(updatedPrograms);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteActivityProgram(id);
      const updatedPrograms = programs.filter((program) => program.id !== id);
      setPrograms(updatedPrograms);
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
      title="Programlar"
      visible={visible}
      onCancel={() => {
        handleCloseModals();
        onCancel();
      }}
      footer={null}
      width={1500}
    >
      <div className="program-action-container">
        <Tooltip title="Program Ekle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisibleCreateModal(true)}
          />
        </Tooltip>
      </div>
      <ProgramListTable
        loading={isLoading}
        programs={programs}
        onEditProgram={handleEditProgram}
        onDeleteProgram={handleDelete}
        onToggleStatus={handleToggleIsActive}
      />

      {editModalProgram && (
        <ProgramEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalProgram(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditProgram}
          initialValues={editModalProgram}
        />
      )}

      <ProgramCreateModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateProgram}
      />
    </Modal>
  );
};

export default ActivityProgramDetailModal;

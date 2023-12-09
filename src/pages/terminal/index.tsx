import React, { useState, Fragment } from "react";
import { Button } from "antd";
import ContentHeader from "../../components/ContentHeader";
import { Terminal, CreateTerminal } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import TerminalFlightDetailModal from "./components/VoyageModal";
import TerminalListTable from "./components/TerminalListTable";
import TerminalEditModal from "./components/EditTerminal";
import CreateTerminalModal from "./components/CreateTerminal";

const TerminalPage: React.FC = () => {
  const [terminals, setTerminals] = useState<Terminal[]>([
    {
      id: 1,
      name: "Atatürk Terminal",
      description: "International Terminal",
      cityId: 1,
      isActive: true,
    },
    {
      id: 2,
      name: "Esenboğa Terminal",
      description: "Capital City Terminal",
      cityId: 2,
      isActive: true,
    },
  ]);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleFlightModal, setVisibleFlightModal] = useState(false);
  const [editModalTerminal, setEditModalTerminal] = useState<
    Terminal | undefined
  >(undefined);

  const handleEditTerminal = (editedTerminal: Terminal) => {
    setEditModalTerminal(editedTerminal);
    setVisibleEditModal(true);
  };

  const onEditTerminal = (editedTerminal: Terminal) => {};

  const handleToggleIsActive = (id: number) => {};

  const handleDeleteActive = (id: number) => {};

  const handleCreateTerminal = (newData: CreateTerminal) => {
    setVisibleCreateModal(false);
  };

  const onViewTerminalDetails = (data: Terminal) => {
    setEditModalTerminal(data);
    setVisibleFlightModal(true);
  };

  return (
    <Fragment>
      <ContentHeader
        title="Terminaller"
        actions={
          <Button
            type="primary"
            onClick={() => setVisibleCreateModal(true)}
            icon={<PlusOutlined />}
          >
            Terminal Ekle
          </Button>
        }
      />

      <TerminalListTable
        terminals={terminals}
        onEditTerminal={handleEditTerminal}
        onToggleIsActive={handleToggleIsActive}
        onDeleteCity={handleDeleteActive}
        onViewTerminalDetails={onViewTerminalDetails}
      />

      <TerminalEditModal
        visible={visibleEditModal}
        onCancel={() => {
          setEditModalTerminal(undefined);
          setVisibleEditModal(false);
        }}
        onOk={onEditTerminal}
        initialValues={editModalTerminal}
        cities={[]}
      />

      <CreateTerminalModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateTerminal}
        cities={[]}
      />
      <TerminalFlightDetailModal
        visible={visibleFlightModal}
        onCancel={() => setVisibleFlightModal(false)}
        terminalId={editModalTerminal?.id!}
      />
    </Fragment>
  );
};

export default TerminalPage;

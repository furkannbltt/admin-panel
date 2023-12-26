import React, { useState, Fragment, useEffect } from "react";
import { Button } from "antd";
import ContentHeader from "../../components/ContentHeader";
import { Terminal, CreateTerminal } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import TerminalListTable from "./components/TerminalListTable";
import TerminalEditModal from "./components/EditTerminal";
import CreateTerminalModal from "./components/CreateTerminal";
import { CityModel } from "../city/types";
import { getCities } from "../../services/city/city";
import {
  createTerminal,
  deleteTerminal,
  editTerminal,
  getTerminals,
} from "../../services/terminal/terminal";
import TerminalVoyageDetailModal from "./components/VoyageModal";

const TerminalPage: React.FC = () => {
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleFlightModal, setVisibleFlightModal] = useState(false);
  const [editModalTerminal, setEditModalTerminal] = useState<
    Terminal | undefined
  >(undefined);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const response = await getCities();
      setCities(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTerminals = async () => {
    try {
      setIsLoading(true);
      const response = await getTerminals();
      setTerminals(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchTerminals();
      await fetchCities();
    };
    handleLoadComponent();
  }, []);

  const handleEditTerminal = (editedTerminal: Terminal) => {
    setEditModalTerminal(editedTerminal);
    setVisibleEditModal(true);
  };

  const onEditTerminal = async (editedTerminal: Terminal) => {
    try {
      setIsLoading(true);
      await editTerminal(editedTerminal);
      const updatedTerminal = terminals.map((terminal) =>
        terminal.id === editedTerminal.id
          ? { ...terminal, ...editedTerminal }
          : terminal
      );
      setTerminals(updatedTerminal);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleIsActive = async (payload: Terminal) => {
    try {
      setIsLoading(true);
      await editTerminal({ ...payload, isActive: !payload.isActive });
      const updatedTerminal = terminals.map((terminal) =>
        terminal.id === payload.id
          ? { ...terminal, isActive: !terminal.isActive }
          : terminal
      );
      setTerminals(updatedTerminal);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTerminal = async (terminalId: number) => {
    try {
      setIsLoading(true);
      await deleteTerminal(terminalId);
      const currentAirports = terminals.filter(
        (terminal) => terminal.id !== terminalId
      );
      setTerminals(currentAirports);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTerminal = async (newTerminal: CreateTerminal) => {
    try {
      setIsLoading(true);
      const response = await createTerminal({
        ...newTerminal,
        isActive: true,
      });
      setTerminals((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewTerminalDetails = (terminal: Terminal) => {
    setEditModalTerminal(terminal);
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
        loading={isLoading}
        terminals={terminals}
        onEditTerminal={handleEditTerminal}
        onToggleIsActive={handleToggleIsActive}
        onDeleteCity={handleDeleteTerminal}
        onViewTerminalDetails={onViewTerminalDetails}
      />

      {visibleEditModal && (
        <TerminalEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalTerminal(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditTerminal}
          initialValues={editModalTerminal}
          cities={cities}
        />
      )}

      {visibleCreateModal && (
        <CreateTerminalModal
          visible={visibleCreateModal}
          onCancel={() => setVisibleCreateModal(false)}
          onOk={handleCreateTerminal}
          cities={cities}
        />
      )}
      {visibleFlightModal && (
        <TerminalVoyageDetailModal
          visible={visibleFlightModal}
          onCancel={() => setVisibleFlightModal(false)}
          terminalId={editModalTerminal?.id!}
          cities={cities}
        />
      )}
    </Fragment>
  );
};

export default TerminalPage;

import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Tooltip } from "antd";
import { AirportFlight, CreateAirportFlightPayload } from "../../types";
import FlightListTable from "../FlightListTable";
import EditFlightModal from "../EditFlight";
import CreateFlightModal from "../CreateFlight";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  createAirPortFlight as createAirportFlight,
  deleteAirportFlight,
  editFlight,
  getListAirportFlights,
} from "../../../../services/airport/airport";
interface AirportFlightDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  airportId: number;
}

const AirportFlightDetailModal: React.FC<AirportFlightDetailModalProps> = ({
  visible,
  onCancel,
  airportId,
}) => {
  const [flights, setFlights] = useState<AirportFlight[]>([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [editModalFlight, setEditModalFlight] = useState<
    AirportFlight | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlights = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getListAirportFlights(airportId);
      setFlights(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [airportId]);

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchFlights();
    };
    handleLoadComponent();
  }, [fetchFlights]);

  const handleEditFlight = (editedFlight: AirportFlight) => {
    setEditModalFlight(editedFlight);
    setVisibleEditModal(true);
  };

  const onEditFlight = async (editedFlight: AirportFlight) => {
    try {
      setIsLoading(true);
      await editFlight(editedFlight);
      const updatedFlights = flights.map((flight) =>
        flight.id === editedFlight.id ? editedFlight : flight
      );
      setFlights(updatedFlights);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateFlight = async (newFlight: CreateAirportFlightPayload) => {
    try {
      setIsLoading(true);
      const response = await createAirportFlight({
        ...newFlight,
        airportId: airportId,
        isActive: true,
      });
      setFlights((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleIsActive = async(payload: AirportFlight) => {
    try {
      setIsLoading(true);
      await editFlight({ ...payload, isActive: !payload.isActive });
      const updatedFlights = flights.map((flight) =>
        flight.id === payload.id
          ? { ...flight, isActive: !flight.isActive }
          : flight
      );
      setFlights(updatedFlights);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteAirportFlight({
        airportId: airportId,
        flightId: id,
      });
      const currentFlights = flights.filter((flight) => flight.id !== id);
      setFlights(currentFlights);
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
      title="Uçuş Detayları"
      visible={visible}
      onCancel={() => {
        handleCloseModals();
        onCancel();
      }}
      footer={null}
      width={1500}
    >
      <div className="action-container">
        <Tooltip title="Uçuş ekle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisibleCreateModal(true)}
          />
        </Tooltip>
      </div>
      <FlightListTable
        loading={isLoading}
        onDelete={handleDelete}
        airportFligths={flights}
        onEdit={handleEditFlight}
        onToggleIsActive={handleToggleIsActive}
      />

      {editModalFlight && (
        <EditFlightModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalFlight(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditFlight}
          initialValues={editModalFlight}
        />
      )}

      <CreateFlightModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateFlight}
      />
    </Modal>
  );
};

export default AirportFlightDetailModal;

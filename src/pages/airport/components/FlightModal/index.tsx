import React, { useState, useEffect } from "react";
import { Button, Modal, Tooltip } from "antd";
import { AirportFlight, CreateAirportFlightPayload } from "../../types";
import FlightListTable from "../FlightListTable";
import EditFlightModal from "../EditFlight";
import CreateFlightModal from "../CreateFlight";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
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

  useEffect(() => {
    const mockFlights: AirportFlight[] = [
      {
        id: 1,
        startDate: "2023-01-01",
        endDate: "2023-01-02",
        airplaneCode: "ABC123",
        isActive: true,
        travelTime: "2 hours",
        price: 500,
      },
      {
        id: 2,
        startDate: "2023-02-01",
        endDate: "2023-02-02",
        airplaneCode: "XYZ456",
        isActive: false,
        travelTime: "3 hours",
        price: 700,
      },
    ];

    setFlights(mockFlights);
  }, [visible, airportId]);

  const handleEditFlight = (editedFlight: AirportFlight) => {
    setEditModalFlight(editedFlight);
    setVisibleEditModal(true);
  };

  const handleCreateFlight = (newFlight: CreateAirportFlightPayload) => {
    const newDate: AirportFlight = {
      ...newFlight,
      id: 1,
      isActive: true,
    };
    console.log(newDate);
    setFlights((prevState) => [...prevState, newDate]);
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
          onOk={handleEditFlight}
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

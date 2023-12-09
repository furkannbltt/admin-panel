import React, { useState, Fragment } from "react";
import { Button } from "antd";
import ContentHeader from "../../components/ContentHeader";
import { Airport, CreateAirport } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import CreateAirportModal from "./components/CreateAirport";
import AirportEditModal from "./components/EditAirport";
import AirportListTable from "./components/AirportListTable";
import Flights from "./components/FlightListTable";
import AirportFlightDetailModal from "./components/FlightModal";

const AirportPage: React.FC = () => {

  const [airports, setAirports] = useState<Airport[]>([
    {
      id: 1,
      name: "Atatürk Airport",
      description: "International Airport",
      cityId: 1,
      isActive: true,
    },
    {
      id: 2,
      name: "Esenboğa Airport",
      description: "Capital City Airport",
      cityId: 2,
      isActive: true,
    },
  ]);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleFlightModal, setVisibleFlightModal] = useState(false);
  const [editModalAirport, setEditModalAirport] = useState<Airport | undefined>(
    undefined
  );

  const handleEditAirport = (editedAirport: Airport) => {
    setEditModalAirport(editedAirport);
    setVisibleEditModal(true);
  };

  const onEditAirport = (editedAirport: Airport) => {};

  const handleToggleIsActive = (airportId: number) => {
  };

  const handleDeleteActive = (airportId: number) => {
};

  const handleCreateAirport = (newAirport: CreateAirport) => {
    setVisibleCreateModal(false);
  };

  const onViewAirportDetails = (airport: Airport) => {
    setEditModalAirport(airport);
    setVisibleFlightModal(true)
  };

  return (
    <Fragment>
      <ContentHeader
        title="Havalimanları"
        actions={
          <Button
            type="primary"
            onClick={() => setVisibleCreateModal(true)}
            icon={<PlusOutlined />}
          >
            Havalimanı Ekle
          </Button>
        }
      />

      <AirportListTable
        airports={airports}
        onEditAirport={handleEditAirport}
        onToggleIsActive={handleToggleIsActive}
        onDeleteCity={handleDeleteActive}
        onViewAirportDetails={onViewAirportDetails}
      />

      <AirportEditModal
        visible={visibleEditModal}
        onCancel={() => {
          setEditModalAirport(undefined);
          setVisibleEditModal(false);
        }}
        onOk={onEditAirport}
        initialValues={editModalAirport}
        cities={[]}
      />

      <CreateAirportModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateAirport}
        cities={[]}
      />
      <AirportFlightDetailModal
        visible={visibleFlightModal}
        onCancel={() => setVisibleFlightModal(false)}
        airportId={editModalAirport?.id!}
      />
    </Fragment>
  );
};

export default AirportPage;

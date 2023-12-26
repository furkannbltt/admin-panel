import React, { useState, Fragment, useEffect } from "react";
import { Button } from "antd";
import ContentHeader from "../../components/ContentHeader";
import { Airport, CreateAirport } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import CreateAirportModal from "./components/CreateAirport";
import AirportEditModal from "./components/EditAirport";
import AirportListTable from "./components/AirportListTable";
import AirportFlightDetailModal from "./components/FlightModal";
import {
  createAirPort,
  deleteAirport,
  editAirport,
  getAirports,
} from "../../services/airport/airport";
import { getCities } from "../../services/city/city";
import { CityModel } from "../city/types";

const AirportPage: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleFlightModal, setVisibleFlightModal] = useState(false);
  const [editModalAirport, setEditModalAirport] = useState<Airport | undefined>(
    undefined
  );
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

  const fetchAirports = async () => {
    try {
      setIsLoading(true);
      const response = await getAirports();
      setAirports(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchAirports();
      await fetchCities();
    };
    handleLoadComponent();
  }, []);

  const handleEditAirport = (editedAirport: Airport) => {
    setEditModalAirport(editedAirport);
    setVisibleEditModal(true);
  };

  const onEditAirport = async (editedAirport: Airport) => {
    try {
      setIsLoading(true);
      await editAirport(editedAirport);
      const updatedAirports = airports.map((airport) =>
        airport.id === editedAirport.id
          ? { ...airport, ...editedAirport }
          : airport
      );
      setAirports(updatedAirports);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleIsActive = async (payload: Airport) => {
    try {
      setIsLoading(true);
      await editAirport({ ...payload, isActive: !payload.isActive });
      const updatedAirports = airports.map((airport) =>
        airport.id === payload.id
          ? { ...airport, isActive: !airport.isActive }
          : airport
      );
      setAirports(updatedAirports);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAirport = async (airportId: number) => {
    try {
      setIsLoading(true);
      await deleteAirport(airportId);
      const currentAirports = airports.filter(
        (airport) => airport.id !== airportId
      );
      setAirports(currentAirports);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAirport = async (newAirport: CreateAirport) => {
    try {
      setIsLoading(true);
      const response = await createAirPort({
        ...newAirport,
        isActive: true,
      });
      setAirports((prevState) => [...prevState, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewAirportDetails = (airport: Airport) => {
    setEditModalAirport(airport);
    setVisibleFlightModal(true);
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
        loading={isLoading}
        airports={airports}
        onEditAirport={handleEditAirport}
        onToggleIsActive={handleToggleIsActive}
        onDeleteCity={handleDeleteAirport}
        onViewAirportDetails={onViewAirportDetails}
      />

      {visibleEditModal && (
        <AirportEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setEditModalAirport(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onEditAirport}
          initialValues={editModalAirport}
          cities={cities}
        />
      )}

      {visibleCreateModal && (
        <CreateAirportModal
          visible={visibleCreateModal}
          onCancel={() => setVisibleCreateModal(false)}
          onOk={handleCreateAirport}
          cities={cities}
        />
      )}
      {visibleFlightModal && (
        <AirportFlightDetailModal
          visible={visibleFlightModal}
          onCancel={() => setVisibleFlightModal(false)}
          airportId={editModalAirport?.id!}
          cities={cities}
        />
      )}
    </Fragment>
  );
};

export default AirportPage;

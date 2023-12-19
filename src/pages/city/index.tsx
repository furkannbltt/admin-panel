import React, { useState, Fragment, useEffect } from "react";
import { Button } from "antd";
import CityListTable from "./components/CityListTable";
import CityEditModal from "./components/EditModal";
import CreateHotelModal from "./components/CreateHotelModal";
import ContentHeader from "../../components/ContentHeader";
import CityCreateModal from "./components/CreateModal";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { CityModel, CreateCityModel, CreateHotelModel } from "./types";
import {
  createCity,
  deleteCity,
  editCity,
} from "../../services/city/city";
import { getCities } from "./../../services/city/city";
import { createCityHotel } from "../../services/hotel/hotel";

const CityPage: React.FC = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState<CityModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleCreateHotelModal, setVisibleCreateHotelModal] = useState(false);
  const [selectedModalCity, setSelectedModalCity] = useState<
    CityModel | undefined
  >(undefined);

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

  const handleEditCity = (editedCity: CityModel) => {
    setSelectedModalCity(editedCity);
    setVisibleEditModal(true);
  };

  const handleDeleteCity = async (cityId: number) => {
    try {
      setIsLoading(true);
      await deleteCity(cityId);
      const currentCities = cities.filter((city) => city.id !== cityId);
      setCities(currentCities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddHotel = (city: CityModel) => {
    setSelectedModalCity(city);
    setVisibleCreateHotelModal(true);
  };

  const handleCreateCity = async (newCity: CreateCityModel) => {
    try {
      setIsLoading(true);
      const response = await createCity(newCity);
      setCities([...cities, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateHotel = async (payload: CreateHotelModel) => {
    try {
      setIsLoading(true);
      await createCityHotel({
        ...payload,
        cityId: selectedModalCity?.id!,
        isActive: true,
      });
      setVisibleCreateHotelModal(false);
      setSelectedModalCity(undefined);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onCityEdit = async (payload: CityModel) => {
    try {
      setIsLoading(true);
      await editCity(payload);
      const updatedCities = cities.map((city) =>
        city.id === payload.id ? { ...city, ...payload } : city
      );
      setCities(updatedCities);
      setSelectedModalCity(undefined);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewAllHotels = (city: CityModel) => {
    navigate(`/hotel/${city.name}/${city.id}`);
  };

  const handleToggleIsActive = async (payload: CityModel) => {
    try {
      setIsLoading(true);
      await editCity({ ...payload, isActive: !payload.isActive });
      const updatedCities = cities.map((city) =>
        city.id === payload.id ? { ...city, isActive: !city.isActive } : city
      );
      setCities(updatedCities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchCities();
    };
    handleLoadComponent();
  }, []);

  return (
    <Fragment>
      <ContentHeader
        title="Şehirler"
        actions={
          <Button
            type="primary"
            onClick={() => setVisibleCreateModal(true)}
            icon={<PlusOutlined />}
          >
            Şehir Ekle
          </Button>
        }
      />

      <CityListTable
        isLoading={isLoading}
        cities={cities}
        onEditCity={handleEditCity}
        onDeleteCity={handleDeleteCity}
        onAddHotel={handleAddHotel}
        onViewAllHotels={onViewAllHotels}
        onToggleIsActive={handleToggleIsActive}
      />

      <CityEditModal
        visible={visibleEditModal}
        onCancel={() => {
          setSelectedModalCity(undefined);
          setVisibleEditModal(false);
        }}
        onOk={onCityEdit}
        initialValues={selectedModalCity}
      />

      <CreateHotelModal
        visible={visibleCreateHotelModal}
        onCancel={() => setVisibleCreateHotelModal(false)}
        onOk={onCreateHotel}
      />

      <CityCreateModal
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateCity}
      />
    </Fragment>
  );
};

export default CityPage;

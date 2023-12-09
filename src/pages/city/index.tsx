import React, { useState, Fragment } from "react";
import { Button } from "antd";
import CityListTable from "./components/CityListTable";
import CityEditModal from "./components/EditModal";
import CreateHotelModal from "./components/CreateHotelModal";
import ContentHeader from "../../components/ContentHeader";
import { City } from "./types";
import CityCreateModal from "./components/CreateModal";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const CityPage: React.FC = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState<City[]>([
    { id: 1, name: "İstanbul" },
    { id: 2, name: "Ankara" },
  ]);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleCreateHotelModal, setVisibleCreateHotelModal] = useState(false);
  const [editModalCity, setEditModalCity] = useState<City | undefined>(
    undefined
  );

  const handleEditCity = (editedCity: City) => {
    setEditModalCity(editedCity);
    setVisibleEditModal(true);
  };

  const handleDeleteCity = (cityId: number) => {
    // Silme işlemi
    // ...
  };

  const handleAddHotel = (cityId: number) => {
    setVisibleCreateHotelModal(true);
  };

  const handleCreateCity = (newCity: City) => {
    setCities([...cities, newCity]);
    setVisibleCreateModal(false);
  };

  const handleCreateHotel = (values: {
    name: string;
    description: string;
    price: number;
  }) => {
    // Otel ekleme işlemi
    // ...
    setVisibleCreateHotelModal(false);
  };

  const onViewAllHotels = (cityId: number) => {
    // React Router veya başka bir yönlendirme kütüphanesi kullanarak otel sayfasına yönlendirme yapılabilir.
    // Örneğin:
    navigate(`/hotel/${cityId}`);
  };

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
        cities={cities}
        onEditCity={handleEditCity}
        onDeleteCity={handleDeleteCity}
        onAddHotel={handleAddHotel}
        onViewAllHotels={onViewAllHotels}
      />

      <CityEditModal
        visible={visibleEditModal}
        onCancel={() => {
          setEditModalCity(undefined);
          setVisibleEditModal(false);
        }}
        onOk={(values) => {
          if (editModalCity) {
            const updatedCities = cities.map((city) =>
              city.id === editModalCity.id ? { ...city, ...values } : city
            );
            setCities(updatedCities);
          }
          setEditModalCity(undefined);
          setVisibleEditModal(false);
        }}
        initialValues={editModalCity}
      />

      <CreateHotelModal
        visible={visibleCreateHotelModal}
        onCancel={() => setVisibleCreateHotelModal(false)}
        onOk={handleCreateHotel}
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

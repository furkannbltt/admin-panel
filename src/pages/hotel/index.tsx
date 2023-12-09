import React, { useState, Fragment, useEffect } from "react";
import { Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import { City, CreateHotelPayload } from "../city/types";
import HotelTable from "./components/HotelListTable";
import { Hotel } from "./types";
import EditHotelModal from "./components/EditHotelModal";
import CreateHotelModal from "../city/components/CreateHotelModal";
import ImagesModal from "./components/ViewImages";

const HotelPage: React.FC = () => {
  const { cityId } = useParams();
  const [cities, setCities] = useState<City[]>([]);
  const [paramCity, setParamCity] = useState<City | undefined>(undefined);
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    undefined
  );
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [imagesModalVisible, setImagesModalVisible] = useState(false);

  const fetchCities = async () => {
    setCities([
      { id: 1, name: "İstanbul" },
      { id: 2, name: "Ankara" },
    ]);
  };

  const fetchCity = async () => {
    setParamCity({ id: 1, name: "İstanbul" });
  };

  const fetchHotels = async () => {
    setHotels([
      {
        id: 1,
        name: "otel1",
        description: "1234",
        price: 123,
        isActive: true,
        images: [
          {
            url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            id: 2,
          },
        ],
      },
      {
        id: 2,
        name: "otel2",
        description: "5",
        price: 123,
        isActive: true,
        images: [
          {
            url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            id: 2,
          },
        ],
      },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (cityId) {
      const numberValue = parseFloat(cityId);
      !isNaN(numberValue) && setSelectedCityId(numberValue);
      fetchCity();
    } else {
      fetchCities();
    }
  }, [cityId]);

  useEffect(() => {
    if (cities.length) {
      setSelectedCityId(cities[0].id);
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCityId) {
      fetchHotels();
    }
  }, [selectedCityId]);

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const handleCreateOk = (hotel: CreateHotelPayload) => {
    setCreateModalVisible(false);
  };

  const handleCreateCancel = () => {
    setCreateModalVisible(false);
  };

  const showEditModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setEditModalVisible(true);
  };

  const handleEditOk = (values: any) => {
    setEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleVisibleHotel = (id: number, value: boolean) => {};

  const handleDeleteHotel = (id: number) => {};

  const showImagesModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setImagesModalVisible(true);
  };

  const handleImagesCancel = () => {
    setImagesModalVisible(false);
  };

  return (
    <Fragment>
      <ContentHeader
        title={cityId && paramCity ? `${paramCity.name} otelleri` : "Oteller"}
        actions={
          <Fragment>
            {cityId ? (
              <Button
                key="addHotel"
                type="primary"
                icon={<PlusOutlined />}
                onClick={showCreateModal}
              >
                Otel Ekle
              </Button>
            ) : (
              <Fragment>
                {!!cities.length && (
                  <Select
                    placeholder="Şehir Seç"
                    style={{ width: 200 }}
                    onChange={setSelectedCityId}
                    value={selectedCityId}
                  >
                    {cities.map((city) => (
                      <Select.Option key={city.id} value={city.id}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Fragment>
            )}
          </Fragment>
        }
      />

      <HotelTable
        hotels={hotels}
        isLoading={isLoading}
        onDelete={handleDeleteHotel}
        onEdit={showEditModal}
        onToggle={handleVisibleHotel}
        onViewImages={showImagesModal}
      />

      <CreateHotelModal
        visible={createModalVisible}
        onCancel={handleCreateCancel}
        onOk={handleCreateOk}
      />

      <EditHotelModal
        visible={editModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
        initialValues={selectedHotel}
      />

      {selectedHotel && (
        <ImagesModal
          visible={imagesModalVisible}
          images={selectedHotel.images}
          onCancel={handleImagesCancel}
        />
      )}
    </Fragment>
  );
};

export default HotelPage;

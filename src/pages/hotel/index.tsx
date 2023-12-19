import React, { useState, Fragment, useEffect } from "react";
import { Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import { CityModel, CreateHotelModel } from "../city/types";
import HotelTable from "./components/HotelListTable";
import { Hotel } from "./types";
import EditHotelModal from "./components/EditHotelModal";
import CreateHotelModal from "../city/components/CreateHotelModal";
import ImagesModal from "./components/ViewImages";
import { getCities } from "../../services/city/city";
import {
  createCityHotel,
  deleteHotel,
  deleteHotelImage,
  editHotel,
  getHotelsByCity,
} from "../../services/hotel/hotel";

const HotelPage: React.FC = () => {
  const { cityName, cityId } = useParams();
  const [cities, setCities] = useState<CityModel[]>([]);
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
    try {
      const response = await getCities();
      setCities(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityHotels = async (cityId: number) => {
    try {
      const response = await getHotelsByCity(cityId);
      setHotels(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cityId) {
      const numberValue = parseFloat(cityId);
      !isNaN(numberValue) && setSelectedCityId(numberValue);
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
      fetchCityHotels(selectedCityId);
    }
  }, [selectedCityId]);

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const handleCreateOk = async (hotel: CreateHotelModel) => {
    try {
      setIsLoading(true);
      const response = await createCityHotel({
        ...hotel,
        cityId: selectedCityId!,
        isActive: true,
      });
      setHotels([...hotels, response.data]);
      setCreateModalVisible(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCancel = () => {
    setCreateModalVisible(false);
  };

  const showEditModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setEditModalVisible(true);
  };

  const handleEditOk = async (payload: Hotel) => {
    try {
      setIsLoading(true);
      await editHotel(payload);
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === payload.id ? { ...hotel, ...payload } : hotel
      );
      setHotels(updatedHotels);
      setEditModalVisible(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleVisibleHotel = async (payload: Hotel) => {
    try {
      setIsLoading(true);
      await editHotel({ ...payload, isActive: !payload.isActive });
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === payload.id
          ? { ...hotel, isActive: !hotel.isActive }
          : hotel
      );
      setHotels(updatedHotels);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHotel = async (hotelId: number) => {
    try {
      setIsLoading(true);
      await deleteHotel({
        cityId: selectedCityId!,
        hotelId: hotelId,
      });
      const currentHotels = hotels.filter((hotel) => hotel.id !== hotelId);
      setHotels(currentHotels);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showImagesModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setImagesModalVisible(true);
  };

  const handleImagesCancel = () => {
    setImagesModalVisible(false);
    if (selectedHotel) {
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === selectedHotel.id
          ? { ...hotel, images: selectedHotel.images }
          : hotel
      );
      setHotels(updatedHotels);
    }
  };

  const handleImagesDelete = async (imageId: string) => {
    try {
      setIsLoading(true);
      await deleteHotelImage(imageId);
      const currentImages = (selectedHotel?.images || []).filter(
        (image) => image.id !== imageId
      );
      setSelectedHotel({ ...selectedHotel!, images: currentImages });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ContentHeader
        title={cityId && cityName ? `${cityName} otelleri` : "Oteller"}
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
          hotelId={selectedHotel.id}
          images={selectedHotel.images}
          onDelete={handleImagesDelete}
          onCancel={handleImagesCancel}
        />
      )}
    </Fragment>
  );
};

export default HotelPage;

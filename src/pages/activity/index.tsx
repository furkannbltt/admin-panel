import React, { useState, Fragment, useEffect } from "react";
import { Button } from "antd";
import ActivityEditModal from "./components/ActivityEditModal";
import CreateActivityModal from "./components/ActivityCreateModal";
import ContentHeader from "../../components/ContentHeader";
import { PlusOutlined } from "@ant-design/icons";
import {
  ActivityModel,
  CreateActivityModel,
  UpdateActivityModel,
} from "./types";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../services/activity/activity";
import ActivityListTable from "./components/ActivityListTable";
import { CityModel } from "../city/types";
import { getCities } from "../../services/city/city";
import ImagesModal from "./components/ViewImages";
import ActivityProgramDetailModal from "./components/ProgramsModal";
import ActivityVisitDetailModal from "./components/VisitsModal";

const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleProgramDetailModal, setVisibleProgramDetailModal] =
    useState(false);
  const [visibleVisitDetailModal, setVisibleVisitDetailModal] = useState(false);
  const [selectedModalActivity, setSelectedModalActivity] = useState<
    ActivityModel | undefined
  >(undefined);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [imagesModalVisible, setImagesModalVisible] = useState(false);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const response = await getActivities();
      setActivities(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleEditActivity = (editedActivity: ActivityModel) => {
    setSelectedModalActivity(editedActivity);
    setVisibleEditModal(true);
  };

  const handleDeleteActivity = async (activityId: number) => {
    try {
      setIsLoading(true);
      await deleteActivity(activityId);
      const currentActivities = activities.filter(
        (activity) => activity.id !== activityId
      );
      setActivities(currentActivities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateActivity = async (newActivity: CreateActivityModel) => {
    try {
      setIsLoading(true);
      console.log(newActivity, "geldi");
      const response = await createActivity(newActivity);
      setActivities([...activities, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleIsActive = async (payload: ActivityModel) => {
    try {
      setIsLoading(true);
      const updatePayload: UpdateActivityModel = {
        cityId: payload.city.id,
        description: payload.description,
        id: payload.id,
        name: payload.name,
        price: payload.price,
        isActive: !payload.isActive,
        title: payload.title,
      };
      await updateActivity(updatePayload);
      const updatedActivities = activities.map((activity) =>
        activity.id === payload.id
          ? { ...activity, isActive: !activity.isActive }
          : activity
      );
      setActivities(updatedActivities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onActivityEdit = async (payload: UpdateActivityModel) => {
    try {
      setIsLoading(true);
      const response = await updateActivity(payload);
      const updatedActivities = activities.map((activity) =>
        activity.id === payload.id ? response.data : activity
      );
      setActivities(updatedActivities);
      setSelectedModalActivity(undefined);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagesCancel = () => {
    setImagesModalVisible(false);
    if (selectedModalActivity) {
      const updatedAcitivities = activities.map((activity) =>
        activity.id === selectedModalActivity.id
          ? { ...activity, images: selectedModalActivity.images }
          : activity
      );
      setActivities(updatedAcitivities);
    }
  };

  const showImagesModal = (activity: ActivityModel) => {
    setSelectedModalActivity(activity);
    setImagesModalVisible(true);
  };

  const showVisitsModal = (activity: ActivityModel) => {
    setSelectedModalActivity(activity);
    setVisibleVisitDetailModal(true);
  };

  const showProgramsModal = (activity: ActivityModel) => {
    setSelectedModalActivity(activity);
    setVisibleProgramDetailModal(true);
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchActivities();
      await fetchCities();
    };
    handleLoadComponent();
  }, []);

  return (
    <Fragment>
      <ContentHeader
        title="Aktiviteler"
        actions={
          <Button
            type="primary"
            onClick={() => setVisibleCreateModal(true)}
            icon={<PlusOutlined />}
          >
            Aktivite Ekle
          </Button>
        }
      />

      <ActivityListTable
        isLoading={isLoading}
        activities={activities}
        onEditActivity={handleEditActivity}
        onDeleteActivity={handleDeleteActivity}
        onToggleActivityStatus={handleToggleIsActive}
        onViewImages={showImagesModal}
        onViewVisit={showVisitsModal}
        onViewProgram={showProgramsModal}
      />

      {selectedModalActivity && (
        <ActivityEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setSelectedModalActivity(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onActivityEdit}
          initialValues={selectedModalActivity}
          cities={cities}
        />
      )}

      <CreateActivityModal
        visible={visibleCreateModal}
        cities={cities}
        onCancel={() => setVisibleCreateModal(false)}
        onOk={handleCreateActivity}
      />

      {selectedModalActivity && (
        <ImagesModal
          visible={imagesModalVisible}
          activityId={selectedModalActivity.id}
          images={selectedModalActivity.images}
          onCancel={handleImagesCancel}
        />
      )}

      {selectedModalActivity && (
        <ActivityProgramDetailModal
          activityId={selectedModalActivity.id}
          programs={
            selectedModalActivity.activitiesProgram
              ? [selectedModalActivity.activitiesProgram]
              : []
          }
          onCancel={() => {
            setSelectedModalActivity(undefined);
            setVisibleProgramDetailModal(false);
          }}
          visible={visibleProgramDetailModal}
        />
      )}

      {selectedModalActivity && (
        <ActivityVisitDetailModal
          activityId={selectedModalActivity.id}
          visits={selectedModalActivity.activitiesVisits}
          onCancel={() => {
            setSelectedModalActivity(undefined);
            setVisibleVisitDetailModal(false);
          }}
          visible={visibleVisitDetailModal}
        />
      )}
    </Fragment>
  );
};

export default ActivityPage;

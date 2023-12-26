import { CityModel } from "../city/types";

export interface ActivityModel {
  id: number;
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  city: CityModel;
  activitiesProgram: ActivitiesProgramModel;
  activitiesVisits: ActivitiesVisitModel[];
  images: ImageModel[];
  inclusionServices: string;
  exclusionServices: string;
}

export interface CreateActivityModel {
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  cityId: number;
  images: File[];
  inclusionServices: string;
  exclusionServices: string;
}

export interface UpdateActivityModel {
  id: number;
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  cityId: number;
  inclusionServices: string;
  exclusionServices: string;
}

export interface ActivitiesProgramModel {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface AddActivitiesProgramModel {
  title: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface ActivitiesVisitModel {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface AddActivitiesVisitModel {
  name: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface ImageModel {
  imageUrl: string;
  id: string;
}

export interface AddImageModel {
  images: any;
  activitieId: number;
}

import { CityDBModel } from "../city/types";

export interface ActivityDBModel {
  id: number;
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  city: CityDBModel;
  activitiesProgram: ActivitiesProgramDBModel;
  activitiesVisits: ActivitiesVisitDBModel[];
  images: ImageDBModel[];
}

export interface CreateActivityDBModel {
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  cityId: number;
  images: File[];
}

export interface UpdateActivityDBModel {
  id: number;
  name: string;
  title: string;
  description: string;
  isActive: boolean;
  price: number;
  cityId: number;
}


export interface ActivitiesProgramDBModel {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

export interface AddActivitiesProgramDBModel  {
  title: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface ActivitiesVisitDBModel {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AddActivitiesVisitDBModel {
  name: string;
  description: string;
  isActive: boolean;
  activitiesId: number;
}

export interface ImageDBModel {
  imageUrl: string;
  id: string;
}

export interface AddImageDBModel {
  images: File[];
  activitieId: number;
}
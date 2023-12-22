export interface BaseResponseModel<T> {
  data: T;
  success: boolean;
  message?: string;
}

export enum PermissonsType {
  Activity = "Aktiviteler Sayfası",
  City = "Şehirler Sayfası",
  Hotel = "Oteller Sayfası",
  Airport = "Havalimanları Sayfası",
  Terminal = "Terminaller Sayfası",
  Group = "Gruplar Sayfası",
  Users = "Kullanıcılar Sayfası",
}

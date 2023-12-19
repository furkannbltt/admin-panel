export interface BaseResponseModel<T> {
  data: T;
  success: boolean;
  message?: string;
}

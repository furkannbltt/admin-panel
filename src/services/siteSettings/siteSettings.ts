import { SiteSettingsDBModel } from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const updateSettings = (payload: SiteSettingsDBModel) => {
  const formData = new FormData();

  formData.append("Id", "1");
  formData.append("HomePageText", payload.homePageText);
  formData.append("PhoneNumber", payload.phoneNumber);
  formData.append("Mail", payload.mail);
  formData.append("Address", payload.address);
  formData.append(`Image`, payload.image);

  // API isteğini gönder
  return http.put<any, BaseResponseModel<SiteSettingsDBModel>>(
    "/siteSettings/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSiteSettings = () => {
  return http.get<any, SiteSettingsDBModel>(`/public/getSiteSettings`);
};


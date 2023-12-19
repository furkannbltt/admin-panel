import { Dayjs } from "dayjs";
import moment from "moment";

export const sentDateFormat = (time: string) => {
  return moment(time).format();
};

export const displayedDateFormat = (
  time: string,
  format: string = "YYYY-MM-DD HH:mm"
) => {
  return moment(time).format(format);
};

export const calculateTravelTime = (
  startDate: Dayjs,
  endDate: Dayjs
): string => {
  const days = endDate.diff(startDate, "day");
  const hours = endDate.diff(startDate, "hour") % 24;
  const minutes = endDate.diff(startDate, "minute") % 60;

  const result = `${days > 0 ? `${days} gün ` : ""}${
    hours > 0 ? `${hours} saat ` : ""
  }${minutes > 0 ? `${minutes} dakika` : ""}`;

  return result.trim();
};

export function getInitials(sentence: string) {
  if (!sentence) return "";

  const words = sentence.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());

  return initials.join("");
}

import {date, scroll, Notify} from "quasar";
import router from "@/router";
import i18n from "@/i18n";
const {t} = i18n.global;
const {setVerticalScrollPosition} = scroll;

import {useAuthStore} from "@/stores/auth";

export function convertToDateFormat(isoDate) {
  if (!isoDate) return "";

  const dateObj = new Date(isoDate);
  if (dateObj.toString() === "Invalid Date") return "Invalid Date";

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getServerError({response}, field = "errorMessage") {
  if (!response) return "";

  console.log("response?.data", response?.data);
  return (
    response?.data?.[field] ||
    response?.data?.data?.errors ||
    "Xatolik yuz berdi"
  );
}
export function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
export function removePhonePrefix(val) {
  if (!val) return val;
  const val_string = val.toString();

  return val_string?.length >= 9 ? val_string.slice(-9) : val_string;
}
export function trimBetween(val) {
  if (!val) return val;
  const res = val.toString().replace(/\s+/g, "");
  if (isNaN(+res)) return res;
  return res;
}
export function formatOnlyNumber(val) {
  if (!val) return val;
  return val.toString().replace(/\D/g, "");
}

export function formatPhoneNumber(val) {
  if (!val) return val;
  return val
    .toString()
    .replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
}
export function formatDateText(isoDate, month = "short") {
  if (isoDate == null || isoDate === "") {
    return "-";
  }
  const months = {
    "uz-Latn":
      month === "short"
        ? [
            "Yan",
            "Fev",
            "Mar",
            "Apr",
            "May",
            "Iyun",
            "Iyul",
            "Avg",
            "Sen",
            "Okt",
            "Noy",
            "Dek",
          ]
        : [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentabr",
            "Oktabr",
            "Noyabr",
            "Dekabr",
          ],
    ru:
      month === "short"
        ? [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ]
        : [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
  };
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const formattedDate = `${day} ${months[locale.value][monthIndex]} ${year}`;

  return formattedDate;
}
export function formatMonthText(isoDate, month = "short") {
  if (isoDate == null || isoDate === "") {
    return "-";
  }
  const months = {
    "uz-Latn":
      month === "short"
        ? [
            "Yan",
            "Fev",
            "Mar",
            "Apr",
            "May",
            "Iyun",
            "Iyul",
            "Avg",
            "Sen",
            "Okt",
            "Noy",
            "Dek",
          ]
        : [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentabr",
            "Oktabr",
            "Noyabr",
            "Dekabr",
          ],
    ru:
      month === "short"
        ? [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ]
        : [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
  };
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();

  const formattedDate = `${day} ${months[locale.value][monthIndex]}`;

  return formattedDate;
}
export function getOnlyDateNumber(date) {
  return new Date(date).getUTCDate();
}

export function getShortWeekday(date) {
  const weekdaysShortRU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const weekdaysShortUZ = ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];

  const dayOfWeekIndex = new Date(date).getDay();
  const shortWeekday =
    locale.value === "uz-Latn"
      ? weekdaysShortUZ[dayOfWeekIndex]
      : weekdaysShortRU[dayOfWeekIndex];

  return shortWeekday;
}
export function getHoursAndMinutesFromISODate(isoDate) {
  // Create a Date object from the ISO date string
  const date = new Date(isoDate);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Format hours and minutes as a string
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}
export function formatMoney(money) {
  const currency = {
    "uz-Latn": "so'm",
    ru: "сум",
  };

  // Handle cases where money is null, undefined, 0, or an empty string
  if (money == null || money === "" || isNaN(money)) {
    return "0 " + currency[locale.value];
  }

  // Convert the money value to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = money.toString().split(".");

  // Format the integer part with thousand separators
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  // Combine the integer part, decimal part, and currency
  const formattedMoney = `${formattedIntegerPart} ${currency[locale.value]}`;

  return formattedMoney;
}

export function formatLongInt(money) {
  if (money == null || money === "" || isNaN(money)) {
    return "0";
  }

  const formattedIntegerPart = money
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return formattedIntegerPart;
}

export function formatNullObjectValues(obj) {
  // Check if the input is an object
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a non-null object");
  }

  // Iterate through object properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Check if the property value is null or an empty string
      if (obj[key] === null || obj[key] === "") {
        // Remove the property from the object
        delete obj[key];
      }
    }
  }

  return obj;
}
export async function downloadBlobFile(data, fileName) {
  if (!data) return;

  const blob = new Blob([data]);
  let link = document.createElement("a");
  link.style.visibility = "hidden";
  let url = window.URL.createObjectURL(blob);
  link.href = url;

  // append url to element and trigger click
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  });
}

export function formatMinutes(min) {
  const minutes = parseInt(min) || 0;
  if (typeof minutes !== "number" || isNaN(minutes)) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourText = locale == "uz-Latn" ? "soat" : "час";
  const minuteText = locale == "uz-Latn" ? "daqiqa" : "мин";

  const formattedTime = `${hours > 0 ? hours + " " + hourText : ""}${
    hours > 0 && remainingMinutes > 0 ? " " : ""
  }${remainingMinutes > 0 ? remainingMinutes + " " + minuteText : ""}`;

  return formattedTime.trim();
}

export function isPermission(permission) {
  const authStore = useAuthStore();
  const permissions = authStore.user.role.permissions.map((item) => item.slug);
  if (Array.isArray(permission)) {
    return permission.some((item) => permissions.includes(item));
  }
  return permissions.some((i) => i == permission);
}

export function getDateNow(format = "DD.MM.YYYY") {
  return date.formatDate(Date.now(), format);
}
export function formatDate(strDate, format = "DD.MM.YYYY") {
  if (!strDate) return "";
  let newDate = null;
  try {
    newDate = new Date(strDate.replace(/\s/, "T").replace(/Z/, "") + "Z");
    if (newDate.toString() === "Invalid Date") {
      return date.formatDate(date.extractDate(strDate, "DD.MM.YYYY"), format);
    }
  } catch (e) {
    return date.formatDate(strDate, format);
  }

  return date.formatDate(newDate, format);
}
export function formatTimeManage(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  remainingSeconds = String(remainingSeconds).padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
}
export function prettify(num) {
  if (!num) return num;
  const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;

  const res = num.toString().replace(regExp, "$1 ");
  return res;
}

export function deepCopy(data) {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}

export function formatDateToUTC(
  vDate,
  config = {format: "DD.MM.YYYY", endDay: false}
) {
  if (!vDate) return null;

  if (typeof vDate === "string") {
    vDate = new Date(
      date.formatDate(date.extractDate(vDate, config.format), "YYYY-MM-DD")
    );
  }

  if (config.endDay) vDate.setUTCHours(23, 59, 59, 999);
  else vDate.setUTCHours(0, 0, 0, 0);

  return vDate.toUTCString();
}

export async function replaceQueryFilter(allFilters, query) {
  const filters = {...query, ...allFilters};
  const mapSelectedFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters?.[key] !== null && filters?.[key] !== "") {
      mapSelectedFilters[key] = filters?.[key];
    }
  });

  await router.replace({query: {...mapSelectedFilters}});
  return allFilters;
}

export const fileExtensionsTypeObj = {
  ["image/png"]: "png",
  ["image/jpeg"]: "jpeg",
  ["image/gif"]: "gif",
  ["application/pdf"]: "pdf",
  ["application/zip"]: "zip",
  ["application/zip"]: "zip",
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]: "xlsx",
};

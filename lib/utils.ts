import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  if (string == undefined) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function commafy(num: number) {
  var str = num.toString().split(",");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(",");
}

export const generateYearsUntilToday = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2020; year <= currentYear; year++) {
    const isSelected = year === currentYear ? true : false; // Set current year as selected by default
    years.push({ id: year - 2020, year, isSelected });
  }

  return years;
};

export const generateMonthsUntilToday = () => {
  const currentMonth = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsArray = [];
  for (let i = 0; i <= months.length; i++) {
    const isSelected = i === currentMonth ? true : false;
    monthsArray.push({ id: i, month: months[i], isSelected });
  }

  return monthsArray;
};

export const getCurrentMonthAbbreviation = () => {
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthAbbreviation = months[currentMonthIndex];
  return currentMonthAbbreviation;
};

export const getMonthById = (monthId: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (monthId >= 0 && monthId < months.length) {
    return months[monthId];
  } else {
    return "Invalid month ID";
  }
};

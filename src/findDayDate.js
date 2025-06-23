import { getDay, getMonth } from "date-fns";
function convertDay(day) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[getDay(day)];
}

function convertMonth(month) {
  const monthsOfYear = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthsOfYear[getMonth(month)];
}

export { convertDay, convertMonth };

export const weekdays = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  // Sun: "Sunday",
};

export const checkDays = (day, doctor) => {
  return doctor.availability.some((slot) => slot.day === day);
};

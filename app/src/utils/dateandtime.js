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

export const convertTo24HourTime = (time12hr) => {
  const [time, modifier] = time12hr.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(parseInt(hours) + 12); // Convert PM to 24-hour format
  } else if (modifier === "AM" && hours === "12") {
    hours = "00"; // Convert 12 AM to 00 hours
  }

  return `${hours}:${minutes}:00`; // Return time in HH:mm:ss format
};

export const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":");

  let hours12 = parseInt(hours, 10);
  const ampm = hours12 >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours12 = hours12 % 12;
  hours12 = hours12 ? hours12 : 12; // The hour '0' should be '12'

  return `${hours12}:${minutes} ${ampm}`;
};

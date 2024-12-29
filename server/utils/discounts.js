function applyAppointmentDiscount(fee, discountApplied, discountPercent) {
  if (!discountApplied) {
    return fee;
  }
  return fee - (fee * discountPercent) / 100;
}

export { applyAppointmentDiscount };

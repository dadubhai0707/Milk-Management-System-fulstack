export const isValidIndianMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};
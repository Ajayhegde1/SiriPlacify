export const validateURL = (inputURL) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (optional)
      '((([a-zA-Z\\d][a-zA-Z\\d-]*[a-zA-Z\\d])|([a-zA-Z\\d]))\\.?)+[a-zA-Z]{2,6}(\\/.*)?$' // Domain name with valid extensions and optional path
    );
    return urlPattern.test(inputURL);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^\+?\d{10,}$/;
  return phoneNumberPattern.test(phoneNumber);
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};


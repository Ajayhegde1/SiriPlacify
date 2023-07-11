export const validateURL = (inputURL) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (optional)
      '((([a-zA-Z\\d][a-zA-Z\\d-]*[a-zA-Z\\d])|([a-zA-Z\\d]))\\.?)+[a-zA-Z]{2,6}(\\/.*)?$' // Domain name with valid extensions and optional path
    );
    return urlPattern.test(inputURL);
  };
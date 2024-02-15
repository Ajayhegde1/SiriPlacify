import axios from "axios";

// Timeouts
export const timeouts = {
  ONE_MIN: 60000,
  TWO_MIN: 120000,
  SEVEN_SECS: 7000,
};

// Server Configuration
// export const SERVER_BASE_URL = 'https://testapi.abhayasecure.com'

// export const SERVER_BASE_URL = "https://test.placify.io/api";
// export const SERVER_BASE_URL = "https:/api.placify.io/";
// export const SERVER_BASE_URL = "http://localhost:8000/";


// export const SERVER_BASE_URL = 'https://test.abhayasecure.com/api/v1'
// export const SERVER_BASE_URL = "https:/api.placify.io/";
export const SERVER_BASE_URL = "https:/api.placify.io/";

// Axios Configuration
const axiosInstance = axios.create({
  baseURL: `${SERVER_BASE_URL}`,
  // headers can be added here
});

export const GET = (url, headers) => {
  return axiosInstance({
    method: "get",
    url,
    headers: headers || {},
    timeout: timeouts.TWO_MIN,
  });
};

export const POST = (url, body, headers) => {
  return axiosInstance({
    method: "post",
    url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};

export const PUT = (url, body, headers) => {
  return axiosInstance({
    method: "put",
    url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};

export const PATCH = (url, body, headers) => {
  return axiosInstance({
    method: "patch",
    url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};

export const DELETE = (url, body, headers) => {
  return axiosInstance({
    method: "delete",
    url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};

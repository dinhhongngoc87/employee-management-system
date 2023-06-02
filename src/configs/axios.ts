import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '../utils/constants';
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api-training.hrm.div4.pgtest.co/api/v1',
});
// Add a request interceptor to add access token to headers
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default apiClient;

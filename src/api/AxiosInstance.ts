import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

import { config } from '@/data/app-config';
import { getCookie, deleteCookie } from '@/lib/browser';

export const axiosInstance = axios.create({
  baseURL: config.BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('jwt');
    if (token) {
      config.headers = config.headers || new AxiosHeaders();
      config.headers.set('Authorization', `Bearer ${token}`);
      config.headers.set('ngrok-skip-browser-warning', 'ngrok');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie('jwt');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const getAxiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();

  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error: Extend the promise object with a custom cancel method
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

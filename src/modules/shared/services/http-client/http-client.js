import axios from 'axios';
import { apiBaseUrl } from '@/constants/environment';

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 * */
const config = {
  baseURL: apiBaseUrl
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 * */
const httpClient = axios.create(config);

/**
 * authentication interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * Currenlty it is just doing nothing but idea to to show the capability of axios and its interceptors
 * In future, interceptors can be created into separate files and consumed into multiple http clients
 * @param {*} config
 */
// eslint-disable-next-line no-shadow
const authInterceptor = (config) => {
  /** add auth token */
  const updated = { ...config };
  updated.headers['Content-Type'] = 'application/json';

  return updated;
};

// eslint-disable-next-line no-shadow,arrow-body-style
const loggerInterceptor = (config) => {
  /** Add request logging here */
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);


export default httpClient;

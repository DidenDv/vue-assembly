const { API_BASE_URL, NODE_ENV = 'development' } = process.env;

export const environment = NODE_ENV.toLowerCase();
export const apiBaseUrl = API_BASE_URL;

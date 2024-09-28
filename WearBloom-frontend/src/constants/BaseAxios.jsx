const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SITE_NAME = "WearBloom";

const API_URLS = {
    AUTH_TOKEN_REFRESH: '/auth/token/refresh/',
};

export { BASE_URL, API_URLS, SITE_NAME };
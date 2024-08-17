import { getCookie, removeCookie, setCookie } from "../lib/utils";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshTokenAndRetryRequest(
  originalRequest: AxiosRequestConfig<any>
) {
  const refreshToken = getCookie("refreshToken");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (response.data.access) {
      setCookie("accessToken", response.data.access, 1);
      api.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access;
      return api(originalRequest);
    }
  } catch (err) {
    console.error("Error al refrescar el token", err);
  }

  removeCookie("accessToken");
  window.location.href = "/login";
  return Promise.reject({ message: "Error al refrescar el token" });
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return refreshTokenAndRetryRequest(error.config);
    }

    return Promise.reject(error);
  }
);

// Nueva función para obtener el usuario
export const getUser = async (userId: number) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    throw error;
  }
};


export default api;

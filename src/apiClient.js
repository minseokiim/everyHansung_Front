import axios from "axios";
import config from "./config";
const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// accessToken 만료시 재발급
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) && // 수정된 부분
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${config.API_BASE_URL}/auth/refresh`,
          {},
          {
            params: {
              refresh_token: refreshToken, // 여기에 refresh_token 파라미터 추가
            },
          }
        );
        localStorage.setItem("accessToken", response.data.accessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.log("refresh token failure");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
